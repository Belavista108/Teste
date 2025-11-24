import { Product, User, Order } from './types';

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Roberto Silva',
  company: 'Mercado Tech & Soluções',
  creditLimit: 15000,
  usedCredit: 3450,
};

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Notebook Pro X1',
    category: 'Informática',
    price: 4500.00,
    image: 'https://picsum.photos/400/300?random=1',
    description: 'Processador i7, 16GB RAM, SSD 512GB, Tela 14"',
    stock: 25,
  },
  {
    id: 'p2',
    name: 'Monitor UltraWide 29"',
    category: 'Periféricos',
    price: 1200.00,
    image: 'https://picsum.photos/400/300?random=2',
    description: 'IPS, HDR10, HDMI, DisplayPort',
    stock: 50,
  },
  {
    id: 'p3',
    name: 'Teclado Mecânico RGB',
    category: 'Periféricos',
    price: 350.00,
    image: 'https://picsum.photos/400/300?random=3',
    description: 'Switch Blue, Layout ABNT2, Cabo removível',
    stock: 100,
  },
  {
    id: 'p4',
    name: 'Cadeira Ergonômica Office',
    category: 'Móveis',
    price: 850.00,
    image: 'https://picsum.photos/400/300?random=4',
    description: 'Ajuste de lombar, braços 3D, pistão classe 4',
    stock: 15,
  },
  {
    id: 'p5',
    name: 'Impressora Multifuncional Laser',
    category: 'Escritório',
    price: 1800.00,
    image: 'https://picsum.photos/400/300?random=5',
    description: 'Wi-Fi, Duplex automático, Toner incluso',
    stock: 8,
  },
  {
    id: 'p6',
    name: 'Mouse Sem Fio Precision',
    category: 'Periféricos',
    price: 120.00,
    image: 'https://picsum.photos/400/300?random=6',
    description: 'DPI ajustável, bateria recarregável',
    stock: 200,
  },
  {
    id: 'p7',
    name: 'Estação de Docking USB-C',
    category: 'Acessórios',
    price: 450.00,
    image: 'https://picsum.photos/400/300?random=7',
    description: '10 em 1, HDMI 4K, PD 100W',
    stock: 40,
  },
  {
    id: 'p8',
    name: 'Headset Noise Cancelling',
    category: 'Áudio',
    price: 600.00,
    image: 'https://picsum.photos/400/300?random=8',
    description: 'Bluetooth 5.0, 30h de bateria',
    stock: 30,
  },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-2023-001',
    date: '2023-10-15',
    total: 5700.00,
    status: 'Entregue',
    items: [
      { ...PRODUCTS[0], quantity: 1 },
      { ...PRODUCTS[1], quantity: 1 },
    ],
  },
  {
    id: 'ORD-2023-054',
    date: '2023-11-20',
    total: 350.00,
    status: 'Enviado',
    items: [
      { ...PRODUCTS[2], quantity: 1 },
    ],
  },
  {
    id: 'ORD-2024-012',
    date: '2024-05-10',
    total: 1800.00,
    status: 'Pendente',
    items: [
        { ...PRODUCTS[4], quantity: 1 }
    ]
  }
];