
import { Leaf, TrendingUp, Users, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: <Leaf className="h-12 w-12 text-farm-green-500" />,
      title: "Farm Fresh Produce",
      description: "Get the freshest produce directly from local farms. No preservatives, no long storage periods, just natural goodness."
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-farm-green-500" />,
      title: "Real-Time Market Prices",
      description: "Stay informed with up-to-date market prices. Make decisions based on current trends and get the best value."
    },
    {
      icon: <Users className="h-12 w-12 text-farm-green-500" />,
      title: "Direct Farmer Connection",
      description: "Connect directly with farmers. Learn about their practices, build relationships, and support sustainable agriculture."
    },
    {
      icon: <ShoppingCart className="h-12 w-12 text-farm-green-500" />,
      title: "Easy Ordering Process",
      description: "Browse, select, and order with a few clicks. Get your farm-fresh products delivered to your doorstep."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-farm-green-700 mb-4">
            Why Choose Farmers E-Market?
          </h2>
          <p className="text-lg text-farm-green-600 max-w-2xl mx-auto">
            Our platform offers unique benefits for both farmers and buyers, creating a sustainable marketplace for fresh produce.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border border-farm-green-100 shadow-sm bg-white transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2 flex justify-center">
                <div className="mb-2">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl text-farm-green-700 text-center">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-farm-green-600 text-center">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
