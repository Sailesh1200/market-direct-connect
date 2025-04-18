
import { User } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import DashboardStat from "@/components/dashboard/DashboardStat";
import { farmerStats, orders, buyers, products } from "@/data/mockData";
import { TrendingUp, Package, Clock, Truck } from "lucide-react";
import DashboardHeader from "@/components/dashboard/farmer/DashboardHeader";
import SalesChart from "@/components/dashboard/farmer/SalesChart";
import QuickActions from "@/components/dashboard/farmer/QuickActions";
import NearbyBuyers from "@/components/dashboard/NearbyBuyers";
import AddProductSection from "@/components/farmer/AddProductSection";

interface FarmerDashboardProps {
  user: User;
}

const FarmerDashboard = ({ user }: FarmerDashboardProps) => {
  const { t } = useLanguage();
  
  const userProducts = products.filter(product => product.farmerId === user.id);
  const pendingOrders = orders.filter(order => 
    order.farmerId === user.id && order.status === "pending"
  );

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-farm-green-50 to-white">
      <DashboardHeader user={user} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardStat 
          title={t('totalSales')} 
          value={`₹${farmerStats.totalSales}`} 
          icon={TrendingUp}
          description={t('lifetimeSalesValue')}
          trend="up"
          percentage={12.5}
          iconColor="text-farm-green-600"
        />
        <DashboardStat 
          title={t('products')}
          value={farmerStats.totalProducts || 0}
          icon={Package}
          description={t('activeProductListings')}
          iconColor="text-farm-green-600"
        />
        <DashboardStat 
          title={t('pendingOrders')}
          value={farmerStats.pendingOrders || 0}
          icon={Clock}
          description={t('ordersAwaitingAction')}
          trend={farmerStats.pendingOrders && farmerStats.pendingOrders > 5 ? "up" : "neutral"}
          percentage={farmerStats.pendingOrders && farmerStats.pendingOrders > 5 ? 8.2 : 0}
          iconColor="text-farm-green-600"
        />
        <DashboardStat 
          title={t('completedOrders')}
          value={farmerStats.completedOrders || 0}
          icon={Truck}
          description={t('successfullyFulfilled')}
          trend="up"
          percentage={4.3}
          iconColor="text-farm-green-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <SalesChart />
        <AddProductSection user={user} />
      </div>

      <NearbyBuyers buyers={buyers.slice(0, 6)} title="Nearby Buyers" />

      <QuickActions />
    </div>
  );
};

export default FarmerDashboard;
