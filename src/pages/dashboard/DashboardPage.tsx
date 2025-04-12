
import { User } from "@/types";
import FarmerDashboard from "./FarmerDashboard";
import BuyerDashboard from "./BuyerDashboard";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface DashboardPageProps {
  user: User;
}

const DashboardPage = ({ user }: DashboardPageProps) => {
  const { t } = useLanguage();
  
  // Render the appropriate dashboard based on user role
  if (user.role === "farmer") {
    return <FarmerDashboard user={user} />;
  } else if (user.role === "buyer") {
    return <BuyerDashboard user={user} />;
  } else if (user.role === "admin") {
    // For admin, we could create a dedicated AdminDashboard component
    // For now, we'll just render a placeholder
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-farm-green-700 mb-4">
          {t('adminDashboard')}
        </h1>
        <Card>
          <CardContent className="p-6">
            <p>{t('adminDashboardDescription')}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Fallback for unknown user roles
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-farm-green-700 mb-4">
        {t('unknownUserRole')}
      </h1>
      <Card>
        <CardContent className="p-6">
          <p>{t('unknownUserRoleDescription')}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
