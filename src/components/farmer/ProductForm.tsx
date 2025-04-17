
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useDataStore } from "@/services/DataSyncService";
import { ProductCategory } from "@/types";

// Define the schema for product form validation
const productFormSchema = z.object({
  name: z.string().min(3, {
    message: "Product name must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  category: z.enum([
    "vegetables", 
    "fruits", 
    "grains", 
    "dairy", 
    "meat", 
    "poultry", 
    "herbs", 
    "other"
  ] as const),
  price: z.coerce.number().positive({
    message: "Price must be a positive number.",
  }),
  unit: z.string().min(1, {
    message: "Unit is required.",
  }),
  quantity: z.coerce.number().int().positive({
    message: "Quantity must be a positive number.",
  }),
  organic: z.boolean().default(false),
  location: z.string().min(3, {
    message: "Location must be at least 3 characters.",
  }),
});

interface ProductFormProps {
  farmerId: string;
  farmerName: string;
  onSuccess?: () => void;
}

const ProductForm = ({ farmerId, farmerName, onSuccess }: ProductFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addProduct } = useDataStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with default values
  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "vegetables",
      price: 0,
      unit: "lb",
      quantity: 1,
      organic: false,
      location: "",
    },
  });

  // Handle form submission
  const onSubmit = (values: z.infer<typeof productFormSchema>) => {
    setIsSubmitting(true);
    
    // Create new product object
    const newProduct = {
      id: Date.now().toString(),
      ...values,
      images: ["/placeholder.svg"],
      farmerId,
      farmerName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Add product to the data store
      addProduct(newProduct);
      
      // Show success toast
      toast({
        title: "Product Listed Successfully",
        description: "Your product has been listed on the marketplace.",
      });
      
      // Reset form
      form.reset();
      setIsSubmitting(false);
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    }, 1000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Fresh Organic Tomatoes" {...field} />
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
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
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
        </div>
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your product..." 
                  className="min-h-32" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="0.01" 
                    placeholder="5.99" 
                    {...field} 
                  />
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
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a unit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="lb">Pound (lb)</SelectItem>
                    <SelectItem value="kg">Kilogram (kg)</SelectItem>
                    <SelectItem value="unit">Unit</SelectItem>
                    <SelectItem value="dozen">Dozen</SelectItem>
                    <SelectItem value="bundle">Bundle</SelectItem>
                    <SelectItem value="bag">Bag</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Available Quantity</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="100" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Farm Location</FormLabel>
                <FormControl>
                  <Input placeholder="Countryside Farm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="organic"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Organic Product</FormLabel>
                  <FormDescription>
                    Check if your product is certified organic.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end gap-4">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="bg-farm-green-600 hover:bg-farm-green-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Listing Product..." : "List Product"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
