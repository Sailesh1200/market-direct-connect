
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AreaChart as AreaChartIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const salesData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 280 },
  { name: "May", value: 590 },
  { name: "Jun", value: 800 },
  { name: "Jul", value: 810 }
];

const SalesChart = () => {
  const navigate = useNavigate();

  return (
    <Card className="lg:col-span-2 border border-farm-green-200 shadow-sm bg-white">
      <CardHeader className="pb-2 border-b border-farm-green-100">
        <CardTitle className="text-xl text-farm-green-700">
          Sales Overview
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
      <CardFooter className="border-t border-farm-green-100">
        <Button 
          variant="outline" 
          className="border-farm-green-600 text-farm-green-600 hover:bg-farm-green-50"
          onClick={() => navigate("/reports")}
        >
          View Detailed Reports
          <AreaChartIcon className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SalesChart;
