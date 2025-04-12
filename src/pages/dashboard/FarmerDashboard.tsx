
import { useState, useEffect } from "react";
import { User } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowRight, TrendingUp, TrendingDown, Minus, AreaChart as AreaChartIcon, Package, Clock, Truck, ChevronUp, ChevronDown, Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { marketPrices, products, farmerStats, orders } from "@/data/mockData";
import DashboardStat from "@/components/dashboard/DashboardStat";
import { useNavigate } from "react-router-dom";
import PriceCard from "@/components/market/PriceCard";
import { Badge } from "@/components/ui/badge";

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

interface FarmerDashboardProps {
  user: User;
}

const FarmerDashboard = ({ user }: FarmerDashboardProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [expandedPrices, setExpandedPrices] = useState(false);
  const [expandedAvailability, setExpandedAvailability] = useState(false);

  // Get filtered products and orders for the current user
  const userProducts = products.filter(product => product.farmerId === user.id);
  const pendingOrders = orders.filter(order => 
    order.farmerId === user.id && order.status === "pending"
  );

  // Define dashboard greeting based on time of day
  const getDashboardTitle = () => {
    const timeOfDay = new Date().getHours() < 12 
      ? "Morning" 
      : new Date().getHours() < 18 
      ? "Afternoon" 
      : "Evening";
    
    return `Good ${timeOfDay}, ${user.name}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-farm-green-700 mb-2">
          {getDashboardTitle()}
        </h1>
        <p className="text-lg text-farm-green-600">
          {t('farmerDashboardDesc')}
        </p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardStat 
          title={t('totalSales')} 
          value={`$${farmerStats.totalSales}`} 
          icon={TrendingUp}
          description={t('lifetimeSalesValue')}
          trend="up"
          percentage={12.5}
        />
        <DashboardStat 
          title={t('products')}
          value={farmerStats.totalProducts || 0}
          icon={Package}
          description={t('activeProductListings')}
        />
        <DashboardStat 
          title={t('pendingOrders')}
          value={farmerStats.pendingOrders || 0}
          icon={Clock}
          description={t('ordersAwaitingAction')}
          trend={farmerStats.pendingOrders && farmerStats.pendingOrders > 5 ? "up" : "neutral"}
          percentage={farmerStats.pendingOrders && farmerStats.pendingOrders > 5 ? 8.2 : 0}
        />
        <DashboardStat 
          title={t('completedOrders')}
          value={farmerStats.completedOrders || 0}
          icon={Truck}
          description={t('successfullyFulfilled')}
          trend="up"
          percentage={4.3}
        />
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Sales Chart */}
        <Card className="lg:col-span-2 border border-gray-200 shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-farm-green-700">
              {t('salesOverview')}
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
              {t('viewDetailedReports')}
              <AreaChartIcon className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        {/* Pending Orders */}
        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-farm-green-700">
              {pendingOrders.length > 0 ? t('pendingOrders') : t('recentActivity')}
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
                          {order.buyerName}
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
              <p className="text-gray-500 text-center py-8">{t('noPendingOrders')}</p>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-farm-green-600 hover:bg-farm-green-700"
              onClick={() => navigate("/orders")}
            >
              {t('viewAllOrders')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Market Price Monitoring */}
      <Card className="mb-8 border border-gray-200 shadow-sm bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl text-farm-green-700">
            {t('marketPriceMonitoring')}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-farm-green-600"
            onClick={() => setExpandedPrices(!expandedPrices)}
          >
            {expandedPrices ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </CardHeader>
        <CardContent className={expandedPrices ? "" : "max-h-96 overflow-hidden"}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketPrices.slice(0, expandedPrices ? marketPrices.length : 4).map((price) => (
              <PriceCard key={price.id} price={price} />
            ))}
          </div>
          {!expandedPrices && marketPrices.length > 4 && (
            <div className="mt-4 text-center">
              <Button
                variant="outline"
                className="border-farm-green-600 text-farm-green-600 hover:bg-farm-green-50"
                onClick={() => setExpandedPrices(true)}
              >
                Show All Market Prices
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-farm-green-600 hover:bg-farm-green-700"
            onClick={() => navigate("/prices")}
          >
            {t('viewAllMarketPrices')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      {/* Product Availability Management */}
      <Card className="mb-8 border border-gray-200 shadow-sm bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl text-farm-green-700">
            {t('manageProductAvailability')}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-farm-green-600"
            onClick={() => setExpandedAvailability(!expandedAvailability)}
          >
            {expandedAvailability ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </CardHeader>
        <CardContent className={expandedAvailability ? "" : "max-h-96 overflow-hidden"}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userProducts.slice(0, expandedAvailability ? userProducts.length : 3).map((product) => (
              <Card key={product.id} className="border border-gray-200 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-farm-green-700">{product.name}</h3>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="bg-farm-green-50 text-farm-green-700 border-farm-green-200">
                          {product.category}
                        </Badge>
                        {product.organic && (
                          <Badge className="bg-farm-green-600">
                            Organic
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="font-bold text-farm-green-700">${product.price}/{product.unit}</p>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-sm text-gray-600">Available Quantity</p>
                    <p className="text-lg font-medium">{product.quantity} {product.unit}</p>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-farm-green-600 border-farm-green-200"
                      onClick={() => navigate(`/products/${product.id}`)}
                    >
                      Update
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Add New Product Card */}
            <Card className="border border-dashed border-gray-300 shadow-none bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => navigate("/products/new")}>
              <CardContent className="p-4 flex flex-col items-center justify-center h-full min-h-[200px]">
                <Plus className="h-10 w-10 text-farm-green-600 mb-2" />
                <p className="text-farm-green-700 font-medium">{t('addNewProduct')}</p>
              </CardContent>
            </Card>
          </div>

          {!expandedAvailability && userProducts.length > 3 && (
            <div className="mt-4 text-center">
              <Button
                variant="outline"
                className="border-farm-green-600 text-farm-green-600 hover:bg-farm-green-50"
                onClick={() => setExpandedAvailability(true)}
              >
                {t('showAllProducts')}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-farm-green-600 hover:bg-farm-green-700"
            onClick={() => navigate("/products")}
          >
            {t('manageAllProducts')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all bg-white">
          <CardContent className="pt-6">
            <div className="flex justify-center mb-4">
              <Package className="h-8 w-8 text-farm-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-center text-farm-green-700 mb-2">
              {t('manageProducts')}
            </h3>
            <p className="text-sm text-center text-gray-600 mb-4">
              {t('updateProductListings')}
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-farm-green-600 hover:bg-farm-green-700"
              onClick={() => navigate("/products")}
            >
              {t('goToProducts')}
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all bg-white">
          <CardContent className="pt-6">
            <div className="flex justify-center mb-4">
              <Truck className="h-8 w-8 text-farm-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-center text-farm-green-700 mb-2">
              {t('manageOrders')}
            </h3>
            <p className="text-sm text-center text-gray-600 mb-4">
              {t('viewAndProcessOrders')}
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-farm-green-600 hover:bg-farm-green-700"
              onClick={() => navigate("/orders")}
            >
              {t('goToOrders')}
            </Button>
          </CardFooter>
        </Card>

        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all bg-white">
          <CardContent className="pt-6">
            <div className="flex justify-center mb-4">
              <AreaChartIcon className="h-8 w-8 text-farm-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-center text-farm-green-700 mb-2">
              {t('marketPrices')}
            </h3>
            <p className="text-sm text-center text-gray-600 mb-4">
              {t('viewMarketPrices')}
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-farm-green-600 hover:bg-farm-green-700"
              onClick={() => navigate("/prices")}
            >
              {t('viewPrices')}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default FarmerDashboard;
