import React from 'react';
import { User, Order } from '../types';
import { Wallet, Package, Clock, TrendingUp } from 'lucide-react';

interface DashboardProps {
  user: User;
  recentOrders: Order[];
  onViewOrders: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, recentOrders, onViewOrders }) => {
  const creditPercentage = (user.usedCredit / user.creditLimit) * 100;
  const availableCredit = user.creditLimit - user.usedCredit;

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Olá, {user.name.split(' ')[0]}</h2>
        <p className="text-gray-500">{user.company} - Painel de Controle</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Wallet className="text-blue-600" size={24} />
            </div>
            <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-full">Ativo</span>
          </div>
          <p className="text-gray-500 text-sm">Crédito Disponível</p>
          <h3 className="text-2xl font-bold text-gray-800">R$ {availableCredit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${creditPercentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-400 mt-2">{creditPercentage.toFixed(0)}% do limite utilizado</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-indigo-50 rounded-lg">
              <Package className="text-indigo-600" size={24} />
            </div>
          </div>
          <p className="text-gray-500 text-sm">Total Pedidos</p>
          <h3 className="text-2xl font-bold text-gray-800">{recentOrders.length}</h3>
          <p className="text-xs text-indigo-600 mt-2 font-medium">Histórico total</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-50 rounded-lg">
              <Clock className="text-orange-600" size={24} />
            </div>
          </div>
          <p className="text-gray-500 text-sm">Pedidos Pendentes</p>
          <h3 className="text-2xl font-bold text-gray-800">
            {recentOrders.filter(o => o.status === 'Pendente').length}
          </h3>
          <p className="text-xs text-orange-600 mt-2 font-medium">Aguardando aprovação</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-teal-50 rounded-lg">
              <TrendingUp className="text-teal-600" size={24} />
            </div>
          </div>
          <p className="text-gray-500 text-sm">Última Compra</p>
          <h3 className="text-2xl font-bold text-gray-800">
            {recentOrders.length > 0 ? new Date(recentOrders[0].date).toLocaleDateString('pt-BR') : '-'}
          </h3>
          <p className="text-xs text-teal-600 mt-2 font-medium cursor-pointer hover:underline" onClick={onViewOrders}>Ver detalhes</p>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Pedidos Recentes</h3>
          <button onClick={onViewOrders} className="text-sm text-blue-600 font-medium hover:text-blue-800">Ver todos</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Data</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Valor</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.slice(0, 3).map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(order.date).toLocaleDateString('pt-BR')}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">R$ {order.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full 
                      ${order.status === 'Entregue' ? 'bg-green-100 text-green-700' : 
                        order.status === 'Pendente' ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-blue-100 text-blue-700'}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};