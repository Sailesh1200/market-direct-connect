
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/market/ProductCard";
import PriceCard from "@/components/market/PriceCard";
import ProductFiltersComponent, { ProductFilters as ProductFiltersType } from "@/components/market/ProductFilters";
import { Product, MarketPrice } from "@/types";
import { products, marketPrices } from "@/data/mockData";
import { ListFilter, Grid3X3, AlignJustify, Map, Shield, BarChart2 } from "lucide-react";

const MarketPage = () => {
  const navigate = useNavigate();
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>(products);
  const [sortOption, setSortOption] = useState<string>("latest");
  const [showFilters, setShowFilters] = useState(false);
  const [gridView, setGridView] = useState<"grid" | "list">("grid");
  const [activeTab, setActiveTab] = useState<string>("products");
  
  const handleApplyFilters = (filters: ProductFiltersType) => {
    let filtered = [...products];
    
    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.description.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => 
        filters.categories.includes(product.category)
      );
    }
    
    // Apply price range filter
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1]
    );
    
    // Apply organic filter
    if (filters.organic) {
      filtered = filtered.filter(product => product.organic);
    }
    
    setDisplayedProducts(filtered);
  };
  
  const handleResetFilters = () => {
    setDisplayedProducts(products);
  };
  
  const handleSort = (value: string) => {
    setSortOption(value);
    
    let sorted = [...displayedProducts];
    
    switch (value) {
      case "priceLow":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "priceHigh":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "latest":
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    
    setDisplayedProducts(sorted);
  };
  
  // Apply sort when sort option changes
  useEffect(() => {
    handleSort(sortOption);
  }, [sortOption]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-farm-green-700 mb-2">
          Farmers Market
        </h1>
        <p className="text-lg text-farm-green-600">
          Browse fresh produce and track market prices
        </p>
      </div>
      
      {/* Featured Info Banner */}
      <div className="mb-8 bg-gradient-to-r from-farm-green-50 to-farm-green-100 p-4 rounded-lg border border-farm-green-200">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-full">
            <Shield className="h-6 w-6 text-farm-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-farm-green-700">Direct From Local Farmers</h3>
            <p className="text-sm text-farm-green-600">All produce listed comes directly from verified farmers in your region</p>
          </div>
          <Button 
            variant="outline" 
            className="ml-auto border-farm-green-600 text-farm-green-600 hover:bg-farm-green-50"
            onClick={() => window.open('/about-farmers', '_blank')}
          >
            Learn More
          </Button>
        </div>
      </div>
      
      {/* Tabs for Products and Prices */}
      <Tabs defaultValue="products" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Grid3X3 className="h-4 w-4" />
            <span>Products</span>
          </TabsTrigger>
          <TabsTrigger value="prices" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            <span>Market Prices</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* Products Tab Content */}
      <TabsContent value="products" className="mt-0">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center"
              onClick={() => setShowFilters(!showFilters)}
            >
              <ListFilter className="mr-2 h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>
          
          {/* Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:col-span-1`}>
            <ProductFiltersComponent 
              onApplyFilters={handleApplyFilters}
              onResetFilters={handleResetFilters}
            />
          </div>
          
          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-gray-600">
                Showing <span className="font-medium">{displayedProducts.length}</span> products
              </p>
              
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <Select value={sortOption} onValueChange={handleSort}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">Latest</SelectItem>
                    <SelectItem value="priceLow">Price: Low to High</SelectItem>
                    <SelectItem value="priceHigh">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="hidden sm:flex border rounded-md">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`px-2 ${gridView === 'grid' ? 'bg-muted' : ''}`}
                    onClick={() => setGridView("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`px-2 ${gridView === 'list' ? 'bg-muted' : ''}`}
                    onClick={() => setGridView("list")}
                  >
                    <AlignJustify className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="px-2"
                    onClick={() => navigate("/map-view")}
                  >
                    <Map className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {displayedProducts.length > 0 ? (
              <div className={`grid ${
                gridView === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              } gap-6`}>
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-muted py-12 px-6 rounded-lg text-center">
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria</p>
                <Button 
                  variant="outline" 
                  onClick={handleResetFilters}
                  className="border-farm-green-600 text-farm-green-600 hover:bg-farm-green-50"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </TabsContent>
      
      {/* Prices Tab Content */}
      <TabsContent value="prices" className="mt-0">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-farm-green-700">Market Prices</h2>
              <p className="text-gray-600">Track the latest commodity prices from local markets</p>
            </div>
            <Button 
              variant="outline" 
              className="border-farm-green-600 text-farm-green-600 hover:bg-farm-green-50"
              onClick={() => {/* Download prices */}}
            >
              Download Price List
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {marketPrices.map((price) => (
              <PriceCard key={price.id} price={price} />
            ))}
          </div>
        </div>
      </TabsContent>
    </div>
  );
};

export default MarketPage;
