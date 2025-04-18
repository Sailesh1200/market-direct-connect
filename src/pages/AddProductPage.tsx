
import React from "react";
import { User } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SimpleProductForm from "@/components/farmer/SimpleProductForm";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface AddProductPageProps {
  user: User;
}

const AddProductPage = ({ user }: AddProductPageProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSuccess = () => {
    toast({
      title: "Product Added Successfully",
      description: "Your product has been listed on the marketplace.",
    });
    navigate("/dashboard");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Button 
        variant="ghost" 
        onClick={() => navigate("/dashboard")}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-farm-green-700">Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <SimpleProductForm 
            farmerId={user.id}
            farmerName={user.name}
            onSuccess={handleSuccess}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProductPage;
