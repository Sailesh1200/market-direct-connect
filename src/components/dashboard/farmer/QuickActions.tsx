
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Package, Truck, AreaChart as AreaChartIcon } from "lucide-react";

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all bg-white">
        <CardContent className="pt-6">
          <div className="flex justify-center mb-4">
            <Package className="h-8 w-8 text-farm-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-center text-farm-green-700 mb-2">
            Manage Products
          </h3>
          <p className="text-sm text-center text-gray-600 mb-4">
            Update your product listings
          </p>
          <Button 
            className="w-full bg-farm-green-600 hover:bg-farm-green-700"
            onClick={() => navigate("/products")}
          >
            Go to Products
          </Button>
        </CardContent>
      </Card>
      
      <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all bg-white">
        <CardContent className="pt-6">
          <div className="flex justify-center mb-4">
            <Truck className="h-8 w-8 text-farm-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-center text-farm-green-700 mb-2">
            Manage Orders
          </h3>
          <p className="text-sm text-center text-gray-600 mb-4">
            View and process orders
          </p>
          <Button 
            className="w-full bg-farm-green-600 hover:bg-farm-green-700"
            onClick={() => navigate("/orders")}
          >
            Go to Orders
          </Button>
        </CardContent>
      </Card>

      <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all bg-white">
        <CardContent className="pt-6">
          <div className="flex justify-center mb-4">
            <AreaChartIcon className="h-8 w-8 text-farm-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-center text-farm-green-700 mb-2">
            Market Prices
          </h3>
          <p className="text-sm text-center text-gray-600 mb-4">
            View market prices
          </p>
          <Button 
            className="w-full bg-farm-green-600 hover:bg-farm-green-700"
            onClick={() => navigate("/prices")}
          >
            View Prices
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickActions;
