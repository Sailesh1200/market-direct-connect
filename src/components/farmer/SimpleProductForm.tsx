
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ProductCategory } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

const productFormSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  description: z.string().optional(),
  category: z.string().optional(),
  price: z.coerce.number().positive("Price must be a positive number"),
  unit: z.string().optional(),
  quantity: z.coerce.number().positive("Quantity must be a positive number"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  organic: z.boolean().default(false),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

interface SimpleProductFormProps {
  onSuccess?: () => void;
}

const SimpleProductForm = ({ onSuccess }: SimpleProductFormProps) => {
  const { toast } = useToast();
  const { addProduct, user, profile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues: Partial<ProductFormValues> = {
    name: "",
    description: "",
    category: "vegetables",
    price: 0,
    unit: "kg",
    quantity: 0,
    location: "",
    organic: false,
  };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: ProductFormValues) => {
    if (!user || !profile) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to add products.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare product data
      const productData = {
        name: data.name,
        description: data.description || `Fresh ${data.name} available now`,
        category: (data.category as ProductCategory) || "vegetables",
        price: data.price,
        unit: data.unit || "kg",
        quantity: data.quantity,
        images: ["/placeholder.svg"],
        farmerId: user.id,
        farmerName: profile.name || user.email?.split('@')[0] || 'Unknown Farmer',
        location: data.location,
        organic: data.organic,
      };
      
      // Add product using the AuthContext function
      const result = await addProduct(productData);
      
      if (result) {
        // Reset form
        form.reset(defaultValues);
        
        // Call onSuccess callback if provided
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add product",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Fresh Tomatoes" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input type="number" min={0} step={0.1} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="kg">Kilogram (kg)</SelectItem>
                    <SelectItem value="lb">Pound (lb)</SelectItem>
                    <SelectItem value="g">Gram (g)</SelectItem>
                    <SelectItem value="unit">Unit/Piece</SelectItem>
                    <SelectItem value="dozen">Dozen</SelectItem>
                    <SelectItem value="liter">Liter</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price per Unit (₹)</FormLabel>
              <FormControl>
                <Input type="number" min={0} step={0.01} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Chennai, Tamil Nadu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Description of your product" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="vegetables">Vegetables</SelectItem>
                  <SelectItem value="fruits">Fruits</SelectItem>
                  <SelectItem value="grains">Grains</SelectItem>
                  <SelectItem value="dairy">Dairy</SelectItem>
                  <SelectItem value="meat">Meat</SelectItem>
                  <SelectItem value="poultry">Poultry</SelectItem>
                  <SelectItem value="herbs">Herbs</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="organic"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Organic</FormLabel>
                <p className="text-sm text-muted-foreground">
                  This product is grown without synthetic pesticides or fertilizers
                </p>
              </div>
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full bg-farm-green-600 hover:bg-farm-green-700" disabled={isSubmitting}>
          {isSubmitting ? "Adding Product..." : "Add Product"}
        </Button>
      </form>
    </Form>
  );
};

export default SimpleProductForm;
