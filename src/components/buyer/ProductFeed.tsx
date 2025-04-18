
import { useEffect, useState } from "react";
import ProductFeedItem from "./ProductFeedItem";
import { Product } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDataStore } from "@/services/DataSyncService";
import { Clock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductFeed = () => {
  const { products } = useDataStore();
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Sort products by creation date (newest first)
    const sorted = [...products].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setSortedProducts(sorted);
  }, [products]);
  
  const handleRefresh = () => {
    // Sort products by creation date (newest first)
    const sorted = [...products].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setSortedProducts(sorted);
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
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        {sortedProducts.length > 0 ? (
          <div className="space-y-4">
            {sortedProducts.map((product) => (
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
