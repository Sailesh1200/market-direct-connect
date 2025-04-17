
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Define a type for the trend
type TrendDirection = 'up' | 'down' | 'neutral';

// Define props with better TypeScript typing
interface DashboardStatProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: TrendDirection;
  percentage?: number;
  iconColor?: string;
  bgColor?: string;
  valueTextSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  className?: string;
  onClick?: () => void;
}

const DashboardStat = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  percentage,
  iconColor = "text-farm-green-600",
  bgColor,
  valueTextSize = '2xl',
  className,
  onClick
}: DashboardStatProps) => {
  // Function to determine CSS classes for trends
  const getTrendClass = (trend?: TrendDirection): string => {
    switch (trend) {
      case 'up':
        return 'text-farm-green-600';
      case 'down':
        return 'text-destructive';
      default:
        return 'text-gray-500';
    }
  };

  // Format the displayed value
  const formattedValue = typeof value === 'number' 
    ? value % 1 === 0 
      ? value 
      : value.toFixed(2)
    : value;

  // Get text size class based on valueTextSize prop
  const getValueTextSizeClass = () => {
    switch (valueTextSize) {
      case 'sm': return 'text-lg';
      case 'md': return 'text-xl';
      case 'lg': return 'text-2xl';
      case 'xl': return 'text-3xl';
      case '2xl': return 'text-4xl';
      case '3xl': return 'text-5xl';
      default: return 'text-2xl';
    }
  };

  return (
    <Card 
      className={cn(
        "dashboard-stat border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md", 
        bgColor,
        className,
        onClick && "cursor-pointer"
      )}
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <div className={`p-2.5 rounded-full bg-opacity-10 ${iconColor.replace('text-', 'bg-')}`}>
              <Icon className={`h-5 w-5 ${iconColor}`} />
            </div>
          </div>
          
          <div className="flex items-end justify-between">
            <div>
              <p className={cn("font-bold text-farm-green-700", getValueTextSizeClass())}>
                {formattedValue}
              </p>
              {description && (
                <p className="text-xs text-gray-500 mt-1">{description}</p>
              )}
            </div>
            
            {trend && percentage !== undefined && (
              <div className={`text-sm flex items-center font-semibold ${getTrendClass(trend)}`}>
                {trend === 'up' && '+'}
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
