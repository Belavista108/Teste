import React from 'react';
import { LayoutDashboard, ShoppingBag, ShoppingCart, MessageSquare, LogOut, Package } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  cartCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, cartCount }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'catalog', label: 'Catálogo', icon: ShoppingBag },
    { id: 'cart', label: 'Carrinho', icon: ShoppingCart, badge: cartCount },
    { id: 'orders', label: 'Meus Pedidos', icon: Package },
    { id: 'assistant', label: 'Assistente IA', icon: MessageSquare },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 z-20 shadow-xl">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          B2B Portal
        </h1>
        <p className="text-xs text-slate-400 mt-1">Área do Cliente</p>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-2">
        {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChangeView(item.id as ViewState)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'} />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
        })}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors w-full px-4 py-2">
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
};