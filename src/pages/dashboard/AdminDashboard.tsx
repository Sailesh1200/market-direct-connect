
import { useNavigate } from "react-router-dom";
import { User } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { adminStats, users, products, orders, marketPrices } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import AdminStats from "@/components/dashboard/AdminStats";
import AdminDataTabs from "@/components/dashboard/AdminDataTabs";

interface AdminDashboardProps {
  user: User;
}

const AdminDashboard = ({ user }: AdminDashboardProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

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
      </div>

      <AdminStats stats={adminStats} userCount={users.length} />

      <AdminDataTabs 
        products={products}
        users={users}
        orders={orders}
        marketPrices={marketPrices}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
      />
    </div>
  );
};

export default AdminDashboard;
