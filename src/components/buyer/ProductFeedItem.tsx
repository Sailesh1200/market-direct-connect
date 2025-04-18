
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Product } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare, ExternalLink, User, MapPin, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProductFeedItemProps {
  product: Product;
}

const ProductFeedItem = ({ product }: ProductFeedItemProps) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  
  // Format the timestamp
  const timeAgo = formatDistanceToNow(new Date(product.createdAt), { addSuffix: true });
  
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="mb-4 border border-farm-brown-200 hover:shadow-md transition-all">
      <CardContent className="p-4 pt-4">
        {/* Farmer info and timestamp header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-farm-brown-100">
              <AvatarImage src={product.images[1] || ""} alt={product.farmerName} />
              <AvatarFallback className="bg-farm-green-100 text-farm-green-700">
                {getInitials(product.farmerName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-farm-green-700">{product.farmerName}</div>
              <div className="flex items-center text-xs text-gray-500">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{product.location}</span>
                <span className="mx-1">•</span>
                <span>{timeAgo}</span>
              </div>
            </div>
          </div>
          <div className="text-xs text-farm-brown-600 flex items-center">
            <Tag className="h-3 w-3 mr-1" />
            {product.category}
          </div>
        </div>
        
        {/* Product image */}
        {product.images[0] && (
          <div 
            className="relative aspect-video overflow-hidden rounded-md mb-3 cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
            {product.organic && (
              <div className="absolute top-2 left-2 bg-farm-green-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center">
                Organic
              </div>
            )}
          </div>
        )}
        
        {/* Product info */}
        <div 
          className="mb-3 cursor-pointer"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <h3 className="font-semibold text-farm-green-700 mb-1">
            {product.name}
          </h3>
          <p className={`text-sm text-gray-600 ${!expanded && "line-clamp-2"}`}>
            {product.description}
          </p>
          {product.description.length > 120 && (
            <button 
              className="text-xs text-farm-green-600 font-medium mt-1"
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(!expanded);
              }}
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}
          
          <div className="flex items-center mt-2 text-sm font-medium text-farm-green-700">
            <span className="mr-1">Price:</span>
            <span>₹{product.price.toFixed(2)}/{product.unit}</span>
            <span className="mx-2">•</span>
            <span className="mr-1">Available:</span>
            <span>{product.quantity} {product.unit}</span>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-2 mt-3">
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1 text-farm-brown-600 border-farm-brown-200"
            onClick={() => navigate(`/messages/farmer/${product.farmerId}`)}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact Farmer
          </Button>
          <Button 
            size="sm"
            className="flex-1 bg-farm-green-600 hover:bg-farm-green-700"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductFeedItem;
