
// User types
export type UserRole = 'farmer' | 'buyer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  address?: string;
  createdAt: string;
  rating?: number;
}

// Product types
export type ProductCategory = 
  | 'vegetables' 
  | 'fruits' 
  | 'grains' 
  | 'dairy' 
  | 'meat' 
  | 'poultry' 
  | 'herbs' 
  | 'other';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  unit: string;
  quantity: number;
  images: string[];
  farmerId: string;
  farmerName: string;
  location: string;
  organic: boolean;
  createdAt: string;
  updatedAt: string;
}

// Order types
export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'shipped' 
  | 'delivered' 
  | 'cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Order {
  id: string;
  buyerId: string;
  buyerName: string;
  farmerId: string;
  farmerName: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  deliveryAddress: string;
  deliveryDate?: string;
}

// Market price types
export interface MarketPrice {
  id: string;
  productName: string;
  category: ProductCategory;
  currentPrice: number;
  previousPrice: number;
  unit: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  updatedAt: string;
}

// Dashboard types
export interface DashboardStats {
  totalSales?: number;
  totalPurchases?: number;
  totalProducts?: number;
  totalOrders?: number;
  pendingOrders?: number;
  completedOrders?: number;
  revenue?: number;
  expenses?: number;
}
