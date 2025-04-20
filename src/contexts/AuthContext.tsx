
import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserRole, Product, ProductCategory } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useDataStore } from '@/services/DataSyncService';
import { useProducts } from '@/hooks/useProducts';
import { fetchProfile, fetchProducts, fetchNotifications } from '@/services/AuthService';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: any | null;
  products: Product[];
  signUp: (email: string, password: string, role: UserRole) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Product | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const { products, setProducts, addProduct: addNewProduct } = useProducts();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          // Defer profile and data fetching
          setTimeout(() => {
            handleUserData(session.user.id);
          }, 0);
        } else {
          clearUserData();
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        handleUserData(session.user.id);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleUserData = async (userId: string) => {
    const userProfile = await fetchProfile(userId);
    setProfile(userProfile);
    
    const productsData = await fetchProducts();
    
    // Map the Supabase products to match our Product type structure
    const mappedProducts = productsData.map((item: any) => ({
      id: item.id,
      name: item.name,
      description: item.description || '',
      category: item.category as ProductCategory,
      price: Number(item.price),
      unit: item.unit,
      quantity: Number(item.quantity),
      images: item.images || ['/placeholder.svg'],
      farmerId: item.farmer_id,
      farmerName: item.farmer_name,
      location: item.location || '',
      organic: item.organic || false,
      createdAt: item.created_at,
      updatedAt: item.updated_at
    }));
    
    setProducts(mappedProducts);
    
    const notifications = await fetchNotifications();
    if (notifications.length > 0) {
      useDataStore.getState().clearNotifications();
      notifications.forEach(notification => {
        useDataStore.getState().addNotification(notification);
      });
    }
  };

  const clearUserData = () => {
    setProfile(null);
    setProducts([]);
    useDataStore.getState().clearNotifications();
  };

  const signUp = async (email: string, password: string, role: UserRole) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { role },
        },
      });

      if (error) throw error;

      toast({
        title: 'Registration Successful',
        description: 'Your account has been created.',
      });

      return data;
    } catch (error: any) {
      toast({
        title: 'Registration Failed',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
      });

      return data;
    } catch (error: any) {
      toast({
        title: 'Login Failed',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
      });
    } catch (error: any) {
      toast({
        title: 'Logout Failed',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const addProduct = (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    return addNewProduct(product, user?.id || '', profile);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      profile, 
      products,
      signUp, 
      signIn, 
      signOut,
      addProduct
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
