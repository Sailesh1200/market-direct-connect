
import { User, Product, Order, MarketPrice, DashboardStats } from '../types';

// Mock users data
export const users: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@farmfresh.com",
    role: "farmer",
    avatar: "/placeholder.svg",
    phone: "+1234567890",
    address: "123 Farm Road, Countryside",
    createdAt: "2023-01-15T08:30:00Z",
    rating: 4.8
  },
  {
    id: "2",
    name: "Emily Brown",
    email: "emily@market.com",
    role: "buyer",
    avatar: "/placeholder.svg",
    phone: "+1987654321",
    address: "456 Market Street, Downtown",
    createdAt: "2023-02-20T10:15:00Z",
    rating: 4.6
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@farmersmarket.com",
    role: "admin",
    avatar: "/placeholder.svg",
    createdAt: "2023-01-01T00:00:00Z",
  }
];

// Mock products data
export const products: Product[] = [
  {
    id: "1",
    name: "Fresh Organic Tomatoes",
    description: "Locally grown organic tomatoes, perfect for salads and cooking.",
    category: "vegetables",
    price: 3.99,
    unit: "lb",
    quantity: 100,
    images: ["/placeholder.svg"],
    farmerId: "1",
    farmerName: "John Smith",
    location: "Countryside Farm",
    organic: true,
    createdAt: "2023-03-10T09:20:00Z",
    updatedAt: "2023-03-10T09:20:00Z"
  },
  {
    id: "2",
    name: "Golden Delicious Apples",
    description: "Sweet and juicy apples, freshly harvested from our orchard.",
    category: "fruits",
    price: 2.49,
    unit: "lb",
    quantity: 200,
    images: ["/placeholder.svg"],
    farmerId: "1",
    farmerName: "John Smith",
    location: "Countryside Farm",
    organic: true,
    createdAt: "2023-03-12T11:30:00Z",
    updatedAt: "2023-03-12T11:30:00Z"
  },
  {
    id: "3",
    name: "Organic Brown Rice",
    description: "Nutritious brown rice grown without pesticides, perfect for a healthy diet.",
    category: "grains",
    price: 5.99,
    unit: "kg",
    quantity: 50,
    images: ["/placeholder.svg"],
    farmerId: "1",
    farmerName: "John Smith",
    location: "Countryside Farm",
    organic: true,
    createdAt: "2023-03-15T14:45:00Z",
    updatedAt: "2023-03-15T14:45:00Z"
  },
  {
    id: "4",
    name: "Farm Fresh Eggs",
    description: "Free-range eggs from happy chickens, packed with nutrients.",
    category: "poultry",
    price: 4.50,
    unit: "dozen",
    quantity: 30,
    images: ["/placeholder.svg"],
    farmerId: "1",
    farmerName: "John Smith",
    location: "Countryside Farm",
    organic: true,
    createdAt: "2023-03-18T08:10:00Z",
    updatedAt: "2023-03-18T08:10:00Z"
  },
  {
    id: "5",
    name: "Fresh Baby Spinach",
    description: "Tender baby spinach leaves, perfect for salads and smoothies.",
    category: "vegetables",
    price: 3.29,
    unit: "bundle",
    quantity: 40,
    images: ["/placeholder.svg"],
    farmerId: "1",
    farmerName: "John Smith",
    location: "Countryside Farm",
    organic: true,
    createdAt: "2023-03-20T10:25:00Z",
    updatedAt: "2023-03-20T10:25:00Z"
  }
];

