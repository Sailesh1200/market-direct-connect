
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Product } from "@/types";

interface MarketPreviewProps {
  featuredProducts: Product[];
}

const MarketPreview = ({ featuredProducts }: MarketPreviewProps) => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-farm-green-700 mb-2">
              Featured Products
            </h2>
            <p className="text-lg text-farm-green-600">
              Explore our selection of fresh, farm-direct products available now
            </p>
          </div>
          <Button 
            variant="outline" 
            className="mt-4 md:mt-0 border-farm-green-600 text-farm-green-600 hover:bg-farm-green-50"
            onClick={() => navigate("/market")}
          >
            View All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card 
              key={product.id} 
              className="product-card border border-gray-200 overflow-hidden"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="relative aspect-square bg-gray-100">
                <img 
                  src={product.images[0] || "/placeholder.svg"} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
                {product.organic && (
                  <div className="absolute top-2 left-2 bg-farm-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                    Organic
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-farm-green-700 line-clamp-1">
                    {product.name}
                  </h3>
                  <span className="text-farm-green-600 font-bold">
                    ${product.price.toFixed(2)}/{product.unit}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center mt-2 text-sm">
                  <span className="text-farm-green-600">
                    By: {product.farmerName}
                  </span>
                  <span className="text-gray-500">
                    {product.location}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketPreview;
