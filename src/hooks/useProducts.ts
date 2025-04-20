
import { useState } from 'react';
import { Product, ProductCategory } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const validateCategory = (category: string): ProductCategory => {
  const validCategories: ProductCategory[] = [
    'vegetables', 'fruits', 'grains', 'dairy', 'meat', 'poultry', 'herbs', 'other'
  ];
  
  return validCategories.includes(category as ProductCategory) 
    ? (category as ProductCategory) 
    : 'other';
};

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { toast } = useToast();

  const addProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>, userId: string, profile: any) => {
    if (!userId || !profile) {
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
        category: productData.category,
        price: productData.price,
        unit: productData.unit,
        quantity: productData.quantity,
        images: productData.images || ['/placeholder.svg'],
        farmer_id: userId,
        farmer_name: profile.name || 'Unknown Farmer',
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
        category: validateCategory(data.category),
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

      // Update products array with the new product at the beginning
      setProducts([newProduct, ...products]);

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

  return {
    products,
    setProducts,
    addProduct
  };
};
