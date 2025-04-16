
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import PriceCard from "@/components/market/PriceCard";
import { marketPrices } from "@/data/mockData";
import { MarketPrice, ProductCategory } from "@/types";
import { Search, X, IndianRupee } from "lucide-react";

const PricesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | "all">("all");
  const [trendFilter, setTrendFilter] = useState<"all" | "up" | "down" | "stable">("all");
  
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
