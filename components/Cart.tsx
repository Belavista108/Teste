import React from 'react';
import { CartItem } from '../types';
import { Trash2, Plus, Minus, CreditCard, ArrowRight } from 'lucide-react';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = total * 0.05; // 5% simulated tax
  const finalTotal = total + tax;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
        <div className="bg-gray-100 p-6 rounded-full mb-4">
          <CreditCard size={48} className="text-gray-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Seu carrinho está vazio</h2>
        <p className="mb-6">Adicione produtos do catálogo para começar um pedido.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full">
      <div className="flex-1 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Carrinho de Compras ({items.length} itens)</h2>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
          {items.map(item => (
            <div key={item.id} className="p-4 flex flex-col sm:flex-row items-center gap-4">
              <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.category}</p>
                <p className="text-blue-600 font-bold mt-1">R$ {item.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => onUpdateQuantity(item.id, -1)}
                  className="p-1 rounded-md hover:bg-gray-100 text-gray-600 disabled:opacity-30"
                  disabled={item.quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-medium text-gray-800">{item.quantity}</span>
                <button 
                  onClick={() => onUpdateQuantity(item.id, 1)}
                  className="p-1 rounded-md hover:bg-gray-100 text-gray-600"
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className="text-right min-w-[100px]">
                <p className="font-bold text-gray-800">R$ {(item.price * item.quantity).toFixed(2)}</p>
              </div>

              <button 
                onClick={() => onRemoveItem(item.id)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                title="Remover"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full lg:w-96">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Resumo do Pedido</h3>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Impostos (Estimado)</span>
              <span>R$ {tax.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-100 pt-3 mt-3">
              <div className="flex justify-between text-lg font-bold text-gray-800">
                <span>Total</span>
                <span className="text-blue-600">R$ {finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button 
            onClick={onCheckout}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
          >
            Finalizar Pedido
            <ArrowRight size={20} />
          </button>
          
          <p className="text-xs text-center text-gray-400 mt-4">
            Ao finalizar, o pedido será enviado para aprovação financeira.
          </p>
        </div>
      </div>
    </div>
  );
};