
import { 
  Users, 
  ShoppingBasket, 
  BarChart3, 
  ClipboardList 
} from "lucide-react";
import { DashboardStats, User } from "@/types";
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
      />
      <DashboardStat 
        title="Total Users"
        value={userCount.toString()}
        icon={Users}
        trend="up"
        percentage={8}
      />
      <DashboardStat 
        title="Total Orders"
        value={stats.totalOrders?.toString() || "0"}
        icon={ClipboardList}
        trend="up"
        percentage={5}
      />
      <DashboardStat 
        title="Total Revenue"
        value={`$${stats.revenue?.toFixed(2) || "0"}`}
        icon={BarChart3}
        trend="up"
        percentage={15}
      />
    </div>
  );
};

export default AdminStats;
