
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { ArrowRight, ShoppingBag, Truck, DollarSign, BarChart, Package, Clock } from "lucide-react";
import { User, DashboardStats } from "@/types";
import { products, orders, farmerStats, buyerStats, adminStats } from "@/data/mockData";
import DashboardStat from "@/components/dashboard/DashboardStat";

interface DashboardPageProps {
  user: User;
}

// Dummy sales data for chart
const salesData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 280 },
  { name: "May", value: 590 },
  { name: "Jun", value: 800 },
  { name: "Jul", value: 810 }
];

const DashboardPage = ({ user }: DashboardPageProps) => {
  const navigate = useNavigate();
  
  // Get appropriate stats based on user role
  const getStats = (): DashboardStats => {
    switch (user.role) {
      case "farmer":
        return farmerStats;
      case "buyer":
        return buyerStats;
      case "admin":
        return adminStats;
      default:
        return {};
    }
  };
  
  const stats = getStats();
  
  // Get filtered products and orders for the current user
  const userProducts = products.filter(product => 
    user.role === "farmer" ? product.farmerId === user.id : true
  );
  
  const userOrders = orders.filter(order => 
    user.role === "farmer" 
      ? order.farmerId === user.id 
      : user.role === "buyer" 
      ? order.buyerId === user.id 
      : true
  );
  
  const pendingOrders = userOrders.filter(order => order.status === "pending");
  
  // Define dashboard greeting and description based on user role
  const getDashboardTitle = () => {
    const timeOfDay = new Date().getHours() < 12 
      ? "Morning" 
      : new Date().getHours() < 18 
      ? "Afternoon" 
      : "Evening";
    
    return `Good ${timeOfDay}, ${user.name}`;
  };
  
  const getDashboardDescription = () => {
    switch (user.role) {
      case "farmer":
        return "Manage your farm products and track your orders";
      case "buyer":
        return "Browse products and manage your purchases";
      case "admin":
        return "Monitor and manage the Farmers E-Market platform";
      default:
        return "Welcome to your dashboard";
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-farm-green-700 mb-2">
          {getDashboardTitle()}
        </h1>
        <p className="text-lg text-farm-green-600">
          {getDashboardDescription()}
        </p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {user.role === "farmer" && (
          <>
            <DashboardStat 
              title="Total Sales" 
              value={`$${stats.totalSales}`} 
              icon={DollarSign}
              description="Lifetime sales value"
              trend="up"
              percentage={12.5}
            />
            <DashboardStat 
              title="Products"
              value={stats.totalProducts || 0}
              icon={Package}
              description="Active product listings"
            />
            <DashboardStat 
              title="Pending Orders"
              value={stats.pendingOrders || 0}
              icon={Clock}
              description="Orders awaiting action"
              trend={stats.pendingOrders && stats.pendingOrders > 5 ? "up" : "neutral"}
              percentage={stats.pendingOrders && stats.pendingOrders > 5 ? 8.2 : 0}
            />
            <DashboardStat 
              title="Completed Orders"
              value={stats.completedOrders || 0}
              icon={Truck}
              description="Successfully fulfilled"
              trend="up"
              percentage={4.3}
            />
          </>
        )}

        {user.role === "buyer" && (
          <>
            <DashboardStat 
              title="Total Purchases" 
              value={`$${stats.totalPurchases}`} 
              icon={ShoppingBag}
              description="Lifetime spending"
            />
            <DashboardStat 
              title="Orders Placed"
              value={stats.totalOrders || 0}
              icon={Package}
              description="Total orders history"
            />
            <DashboardStat 
              title="Pending Orders"
              value={stats.pendingOrders || 0}
              icon={Clock}
              description="Orders in progress"
            />
            <DashboardStat 
              title="Completed Orders"
              value={stats.completedOrders || 0}
              icon={Truck}
              description="Successfully received"
            />
          </>
        )}

        {user.role === "admin" && (
          <>
            <DashboardStat 
              title="Platform Revenue" 
              value={`$${stats.revenue}`} 
              icon={DollarSign}
              description="Total platform revenue"
              trend="up"
              percentage={15.2}
            />
            <DashboardStat 
              title="Total Products"
              value={stats.totalProducts || 0}
              icon={Package}
              description="Active listings"
              trend="up"
              percentage={7.1}
            />
            <DashboardStat 
              title="Total Orders"
              value={stats.totalOrders || 0}
              icon={ShoppingBag}
              description="Orders processed"
              trend="up"
              percentage={4.5}
            />
            <DashboardStat 
              title="Pending Orders"
              value={stats.pendingOrders || 0}
              icon={Clock}
              description="Requiring attention"
              trend="down"
              percentage={2.3}
            />
          </>
        )}
      </div>
      
      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Sales/Purchase Chart */}
        <Card className="lg:col-span-2 border border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-farm-green-700">
              {user.role === "farmer" ? "Sales Overview" : user.role === "buyer" ? "Purchase History" : "Platform Activity"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={salesData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#4A9C38" 
                    fill="#E7F3E2" 
                    fillOpacity={0.8} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="border-farm-green-600 text-farm-green-600 hover:bg-farm-green-50"
              onClick={() => navigate("/reports")}
            >
              View Detailed Reports
              <BarChart className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        {/* Recent Activity / Pending Orders */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-farm-green-700">
              {pendingOrders.length > 0 ? "Pending Orders" : "Recent Activity"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pendingOrders.length > 0 ? (
              <div className="space-y-4">
                {pendingOrders.slice(0, 4).map(order => (
                  <div key={order.id} className="border-b pb-4 last:border-0">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">Order #{order.id}</p>
                        <p className="text-sm text-gray-500">
                          {user.role === "farmer" ? order.buyerName : order.farmerName}
                        </p>
                      </div>
                      <p className="font-semibold text-farm-green-600">${order.total.toFixed(2)}</p>
                    </div>
                    <p className="text-sm mt-1">
                      {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No pending orders</p>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-farm-green-600 hover:bg-farm-green-700"
              onClick={() => navigate("/orders")}
            >
              View All Orders
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {user.role === "farmer" && (
          <>
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <Package className="h-8 w-8 text-farm-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-center text-farm-green-700 mb-2">
                  Manage Products
                </h3>
                <p className="text-sm text-center text-gray-600 mb-4">
                  Update your product listings and inventory
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-farm-green-600 hover:bg-farm-green-700"
                  onClick={() => navigate("/products")}
                >
                  Go to Products
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <Truck className="h-8 w-8 text-farm-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-center text-farm-green-700 mb-2">
                  Manage Orders
                </h3>
                <p className="text-sm text-center text-gray-600 mb-4">
                  View and process pending orders
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-farm-green-600 hover:bg-farm-green-700"
                  onClick={() => navigate("/orders")}
                >
                  Go to Orders
                </Button>
              </CardFooter>
            </Card>
          </>
        )}

        {user.role === "buyer" && (
          <>
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <ShoppingBag className="h-8 w-8 text-farm-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-center text-farm-green-700 mb-2">
                  Browse Market
                </h3>
                <p className="text-sm text-center text-gray-600 mb-4">
                  Discover fresh products from local farmers
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-farm-green-600 hover:bg-farm-green-700"
                  onClick={() => navigate("/market")}
                >
                  Go to Market
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <Truck className="h-8 w-8 text-farm-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-center text-farm-green-700 mb-2">
                  Track Orders
                </h3>
                <p className="text-sm text-center text-gray-600 mb-4">
                  View and track your order status
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-farm-green-600 hover:bg-farm-green-700"
                  onClick={() => navigate("/orders")}
                >
                  Go to Orders
                </Button>
              </CardFooter>
            </Card>
          </>
        )}

        {/* Common for all users */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all">
          <CardContent className="pt-6">
            <div className="flex justify-center mb-4">
              <BarChart className="h-8 w-8 text-farm-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-center text-farm-green-700 mb-2">
              Market Prices
            </h3>
            <p className="text-sm text-center text-gray-600 mb-4">
              View real-time agricultural price data
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-farm-green-600 hover:bg-farm-green-700"
              onClick={() => navigate("/prices")}
            >
              View Prices
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all">
          <CardContent className="pt-6">
            <div className="flex justify-center mb-4">
              <DollarSign className="h-8 w-8 text-farm-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-center text-farm-green-700 mb-2">
              Your Profile
            </h3>
            <p className="text-sm text-center text-gray-600 mb-4">
              Manage your account information and settings
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-farm-green-600 hover:bg-farm-green-700"
              onClick={() => navigate("/profile")}
            >
              Go to Profile
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
