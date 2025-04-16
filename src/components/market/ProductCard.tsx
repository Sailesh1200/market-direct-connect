
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, IndianRupee, Leaf, Tag } from "lucide-react";
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
        <div 
          className="flex justify-between items-center mt-2 text-sm cursor-pointer"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <div className="flex items-center">
            <img 
              src="/placeholder.svg"
              alt="Farmer" 
              className="w-5 h-5 rounded-full object-cover mr-1"
            />
            <span className="text-farm-green-600">
              {product.farmerName}
            </span>
          </div>
          <span className="text-gray-500">
            {product.location}
          </span>
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