// Mock orders data
export const orders: Order[] = [
  {
    id: "1",
    buyerId: "2",
    buyerName: "Emily Brown",
    farmerId: "1",
    farmerName: "John Smith",
    items: [
      {
        productId: "1",
        productName: "Fresh Organic Tomatoes",
        quantity: 5,
        price: 3.99,
        subtotal: 19.95
      },
      {
        productId: "2",
        productName: "Golden Delicious Apples",
        quantity: 3,
        price: 2.49,
        subtotal: 7.47
      }
    ],
    total: 27.42,
    status: "confirmed",
    createdAt: "2023-04-05T15:20:00Z",
    updatedAt: "2023-04-05T16:30:00Z",
    deliveryAddress: "456 Market Street, Downtown",
    deliveryDate: "2023-04-08T10:00:00Z"
  },
  {
    id: "2",
    buyerId: "2",
    buyerName: "Emily Brown",
    farmerId: "1",
    farmerName: "John Smith",
    items: [
      {
        productId: "3",
        productName: "Organic Brown Rice",
        quantity: 2,
        price: 5.99,
        subtotal: 11.98
      }
    ],
    total: 11.98,
    status: "pending",
    createdAt: "2023-04-10T09:15:00Z",
    updatedAt: "2023-04-10T09:15:00Z",
    deliveryAddress: "456 Market Street, Downtown"
  }
];

// Mock market prices data
export const marketPrices: MarketPrice[] = [
  {
    id: "1",
    productName: "Tomatoes",
    category: "vegetables",
    currentPrice: 3.99,
    previousPrice: 4.25,
    unit: "lb",
    change: -0.26,
    trend: "down",
    updatedAt: "2023-04-11T08:30:00Z"
  },
  {
    id: "2",
    productName: "Apples",
    category: "fruits",
    currentPrice: 2.49,
    previousPrice: 2.30,
    unit: "lb",
    change: 0.19,
    trend: "up",
    updatedAt: "2023-04-11T08:30:00Z"
  },
  {
    id: "3",
    productName: "Brown Rice",
    category: "grains",
    currentPrice: 5.99,
    previousPrice: 5.99,
    unit: "kg",
    change: 0,
    trend: "stable",
    updatedAt: "2023-04-11T08:30:00Z"
  },
  {
    id: "4",
    productName: "Eggs",
    category: "poultry",
    currentPrice: 4.50,
    previousPrice: 4.20,
    unit: "dozen",
    change: 0.30,
    trend: "up",
    updatedAt: "2023-04-11T08:30:00Z"
  },
  {
    id: "5",
    productName: "Spinach",
    category: "vegetables",
    currentPrice: 3.29,
    previousPrice: 3.50,
    unit: "bundle",
    change: -0.21,
    trend: "down",
    updatedAt: "2023-04-11T08:30:00Z"
  },
  {
    id: "6",
    productName: "Milk",
    category: "dairy",
    currentPrice: 3.79,
    previousPrice: 3.65,
    unit: "gallon",
    change: 0.14,
    trend: "up",
    updatedAt: "2023-04-11T08:30:00Z"
  },
  {
    id: "7",
    productName: "Beef",
    category: "meat",
    currentPrice: 8.99,
    previousPrice: 8.99,
    unit: "lb",
    change: 0,
    trend: "stable",
    updatedAt: "2023-04-11T08:30:00Z"
  },
  {
    id: "8",
    productName: "Basil",
    category: "herbs",
    currentPrice: 2.99,
    previousPrice: 3.25,
    unit: "bunch",
    change: -0.26,
    trend: "down",
    updatedAt: "2023-04-11T08:30:00Z"
  }
];

// Mock dashboard stats
export const farmerStats: DashboardStats = {
  totalSales: 2500.75,
  totalProducts: 15,
  totalOrders: 85,
  pendingOrders: 12,
  completedOrders: 73,
  revenue: 8975.50
};

export const buyerStats: DashboardStats = {
  totalPurchases: 750.25,
  totalOrders: 25,
  pendingOrders: 3,
  completedOrders: 22,
  expenses: 750.25
};

export const adminStats: DashboardStats = {
  totalSales: 15750.80,
  totalProducts: 120,
  totalOrders: 350,
  pendingOrders: 45,
  completedOrders: 305,
  revenue: 15750.80
};
