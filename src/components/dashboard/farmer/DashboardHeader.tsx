
import { User } from "@/types";
import { Button } from "@/components/ui/button";
import { PackagePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  user: User;
}

const DashboardHeader = ({ user }: DashboardHeaderProps) => {
  const navigate = useNavigate();
  
  const getDashboardTitle = () => {
    const timeOfDay = new Date().getHours() < 12 
      ? "Morning" 
      : new Date().getHours() < 18 
      ? "Afternoon" 
      : "Evening";
    
    return `Good ${timeOfDay}, ${user.name}`;
  };

  return (
    <div className="mb-8 border-l-4 border-farm-green-600 pl-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-farm-green-700 mb-2">
            {getDashboardTitle()}
          </h1>
          <p className="text-lg text-farm-green-600">
            Manage your agricultural products and monitor market trends
          </p>
        </div>
        <div>
          <Button 
            className="bg-farm-green-600 hover:bg-farm-green-700"
            onClick={() => navigate("/products/new")}
          >
            <PackagePlus className="mr-2 h-5 w-5" />
            Add Product
          </Button>
        </div>
      </div>
      <div className="mt-2 bg-farm-green-100 text-farm-green-800 px-3 py-1 inline-block rounded-md text-sm font-medium">
        Farmer Dashboard
      </div>
    </div>
  );
};

export default DashboardHeader;
