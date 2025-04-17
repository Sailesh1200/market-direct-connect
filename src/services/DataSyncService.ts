
import { Product } from "@/types";
import { create } from "zustand";

// Define the store types
interface DataStore {
  products: Product[];
  notifications: Notification[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  addNotification: (notification: Notification) => void;
  clearNotifications: () => void;
}

// Define the notification type
export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}

// Create a store to handle data sync
export const useDataStore = create<DataStore>((set) => ({
  products: [],
  notifications: [],
  
  // Add a new product
  addProduct: (product: Product) => {
    set((state) => ({
      products: [...state.products, product],
      notifications: [
        ...state.notifications,
        {
          id: Date.now().toString(),
          message: `New product added: ${product.name}`,
          type: 'success',
          timestamp: new Date(),
          read: false
        }
      ]
    }));
  },
  
  // Update an existing product
  updateProduct: (product: Product) => {
    set((state) => ({
      products: state.products.map(p => 
        p.id === product.id ? product : p
      ),
      notifications: [
        ...state.notifications,
        {
          id: Date.now().toString(),
          message: `Product updated: ${product.name}`,
          type: 'info',
          timestamp: new Date(),
          read: false
        }
      ]
    }));
  },
  
  // Delete a product
  deleteProduct: (productId: string) => {
    set((state) => {
      const productToDelete = state.products.find(p => p.id === productId);
      return {
        products: state.products.filter(p => p.id !== productId),
        notifications: [
          ...state.notifications,
          {
            id: Date.now().toString(),
            message: `Product deleted: ${productToDelete?.name || productId}`,
            type: 'warning',
            timestamp: new Date(),
            read: false
          }
        ]
      };
    });
  },
  
  // Add a notification
  addNotification: (notification: Notification) => {
    set((state) => ({
      notifications: [...state.notifications, notification]
    }));
  },
  
  // Clear all notifications
  clearNotifications: () => {
    set(() => ({
      notifications: []
    }));
  }
}));

// Initialize the store with mock data
export const initializeDataStore = (initialProducts: Product[]) => {
  const { addProduct } = useDataStore.getState();
  
  // Add initial products to the store
  initialProducts.forEach(product => {
    addProduct(product);
  });
};
