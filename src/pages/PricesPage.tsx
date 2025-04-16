
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import PriceCard from "@/components/market/PriceCard";
import { marketPrices } from "@/data/mockData";
import { MarketPrice, ProductCategory } from "@/types";
import { Search, X, IndianRupee, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Form interface
interface ProduceFormValues {
  produceType: string;
  category: ProductCategory;
  quantity: string;
  location: string;
  price: string;
}

const PricesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | "all">("all");
  const [trendFilter, setTrendFilter] = useState<"all" | "up" | "down" | "stable">("all");
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProduceFormValues>({
    defaultValues: {
      produceType: "",
      category: "vegetables",
      quantity: "",
      location: "",
      price: "",
    },
  });

  const onSubmit = (data: ProduceFormValues) => {
    console.log("Submitted produce details:", data);
    
    // Show success message
    toast({
      title: "Produce Posted Successfully",
      description: `Your ${data.produceType} has been posted to the market.`,
    });
    
    // Reset form
    form.reset();
    
    // Close form
    setShowForm(false);
  };
  
  const filterPrices = () => {
    return marketPrices.filter(price => {
      // Apply search filter
      const matchesSearch = searchTerm === "" || 
        price.productName.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Apply category filter
      const matchesCategory = categoryFilter === "all" || price.category === categoryFilter;
      
      // Apply trend filter
      const matchesTrend = trendFilter === "all" || price.trend === trendFilter;
      
      return matchesSearch && matchesCategory && matchesTrend;
    });
  };
  
  const filteredPrices = filterPrices();
  
  // Get last update time
  const getLastUpdateTime = () => {
    if (marketPrices.length === 0) return "N/A";
    
    // Find the most recent update
    const latestUpdate = marketPrices.reduce((latest, price) => {
      const priceDate = new Date(price.updatedAt);
      return priceDate > latest ? priceDate : latest;
    }, new Date(0));
    
    return latestUpdate.toLocaleString();
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-farm-green-700 mb-2">
          Live Market Prices
        </h1>
        <p className="text-lg text-farm-green-600">
          Stay updated with the latest agricultural produce prices
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Last updated: {getLastUpdateTime()}
        </p>
      </div>
      
      {/* Farmer Produce Posting Section */}
      <Card className="bg-farm-green-50 mb-8 border border-farm-green-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-farm-green-700 flex justify-between items-center">
            <span>Post Your Agricultural Produce</span>
            <Button 
              variant="outline" 
              className="border-farm-green-600 text-farm-green-600 hover:bg-farm-green-100"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Cancel" : <><Plus className="h-4 w-4 mr-1" /> Post Produce</>}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {showForm ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="produceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type of Produce</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Wheat, Corn, Tomatoes" {...field} />
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
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity Available (kg)</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" step="0.1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price per kg (₹)</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Where is this produce available?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    className="bg-farm-green-600 hover:bg-farm-green-700"
                  >
                    Post to Market
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <p className="text-farm-green-700">
              Are you a farmer? Post details about your produce to reach local buyers. 
              Click the "Post Produce" button to get started.
            </p>
          )}
        </CardContent>
      </Card>
      
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search by product name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute right-2 top-2.5"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            )}
          </div>
          
          <div className="w-full md:w-[200px]">
            <Select 
              value={categoryFilter} 
              onValueChange={(value) => setCategoryFilter(value as ProductCategory | "all")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
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
          </div>
          
          <div className="w-full md:w-[200px]">
            <Select 
              value={trendFilter} 
              onValueChange={(value) => setTrendFilter(value as "all" | "up" | "down" | "stable")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Price Trend" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Trends</SelectItem>
                <SelectItem value="up">Price Up</SelectItem>
                <SelectItem value="down">Price Down</SelectItem>
                <SelectItem value="stable">Price Stable</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {filteredPrices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPrices.map((price) => (
            <PriceCard key={price.id} price={price} />
          ))}
        </div>
      ) : (
        <div className="bg-muted py-12 px-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-2">No price data found</h3>
          <p className="text-gray-600">
            Try adjusting your filters or checking back later for updates
          </p>
        </div>
      )}
      
      <div className="mt-12 bg-farm-green-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-farm-green-700 mb-4">
          Understanding Market Prices
        </h2>
        <p className="text-farm-green-600 mb-4">
          Our market price data is collected daily from various agricultural markets and updated regularly.
          Prices may vary based on location, quality, and seasonal factors.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-600 rounded-full mr-2"></div>
            <span>Price Increasing</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-600 rounded-full mr-2"></div>
            <span>Price Decreasing</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-600 rounded-full mr-2"></div>
            <span>Price Stable</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricesPage;
