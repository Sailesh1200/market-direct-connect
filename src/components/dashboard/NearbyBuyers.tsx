
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, MapPin, Star, ShoppingBag, User } from "lucide-react";
import { useState } from "react";
import { User as UserType } from "@/types";
import { Badge } from "@/components/ui/badge";

interface NearbyBuyersProps {
  buyers: UserType[];
  title?: string;
}

const NearbyBuyers = ({ buyers, title = "Nearby Buyers" }: NearbyBuyersProps) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  
  // Mock buyer ratings data
  const buyerRatings = {
    purchaseHistory: [3, 5, 12, 8, 2],
    ratings: [4.8, 4.2, 4.9, 3.7, 5.0],
    preferredCategories: [
      ["vegetables", "fruits"], 
      ["dairy", "herbs"], 
      ["vegetables", "grains"], 
      ["poultry", "meat"],
      ["fruits", "vegetables"]
    ]
  };

  return (
    <Card className="border border-farm-green-200 shadow-sm bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl text-farm-green-700">
          {title}
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-farm-green-600"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </CardHeader>
      
      <CardContent className={expanded ? "" : "max-h-[600px] overflow-hidden"}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {buyers.slice(0, expanded ? buyers.length : 4).map((buyer, index) => (
            <Card key={buyer.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-full bg-farm-brown-100 flex items-center justify-center overflow-hidden">
                    {buyer.avatar ? (
                      <img 
                        src={buyer.avatar} 
                        alt={buyer.name} 
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-6 w-6 text-farm-brown-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-farm-brown-700">{buyer.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{buyer.address || "No location specified"}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 text-sm">{buyer.rating || buyerRatings.ratings[index % 5]}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <ShoppingBag className="h-3 w-3 mr-1" />
                    <span>Purchase History: {buyerRatings.purchaseHistory[index % 5]} orders</span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <h4 className="text-sm font-medium text-gray-700">Preferred Categories</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {buyerRatings.preferredCategories[index % 5].map(category => (
                      <Badge key={category} variant="outline" className="text-xs bg-farm-brown-50 text-farm-brown-700 border-farm-brown-200">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button 
                    size="sm"
                    className="bg-farm-green-600 hover:bg-farm-green-700 text-white"
                    onClick={() => navigate(`/buyers/${buyer.id}`)}
                  >
                    View Profile
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-farm-green-600 border-farm-green-200"
                    onClick={() => navigate("/messages")}
                  >
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {!expanded && buyers.length > 4 && (
          <div className="mt-4 text-center">
            <Button
              variant="outline"
              className="border-farm-green-600 text-farm-green-600 hover:bg-farm-green-50"
              onClick={() => setExpanded(true)}
            >
              Show All Buyers
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full bg-farm-green-600 hover:bg-farm-green-700"
          onClick={() => navigate("/buyers")}
        >
          Browse All Buyers
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NearbyBuyers;
