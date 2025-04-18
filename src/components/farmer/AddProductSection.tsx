
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import SimpleProductForm from "@/components/farmer/SimpleProductForm";
import { User } from "@/types";

interface AddProductSectionProps {
  user: User;
}

const AddProductSection = ({ user }: AddProductSectionProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-farm-green-700">List New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          List your agricultural produce on the marketplace to connect with potential buyers.
        </p>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-farm-green-600 hover:bg-farm-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Add New Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Fill out the basic details to list your product.
              </DialogDescription>
            </DialogHeader>
            <SimpleProductForm 
              farmerId={user.id} 
              farmerName={user.name}
              onSuccess={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default AddProductSection;
