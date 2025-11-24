import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Catalog } from './components/Catalog';
import { Cart } from './components/Cart';
import { Orders } from './components/Orders';
import { Assistant } from './components/Assistant';
import { ViewState, CartItem, Product, User } from './types';
import { PRODUCTS, MOCK_USER, MOCK_ORDERS } from './constants';
import { Menu, ShoppingCart } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User>(MOCK_USER);
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Load cart from local storage on mount (simulated persistence)
  useEffect(() => {
    const savedCart = localStorage.getItem('b2b_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) { console.error("Error loading cart", e); }
    }
  }, []);

  // Save cart
  useEffect(() => {
    localStorage.setItem('b2b_cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    // Optional: Visual feedback could go here
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const handleRemoveItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const newOrder: any = {
      id: `ORD-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
      date: new Date().toISOString(),
      total: total * 1.05, // + tax
      status: 'Pendente',
      items: [...cart]
    };

    setOrders([newOrder, ...orders]);
    setCart([]);
    
    // Update user credit (simulated)
    setUser(prev => ({
      ...prev,
      usedCredit: prev.usedCredit + newOrder.total
    }));

    setCurrentView('orders');
    alert("Pedido realizado com sucesso!");
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const renderContent = () => {
    switch(currentView) {
      case 'dashboard':
        return <Dashboard user={user} recentOrders={orders} onViewOrders={() => setCurrentView('orders')} />;
      case 'catalog':
        return <Catalog products={PRODUCTS} onAddToCart={handleAddToCart} />;
      case 'cart':
        return (
          <Cart 
            items={cart} 
            onUpdateQuantity={handleUpdateQuantity} 
            onRemoveItem={handleRemoveItem}
            onCheckout={handleCheckout}
          />
        );
      case 'orders':
        return <Orders orders={orders} />;
      case 'assistant':
        return <Assistant products={PRODUCTS} user={user} />;
      default:
        return <Dashboard user={user} recentOrders={orders} onViewOrders={() => setCurrentView('orders')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Mobile Responsive */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
         <Sidebar 
          currentView={currentView} 
          onChangeView={(view) => {
            setCurrentView(view);
            setIsMobileMenuOpen(false);
          }}
          cartCount={cartCount}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-gray-600">
            <Menu size={24} />
          </button>
          <span className="font-bold text-gray-800">B2B Portal</span>
          <button 
            onClick={() => setCurrentView('cart')} 
            className="relative text-gray-600"
          >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;