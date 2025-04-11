
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

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
          <div className="absolute top-2 left-2 bg-farm-green-600 text-white text-xs font-bold px-2 py-1 rounded">
            Organic
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div 
          className="flex justify-between items-start mb-2 cursor-pointer"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <h3 className="font-semibold text-farm-green-700 line-clamp-1">
            {product.name}
          </h3>
          <span className="text-farm-green-600 font-bold">
            ${product.price.toFixed(2)}/{product.unit}
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
          <span className="text-farm-green-600">
            By: {product.farmerName}
          </span>
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
