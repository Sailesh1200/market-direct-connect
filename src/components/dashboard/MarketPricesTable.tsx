
import { MarketPrice } from "@/types";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface MarketPricesTableProps {
  marketPrices: MarketPrice[];
  onEdit: (id: string, type: string) => void;
  onDelete: (id: string, type: string) => void;
}

const MarketPricesTable = ({ marketPrices, onEdit, onDelete }: MarketPricesTableProps) => {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableCaption>List of all market prices</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Current Price</TableHead>
            <TableHead>Previous Price</TableHead>
            <TableHead>Trend</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {marketPrices.map((price) => (
            <TableRow key={price.id}>
              <TableCell className="font-medium">{price.productName}</TableCell>
              <TableCell>{price.category}</TableCell>
              <TableCell>${price.currentPrice.toFixed(2)}/{price.unit}</TableCell>
              <TableCell>${price.previousPrice.toFixed(2)}/{price.unit}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  price.trend === 'up' 
                    ? 'bg-green-100 text-green-800' 
                    : price.trend === 'down' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-gray-100 text-gray-800'
                }`}>
                  {price.trend}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onEdit(price.id, "market price")}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => onDelete(price.id, "market price")}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MarketPricesTable;
