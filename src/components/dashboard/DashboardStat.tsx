
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface DashboardStatProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  percentage?: number;
  iconColor?: string;
}

const DashboardStat = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  percentage,
  iconColor = "text-farm-green-600"
}: DashboardStatProps) => {
  const getTrendClass = () => {
    switch (trend) {
      case 'up':
        return 'price-up';
      case 'down':
        return 'price-down';
      default:
        return 'price-neutral';
    }
  };

  return (
    <Card className="dashboard-stat border border-gray-200 shadow-sm">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <div className={`p-2 rounded-full bg-opacity-10 ${iconColor.replace('text-', 'bg-')}`}>
              <Icon className={`h-5 w-5 ${iconColor}`} />
            </div>
          </div>
          
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold text-farm-green-700">
                {typeof value === 'number' && value % 1 === 0
                  ? value
                  : typeof value === 'number'
                  ? value.toFixed(2)
                  : value}
              </p>
              {description && (
                <p className="text-xs text-gray-500 mt-1">{description}</p>
              )}
            </div>
            
            {trend && percentage !== undefined && (
              <div className={`text-sm ${getTrendClass()} flex items-center`}>
                {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}
                {Math.abs(percentage).toFixed(1)}%
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardStat;
