import { useState } from "react";
import { User } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowRight, ShoppingBag, Truck, Search, Filter, User as UserIcon, Bell, ChevronUp, ChevronDown, MapPin, Star, IndianRupee } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { farmers, buyerStats, orders, marketPrices } from "@/data/mockData";
import DashboardStat from "@/components/dashboard/DashboardStat";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import PriceCard from "@/components/market/PriceCard";

// Dummy purchase data for chart
const purchaseData = [
  { name: "Jan", value: 150 },
  { name: "Feb", value: 220 },
  { name: "Mar", value: 180 },
  { name: "Apr", value: 320 },
  { name: "May", value: 250 },
  { name: "Jun", value: 400 },
  { name: "Jul", value: 350 }
];

interface BuyerDashboardProps {
  user: User;
}

const BuyerDashboard = ({ user }: BuyerDashboardProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [expandedFarmers, setExpandedFarmers] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedNotifications, setExpandedNotifications] = useState(false);

  // Filter orders for the current user
  const userOrders = orders.filter(order => order.buyerId === user.id);
  const pendingOrders = userOrders.filter(order => order.status === "pending" || order.status === "confirmed");

  // Create some mock notifications
  const notifications = [
    { 
      id: "1",
      farmerName: "Green Valley Farm",
      productName: "Organic Tomatoes",
      action: "updated",
      timestamp: new Date(Date.now() - 3600000).toISOString()
    },
    { 
      id: "2",
      farmerName: "Sunset Orchard",
      productName: "Fresh Apples",
      action: "added",
      timestamp: new Date(Date.now() - 86400000).toISOString()
    },
    { 
      id: "3",
      farmerName: "River View Dairy",
      productName: "Whole Milk",
      action: "price changed",
      timestamp: new Date(Date.now() - 172800000).toISOString()
    }
  ];

  // Filter farmers based on search query
  const filteredFarmers = farmers.filter(farmer => 
    farmer.name.toLowerCase().includes(searchQuery.toLowerCase())
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

  // Format time for notifications
  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-farm-brown-50 to-white">
      <div className="mb-8 border-l-4 border-farm-brown-600 pl-4">
        <h1 className="text-3xl font-bold text-farm-brown-700 mb-2">
          {getDashboardTitle()}
        </h1>
        <p className="text-lg text-farm-brown-600">
          {t('buyerDashboardDesc')}
        </p>
        <div className="mt-2 bg-farm-brown-100 text-farm-brown-800 px-3 py-1 inline-block rounded-md text-sm font-medium">
          Buyer Dashboard
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardStat 
          title={t('totalPurchases')}
          value={`₹${buyerStats.totalPurchases}`} 
          icon={ShoppingBag}
          description={t('lifetimeSpending')}
          trend="up"
          percentage={8.3}
          iconColor="text-farm-brown-600"
        />
        <DashboardStat 
          title={t('ordersPlaced')}
          value={buyerStats.totalOrders || 0}
          icon={Truck}
          description={t('totalOrdersHistory')}
          trend="up"
          percentage={5.7}
          iconColor="text-farm-brown-600"
        />
        <DashboardStat 
          title={t('pendingOrders')}
          value={buyerStats.pendingOrders || 0}
          icon={Bell}
          description={t('ordersInProgress')}
          iconColor="text-farm-brown-600"
        />
        <DashboardStat 
          title={t('completedOrders')}
          value={buyerStats.completedOrders || 0}
          icon={Truck}
          description={t('successfullyReceived')}
          trend="up"
          percentage={12.1}
          iconColor="text-farm-brown-600"
        />
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Purchase History Chart */}
        <Card className="lg:col-span-2 border border-farm-brown-200 shadow-sm bg-white">
          <CardHeader className="pb-2 border-b border-farm-brown-100">
            <CardTitle className="text-xl text-farm-brown-700">
              {t('purchaseHistory')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={purchaseData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#A67C37" 
                    fill="#F5EFE7" 
                    fillOpacity={0.8} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter className="border-t border-farm-brown-100">
            <Button 
              variant="outline" 
              className="border-farm-brown-600 text-farm-brown-600 hover:bg-farm-brown-50"
              onClick={() => navigate("/orders")}
            >
              {t('viewOrderHistory')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        {/* Notifications */}
        <Card className="border border-farm-brown-200 shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-farm-brown-100">
            <CardTitle className="text-xl text-farm-brown-700">
              {t('recentUpdates')}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-farm-brown-600"
              onClick={() => setExpandedNotifications(!expandedNotifications)}
            >
              {expandedNotifications ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CardHeader>
          <CardContent>
            {notifications.length > 0 ? (
              <div className="space-y-4">
                {notifications.slice(0, expandedNotifications ? notifications.length : 3).map(notification => (
                  <div key={notification.id} className="border-b border-farm-brown-100 pb-4 last:border-0">
                    <div className="flex items-start">
                      <div className="bg-farm-brown-100 p-2 rounded-full mr-3">
                        <Bell className="h-4 w-4 text-farm-brown-600" />
                      </div>
                      <div>
                        <p className="font-medium">{notification.farmerName}</p>
                        <p className="text-sm text-gray-600">
                          {notification.action} {notification.productName}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatTimeAgo(notification.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">{t('noRecentUpdates')}</p>
            )}
          </CardContent>
          <CardFooter className="border-t border-farm-brown-100">
            <Button 
              className="w-full bg-farm-brown-600 hover:bg-farm-brown-700"
              onClick={() => navigate("/notifications")}
            >
              {t('viewAllUpdates')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Farmer Profiles */}
      <Card className="mb-8 border border-farm-brown-200 shadow-sm bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl text-farm-brown-700">
            {t('connectedFarmers')}
          </CardTitle>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder={t('searchFarmers')}
                className="pl-9 h-9 w-64 border-gray-300 focus:border-farm-brown-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-farm-brown-600"
              onClick={() => setExpandedFarmers(!expandedFarmers)}
            >
              {expandedFarmers ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className={expandedFarmers ? "" : "max-h-[600px] overflow-hidden"}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFarmers.slice(0, expandedFarmers ? filteredFarmers.length : 6).map((farmer) => (
              <Card key={farmer.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-12 w-12 rounded-full bg-farm-green-100 flex items-center justify-center">
                      {farmer.avatar ? (
                        <img 
                          src={farmer.avatar} 
                          alt={farmer.name} 
                          className="h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        <UserIcon className="h-6 w-6 text-farm-green-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-farm-green-700">{farmer.name}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{farmer.address || "No location specified"}</span>
                      </div>
                      {farmer.rating && (
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="ml-1 text-sm">{farmer.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700">{t('availableProducts')}</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {["vegetables", "fruits", "herbs"].map(product => (
                        <Badge key={product} variant="outline" className="text-xs bg-farm-green-50 text-farm-green-700 border-farm-green-200">
                          {product}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button 
                      size="sm"
                      className="bg-farm-green-600 hover:bg-farm-green-700 text-white"
                      onClick={() => navigate(`/farmers/${farmer.id}`)}
                    >
                      {t('viewProfile')}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-farm-green-600 border-farm-green-200"
                      onClick={() => navigate("/messages")}
                    >
                      {t('message')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {!expandedFarmers && filteredFarmers.length > 6 && (
            <div className="mt-4 text-center">
              <Button
                variant="outline"
                className="border-farm-green-600 text-farm-green-600 hover:bg-farm-green-50"
                onClick={() => setExpandedFarmers(true)}
              >
                {t('showAllFarmers')}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-farm-green-600 hover:bg-farm-green-700"
            onClick={() => navigate("/farmers")}
          >
            {t('browseAllFarmers')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      {/* Market Prices */}
      <Card className="mb-8 border border-farm-brown-200 shadow-sm bg-white">
        <CardHeader className="pb-2 border-b border-farm-brown-100">
          <CardTitle className="text-xl text-farm-brown-700">
            {t('trendingMarketPrices')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketPrices.slice(0, 4).map((price) => (
              <PriceCard key={price.id} price={price} />
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t border-farm-brown-100">
          <Button 
            className="w-full bg-farm-brown-600 hover:bg-farm-brown-700"
            onClick={() => navigate("/prices")}
          >
            {t('viewAllMarketPrices')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border border-farm-brown-200 shadow-sm hover:shadow-md transition-all bg-white">
          <CardContent className="pt-6">
            <div className="flex justify-center mb-4">
              <ShoppingBag className="h-8 w-8 text-farm-brown-600" />
            </div>
            <h3 className="text-lg font-semibold text-center text-farm-brown-700 mb-2">
              {t('browseMarket')}
            </h3>
            <p className="text-sm text-center text-gray-600 mb-4">
              {t('discoverFreshProducts')}
            </p>
          </CardContent>
          <CardFooter className="border-t border-farm-brown-100">
            <Button 
              className="w-full bg-farm-brown-600 hover:bg-farm-brown-700"
              onClick={() => navigate("/market")}
            >
              {t('goToMarket')}
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="border border-farm-brown-200 shadow-sm hover:shadow-md transition-all bg-white">
          <CardContent className="pt-6">
            <div className="flex justify-center mb-4">
              <Truck className="h-8 w-8 text-farm-brown-600" />
            </div>
            <h3 className="text-lg font-semibold text-center text-farm-brown-700 mb-2">
              {t('trackOrders')}
            </h3>
            <p className="text-sm text-center text-gray-600 mb-4">
              {t('viewAndTrackOrders')}
            </p>
          </CardContent>
          <CardFooter className="border-t border-farm-brown-100">
            <Button 
              className="w-full bg-farm-brown-600 hover:bg-farm-brown-700"
              onClick={() => navigate("/orders")}
            >
              {t('goToOrders')}
            </Button>
          </CardFooter>
        </Card>

        <Card className="border border-farm-brown-200 shadow-sm hover:shadow-md transition-all bg-white">
          <CardContent className="pt-6">
            <div className="flex justify-center mb-4">
              <UserIcon className="h-8 w-8 text-farm-brown-600" />
            </div>
            <h3 className="text-lg font-semibold text-center text-farm-brown-700 mb-2">
              {t('findFarmers')}
            </h3>
            <p className="text-sm text-center text-gray-600 mb-4">
              {t('connectWithLocalFarmers')}
            </p>
          </CardContent>
          <CardFooter className="border-t border-farm-brown-100">
            <Button 
              className="w-full bg-farm-brown-600 hover:bg-farm-brown-700"
              onClick={() => navigate("/farmers")}
            >
              {t('browseFarmers')}
            </Button>
          </CardFooter>
        </Card>

        <Card className="border border-farm-brown-200 shadow-sm hover:shadow-md transition-all bg-white">
          <CardContent className="pt-6">
            <div className="flex justify-center mb-4">
              <Bell className="h-8 w-8 text-farm-brown-600" />
            </div>
            <h3 className="text-lg font-semibold text-center text-farm-brown-700 mb-2">
              {t('notifications')}
            </h3>
            <p className="text-sm text-center text-gray-600 mb-4">
              {t('stayUpdatedWithChanges')}
            </p>
          </CardContent>
          <CardFooter className="border-t border-farm-brown-100">
            <Button 
              className="w-full bg-farm-brown-600 hover:bg-farm-brown-700"
              onClick={() => navigate("/notifications")}
            >
              {t('viewNotifications')}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default BuyerDashboard;
