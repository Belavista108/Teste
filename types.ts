export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Pendente' | 'Aprovado' | 'Enviado' | 'Entregue';
  items: CartItem[];
}

export interface User {
  id: string;
  name: string;
  company: string;
  creditLimit: number;
  usedCredit: number;
}

export type ViewState = 'dashboard' | 'catalog' | 'cart' | 'orders' | 'assistant';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}