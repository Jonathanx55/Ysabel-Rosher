import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CartItem } from './CartContext';

export interface Order {
  id: string;
  date: string;
  client: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    phone: string;
  };
  status: 'Procesando' | 'Enviado' | 'Completado' | 'Cancelado';
  items: CartItem[];
  total: number;
  paymentMethod: string;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'status' | 'date'>) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (orderData: Omit<Order, 'status' | 'date'>) => {
    const newOrder: Order = {
      ...orderData,
      status: 'Procesando',
      date: new Date().toISOString(),
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
