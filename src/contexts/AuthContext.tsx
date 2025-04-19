
import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Product, UserRole, ProductCategory } from '@/types';
import { useToast } from '@/hooks/use-toast';

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

// This helper function ensures the category is one of the valid ProductCategory types
const validateCategory = (category: string): ProductCategory => {
  const validCategories: ProductCategory[] = [
    'vegetables', 'fruits', 'grains', 'dairy', 'meat', 'poultry', 'herbs', 'other'
  ];
  
  return validCategories.includes(category as ProductCategory) 
    ? (category as ProductCategory) 
    : 'other';
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          // Defer profile fetching
          setTimeout(() => {
            fetchProfile(session.user.id);
            fetchProducts();
          }, 0);
        } else {
          setProfile(null);
          setProducts([]);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
        fetchProducts();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Transform Supabase products to match our app's Product type
      const transformedProducts: Product[] = data.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description || '',
        category: validateCategory(item.category), // Use our helper function here
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
      
      setProducts(transformedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const signUp = async (email: string, password: string, role: UserRole) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role,
          },
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

  const addProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!user || !profile) {
      toast({
        title: 'Authentication required',
        description: 'You must be logged in to add products',
        variant: 'destructive'
      });
      return null;
    }

    try {
      const supabaseProduct = {
        name: productData.name,
        description: productData.description,
        category: productData.category, // This is already a valid ProductCategory
        price: productData.price,
        unit: productData.unit,
        quantity: productData.quantity,
        images: productData.images || ['/placeholder.svg'],
        farmer_id: user.id,
        farmer_name: profile.name || user.email?.split('@')[0] || 'Unknown Farmer',
        location: productData.location,
        organic: productData.organic
      };

      const { data, error } = await supabase
        .from('products')
        .insert(supabaseProduct)
        .select()
        .single();

      if (error) throw error;

      const newProduct: Product = {
        id: data.id,
        name: data.name,
        description: data.description || '',
        category: validateCategory(data.category), // Use our helper function here
        price: Number(data.price),
        unit: data.unit,
        quantity: Number(data.quantity),
        images: data.images || ['/placeholder.svg'],
        farmerId: data.farmer_id,
        farmerName: data.farmer_name,
        location: data.location || '',
        organic: data.organic || false,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };

      // Optimistically update local state
      setProducts(prev => [newProduct, ...prev]);

      toast({
        title: 'Product Added',
        description: 'Your product has been successfully listed',
      });

      return newProduct;
    } catch (error: any) {
      toast({
        title: 'Failed to add product',
        description: error.message || 'An unexpected error occurred',
        variant: 'destructive'
      });
      return null;
    }
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
