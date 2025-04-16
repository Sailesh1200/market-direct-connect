
import { Card, CardContent } from "@/components/ui/card";
import { MarketPrice } from "@/types";
import { TrendingUp, TrendingDown, Minus, IndianRupee, Leaf, Wheat } from "lucide-react";

interface PriceCardProps {
  price: MarketPrice;
}

const PriceCard = ({ price }: PriceCardProps) => {
  const getTrendIcon = () => {
    switch (price.trend) {
      case "up":
        return <TrendingUp className="h-5 w-5 text-green-600" />;
      case "down":
        return <TrendingDown className="h-5 w-5 text-red-600" />;
      default:
        return <Minus className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTrendColorClass = () => {
    switch (price.trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getChangeSigns = () => {
    if (price.change > 0) {
      return "+";
    }
    return price.change < 0 ? "" : "±"; // No sign needed for negative, ± for zero
  };

  // Convert unit to kg if it's lb
  const displayUnit = price.unit.toLowerCase() === "lb" ? "kg" : price.unit;

  // Get category-specific icon
  const getCategoryIcon = () => {
    switch (price.category) {
      case "vegetables":
      case "fruits":
        return <Leaf className="h-5 w-5 text-farm-green-500" />;
      case "grains":
        return <Wheat className="h-5 w-5 text-farm-brown-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
      <div className="absolute right-0 bottom-0 w-16 h-16 opacity-5">
        <img 
          src="/placeholder.svg" 
          alt={price.productName} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="mr-2 mt-1">
              {getCategoryIcon()}
            </div>
            <div>
              <h3 className="font-semibold text-farm-green-700">{price.productName}</h3>
              <p className="text-sm text-gray-500 capitalize">{price.category}</p>
            </div>
          </div>
          <div className="flex items-center">
            {getTrendIcon()}
          </div>
        </div>
        
        <div className="mt-3 flex justify-between items-end">
          <div>
            <p className="text-sm text-gray-600">Current Price</p>
            <p className="text-xl font-bold text-farm-green-700">
              <span className="flex items-center">
                <IndianRupee className="h-4 w-4 mr-1" />
                {price.currentPrice.toFixed(2)}/{displayUnit}
              </span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Change</p>
            <p className={`font-semibold ${getTrendColorClass()}`}>
              {getChangeSigns()}{Math.abs(price.change).toFixed(2)} ({getChangeSigns()}{Math.abs((price.change / price.previousPrice) * 100).toFixed(1)}%)
            </p>
          </div>
        </div>

        <div className="text-xs text-gray-500 mt-2">
          Last updated: {new Date(price.updatedAt).toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceCard;
