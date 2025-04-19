
import { useEffect, useState } from "react";
import ProductFeedItem from "./ProductFeedItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const ProductFeed = () => {
  const { products } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulating refresh - the actual data refresh is handled by the Supabase real-time subscription
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };
  
  return (
    <Card className="border border-farm-brown-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-farm-brown-100">
        <CardTitle className="text-xl text-farm-brown-700 flex items-center">
          <Clock className="mr-2 h-5 w-5 text-farm-brown-600" />
          Product Feed
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-farm-brown-600"
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        {products.length > 0 ? (
          <div className="space-y-4">
            {products.map((product) => (
              <ProductFeedItem key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No products available in your feed yet.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductFeed;
