
import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types';

export interface Notification {
  id: string;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
}

interface DataStore {
  products: Product[];
  notifications: Notification[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  addNotification: (notification: Notification) => void;
  clearNotifications: () => void;
  markNotificationAsRead: (id: string) => void;
}

export const useDataStore = create<DataStore>((set) => ({
  products: [],
  notifications: [],
  setProducts: (products) => set({ products }),
  addProduct: (product) => set((state) => ({ 
    products: [product, ...state.products] 
  })),
  addNotification: (notification) => set((state) => ({
    notifications: [notification, ...state.notifications]
  })),
  clearNotifications: () => set({ notifications: [] }),
  markNotificationAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    )
  })),
}));

export const initializeDataStore = (initialProducts: Product[]) => {
  const store = useDataStore.getState();
  store.setProducts(initialProducts);

  // Subscribe to product changes
  const productChannel = supabase
    .channel('product-changes')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'products'
      },
      (payload) => {
        const newProduct = payload.new as Product;
        store.addProduct(newProduct);
      }
    )
    .subscribe();

  // Subscribe to notifications
  const notificationChannel = supabase
    .channel('notification-changes')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications'
      },
      (payload) => {
        store.addNotification(payload.new as Notification);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(productChannel);
    supabase.removeChannel(notificationChannel);
  };
};
