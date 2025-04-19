
import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: any | null;
  products: Product[];
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, role: 'farmer' | 'buyer') => Promise<any>;
  signOut: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Product | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        // Use setTimeout to prevent deadlock
        setTimeout(() => {
          fetchProfile(session.user.id);
        }, 0);
      } else {
        setProfile(null);
      }
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // Fetch products initially
    fetchProducts();

    // Set up real-time subscription to products table
    const channel = supabase
      .channel('public:products')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'products' }, 
        (payload) => {
          console.log('Real-time product update:', payload);
          fetchProducts(); // Refetch all products on any change
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }
      
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
      
      if (error) {
        console.error('Error fetching products:', error);
        return;
      }
      
      // Transform Supabase products to match our app's Product type
      const transformedProducts: Product[] = data.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description || '',
        category: item.category as any,
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

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const signUp = async (email: string, password: string, role: 'farmer' | 'buyer') => {
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
    return data;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
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
      // Transform product data to match Supabase schema
      const supabaseProduct = {
        name: productData.name,
        description: productData.description,
        category: productData.category,
        price: productData.price,
        unit: productData.unit,
        quantity: productData.quantity,
        images: productData.images,
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

      if (error) {
        console.error('Error adding product:', error);
        toast({
          title: 'Failed to add product',
          description: error.message,
          variant: 'destructive'
        });
        return null;
      }

      // Transform the returned data to match our Product type
      const newProduct: Product = {
        id: data.id,
        name: data.name,
        description: data.description || '',
        category: data.category as any,
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

      toast({
        title: 'Product Added',
        description: 'Your product has been successfully listed',
      });

      return newProduct;
    } catch (error: any) {
      console.error('Error adding product:', error);
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
      signIn, 
      signUp, 
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
