import React from 'react';
import { Order } from '../types';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

interface OrdersProps {
  orders: Order[];
}

export const Orders: React.FC<OrdersProps> = ({ orders }) => {
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Entregue': return <CheckCircle size={18} className="text-green-600" />;
      case 'Enviado': return <Truck size={18} className="text-blue-600" />;
      case 'Pendente': return <Clock size={18} className="text-yellow-600" />;
      default: return <Package size={18} className="text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Meus Pedidos</h2>
      
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50">
              <div>
                <span className="text-sm text-gray-500">Pedido #{order.id}</span>
                <p className="text-sm font-medium text-gray-800">
                  Realizado em {new Date(order.date).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200">
                  {getStatusIcon(order.status)}
                  <span className="text-sm font-medium text-gray-700">{order.status}</span>
                </div>
                <div className="text-right">
                   <p className="text-sm text-gray-500">Total</p>
                   <p className="font-bold text-gray-900">R$ {order.total.toFixed(2)}</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 sm:p-6">
              <h4 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">Itens</h4>
              <ul className="space-y-3">
                {order.items.map((item, idx) => (
                  <li key={`${order.id}-${idx}`} className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" />
                       </div>
                       <div>
                         <p className="text-sm font-medium text-gray-800">{item.name}</p>
                         <p className="text-xs text-gray-500">Qtd: {item.quantity}</p>
                       </div>
                     </div>
                     <span className="text-sm font-medium text-gray-600">
                        R$ {(item.price * item.quantity).toFixed(2)}
                     </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                  <button className="text-sm text-blue-600 font-medium hover:underline">
                    Baixar Fatura (PDF)
                  </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};