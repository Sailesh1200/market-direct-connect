
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, IndianRupee, Leaf, Tag, MapPin, Star, User } from "lucide-react";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  
  // Convert unit to kg if it's lb
  const displayUnit = product.unit.toLowerCase() === "lb" ? "kg" : product.unit;

  return (
    <Card 
      className="product-card border border-gray-200 overflow-hidden"
    >
      <div 
        className="relative aspect-square bg-gray-100 cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img 
          src={product.images[0] || "/placeholder.svg"} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        {product.organic && (
          <div className="absolute top-2 left-2 bg-farm-green-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center">
            <Leaf className="h-3 w-3 mr-1" />
            Organic
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
          <div className="flex justify-between items-center">
            <span className="text-white text-xs font-medium flex items-center">
              <Tag className="h-3 w-3 mr-1" />
              {product.category}
            </span>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <div 
          className="flex justify-between items-start mb-2 cursor-pointer"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <h3 className="font-semibold text-farm-green-700 line-clamp-1">
            {product.name}
          </h3>
          <span className="text-farm-green-600 font-bold flex items-center">
            <IndianRupee className="h-3 w-3 mr-1" />
            {product.price.toFixed(2)}/{displayUnit}
          </span>
        </div>
        <p 
          className="text-sm text-gray-600 line-clamp-2 mb-2 cursor-pointer"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          {product.description}
        </p>
        
        {/* Enhanced Farmer Information */}
        <div className="mt-3 p-2 bg-farm-green-50 rounded-md border border-farm-green-100">
          <div className="flex items-center gap-2 mb-1 cursor-pointer" onClick={() => navigate(`/farmer/${product.farmerId}`)}>
            <div className="h-8 w-8 rounded-full bg-farm-green-100 flex items-center justify-center overflow-hidden">
              {product.images[1] ? (
                <img src={product.images[1]} alt={product.farmerName} className="h-full w-full object-cover" />
              ) : (
                <User className="h-4 w-4 text-farm-green-600" />
              )}
            </div>
            <div>
              <span className="font-medium text-farm-green-700">
                {product.farmerName}
              </span>
              <div className="flex items-center text-xs text-gray-500">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{product.location}</span>
              </div>
            </div>
            
            <div className="ml-auto flex items-center">
              <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
              <span className="text-xs ml-1 font-medium">4.8</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <Button 
            className="w-full bg-farm-green-600 hover:bg-farm-green-700 flex items-center justify-center gap-2"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <ShoppingCart className="h-4 w-4" />
            View Product
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
