
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { useToast } from "@/hooks/use-toast";
import { useDataStore } from "@/services/DataSyncService";

const productFormSchema = z.object({
  name: z.string().min(3, {
    message: "Product name must be at least 3 characters.",
  }),
  quantity: z.coerce.number().positive({
    message: "Quantity must be a positive number.",
  }),
  location: z.string().min(3, {
    message: "Location must be at least 3 characters.",
  }),
});

interface SimpleProductFormProps {
  farmerId: string;
  farmerName: string;
  onSuccess?: () => void;
}

const SimpleProductForm = ({ farmerId, farmerName, onSuccess }: SimpleProductFormProps) => {
  const { toast } = useToast();
  const { addProduct } = useDataStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      quantity: 0,
      location: "",
    },
  });

  const onSubmit = (values: z.infer<typeof productFormSchema>) => {
    setIsSubmitting(true);
    
    const newProduct = {
      id: Date.now().toString(),
      name: values.name,
      description: `${values.quantity}kg of ${values.name}`,
      category: "other",
      price: 0,
      unit: "kg",
      quantity: values.quantity,
      organic: false,
      location: values.location,
      images: ["/placeholder.svg"],
      farmerId,
      farmerName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setTimeout(() => {
      addProduct(newProduct);
      toast({
        title: "Product Added Successfully",
        description: "Your product has been listed on the marketplace.",
      });
      form.reset();
      setIsSubmitting(false);
      if (onSuccess) {
        onSuccess();
      }
    }, 1000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter product name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity (kg)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter quantity" {...field} />
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
                <Input placeholder="Enter location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-4">
          <Button 
            type="submit" 
            className="bg-farm-green-600 hover:bg-farm-green-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding Product..." : "Add Product"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SimpleProductForm;
