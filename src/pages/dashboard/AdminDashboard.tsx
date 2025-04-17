
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "@/types";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { adminStats, users, products, orders, marketPrices } from "@/data/mockData";
import { DashboardStats } from "@/types";
import DashboardStat from "@/components/dashboard/DashboardStat";
import { 
  Users, 
  ShoppingBasket, 
  BarChart3, 
  ClipboardList,
  Plus,
  Pencil,
  Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface AdminDashboardProps {
  user: User;
}

const AdminDashboard = ({ user }: AdminDashboardProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("products");

  // Stats for the admin dashboard
  const stats: DashboardStats = adminStats;

  // Function to handle delete action (simulated)
  const handleDelete = (id: string, type: string) => {
    toast({
      title: `${type} Deleted`,
      description: `${type} with ID ${id} has been deleted successfully.`,
    });
  };

  // Function to handle edit action (simulated)
  const handleEdit = (id: string, type: string) => {
    toast({
      title: `Edit ${type}`,
      description: `Editing ${type} with ID ${id}.`,
    });
  };

  // Function to handle add action (simulated)
  const handleAdd = (type: string) => {
    toast({
      title: `Add New ${type}`,
      description: `Creating a new ${type}.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-farm-green-700 mb-2">
            {t('adminDashboard')}
          </h1>
          <p className="text-farm-green-600">
            {t('adminDashboardDescription')}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            className="bg-farm-green-600 hover:bg-farm-green-700"
            onClick={() => handleAdd(activeTab.slice(0, -1))}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New {activeTab.slice(0, -1)}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardStat 
          title="Total Products"
          value={stats.totalProducts?.toString() || "0"}
          icon={<ShoppingBasket size={32} className="text-farm-green-600" />}
          trend="up"
          percentage={12}
        />
        <DashboardStat 
          title="Total Users"
          value={users.length.toString()}
          icon={<Users size={32} className="text-farm-green-600" />}
          trend="up"
          percentage={8}
        />
        <DashboardStat 
          title="Total Orders"
          value={stats.totalOrders?.toString() || "0"}
          icon={<ClipboardList size={32} className="text-farm-green-600" />}
          trend="up"
          percentage={5}
        />
        <DashboardStat 
          title="Total Revenue"
          value={`$${stats.revenue?.toFixed(2) || "0"}`}
          icon={<BarChart3 size={32} className="text-farm-green-600" />}
          trend="up"
          percentage={15}
        />
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-farm-green-700">
            Manage Platform Data
          </CardTitle>
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
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableCaption>List of all products on the platform</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Farmer</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>${product.price.toFixed(2)}/{product.unit}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.farmerName}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEdit(product.id, "product")}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDelete(product.id, "product")}
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
            </TabsContent>
            
            <TabsContent value="users">
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableCaption>List of all users on the platform</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell className="capitalize">{user.role}</TableCell>
                        <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEdit(user.id, "user")}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDelete(user.id, "user")}
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
            </TabsContent>
            
            <TabsContent value="orders">
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableCaption>List of all orders on the platform</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Buyer</TableHead>
                      <TableHead>Farmer</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.buyerName}</TableCell>
                        <TableCell>{order.farmerName}</TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                        <TableCell className="capitalize">{order.status}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEdit(order.id, "order")}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDelete(order.id, "order")}
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
            </TabsContent>
            
            <TabsContent value="prices">
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
                              onClick={() => handleEdit(price.id, "market price")}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDelete(price.id, "market price")}
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
