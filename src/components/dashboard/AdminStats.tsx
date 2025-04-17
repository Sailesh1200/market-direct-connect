
import { 
  Users, 
  ShoppingBasket, 
  BarChart3, 
  ClipboardList 
} from "lucide-react";
import { DashboardStats } from "@/types";
import DashboardStat from "@/components/dashboard/DashboardStat";

interface AdminStatsProps {
  stats: DashboardStats;
  userCount: number;
}

const AdminStats = ({ stats, userCount }: AdminStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <DashboardStat 
        title="Total Products"
        value={stats.totalProducts?.toString() || "0"}
        icon={ShoppingBasket}
        trend="up"
        percentage={12}
        iconColor="text-farm-brown-600"
        bgColor="hover:bg-farm-brown-100/50"
      />
      <DashboardStat 
        title="Total Users"
        value={userCount.toString()}
        icon={Users}
        trend="up"
        percentage={8}
        iconColor="text-blue-600"
        bgColor="hover:bg-blue-100/50"
      />
      <DashboardStat 
        title="Total Orders"
        value={stats.totalOrders?.toString() || "0"}
        icon={ClipboardList}
        trend="up"
        percentage={5}
        iconColor="text-purple-600" 
        bgColor="hover:bg-purple-100/50"
      />
      <DashboardStat 
        title="Total Revenue"
        value={`$${stats.revenue?.toFixed(2) || "0"}`}
        icon={BarChart3}
        trend="up"
        percentage={15}
        iconColor="text-farm-green-600"
        bgColor="hover:bg-farm-green-100/50"
        valueTextSize="xl"
      />
    </div>
  );
};

export default AdminStats;
