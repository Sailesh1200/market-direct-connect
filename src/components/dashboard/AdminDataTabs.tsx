
import { useState } from "react";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Product, User, Order, MarketPrice } from "@/types";
import ProductsTable from "./ProductsTable";
import UsersTable from "./UsersTable";
import OrdersTable from "./OrdersTable";
import MarketPricesTable from "./MarketPricesTable";

interface AdminDataTabsProps {
  products: Product[];
  users: User[];
  orders: Order[];
  marketPrices: MarketPrice[];
  onEdit: (id: string, type: string) => void;
  onDelete: (id: string, type: string) => void;
  onAdd: (type: string) => void;
}

const AdminDataTabs = ({ 
  products, 
  users, 
  orders, 
  marketPrices,
  onEdit,
  onDelete,
  onAdd
}: AdminDataTabsProps) => {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-farm-green-700">
          Manage Platform Data
        </CardTitle>
        <Button 
          className="bg-farm-green-600 hover:bg-farm-green-700"
          onClick={() => onAdd(activeTab.slice(0, -1))}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New {activeTab.slice(0, -1)}
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="products" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="prices">Market Prices</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            <ProductsTable 
              products={products} 
              onEdit={onEdit} 
              onDelete={onDelete} 
            />
          </TabsContent>
          
          <TabsContent value="users">
            <UsersTable 
              users={users} 
              onEdit={onEdit} 
              onDelete={onDelete} 
            />
          </TabsContent>
          
          <TabsContent value="orders">
            <OrdersTable 
              orders={orders} 
              onEdit={onEdit} 
              onDelete={onDelete} 
            />
          </TabsContent>
          
          <TabsContent value="prices">
            <MarketPricesTable 
              marketPrices={marketPrices} 
              onEdit={onEdit} 
              onDelete={onDelete} 
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdminDataTabs;
