
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const HowItWorks = () => {
  const navigate = useNavigate();
  
  const steps = [
    {
      title: "Register on our platform",
      description: "Create your account as a farmer or buyer to get started on your journey.",
      color: "bg-farm-green-100 border-farm-green-300"
    },
    {
      title: "Connect with local partners",
      description: "Farmers list their products, buyers browse and connect directly.",
      color: "bg-farm-brown-100 border-farm-brown-300"
    },
    {
      title: "Place orders & arrange delivery",
      description: "Negotiate prices, place orders, and arrange for pickup or delivery.",
      color: "bg-farm-green-100 border-farm-green-300"
    },
    {
      title: "Enjoy fresh produce & fair prices",
      description: "Farmers get better profits, buyers get fresher produce at fair prices.",
      color: "bg-farm-brown-100 border-farm-brown-300"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-farm-green-700 mb-4">
            How Farmers E-Market Works
          </h2>
          <p className="text-lg text-farm-green-600 max-w-2xl mx-auto">
            Our simple process connects farmers directly with buyers, creating a fair and efficient marketplace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`rounded-xl p-6 ${step.color} border relative`}
            >
              <div className="flex justify-center items-center w-10 h-10 bg-white rounded-full border border-gray-200 text-farm-green-700 font-bold mb-4">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold text-farm-green-700 mb-3">
                {step.title}
              </h3>
              <p className="text-farm-green-600">
                {step.description}
              </p>
              
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 w-6 border-t-2 border-dashed border-farm-green-300 z-10"></div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 max-w-3xl mx-auto border border-farm-green-100">
          <h3 className="text-2xl font-bold text-farm-green-700 mb-4">
            Benefits for Everyone
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="text-xl font-semibold text-farm-green-600 mb-3">
                For Farmers
              </h4>
              <ul className="space-y-2">
                {["Higher profit margins", "Direct customer feedback", "Flexible selling options", "Reduced waste"].map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-farm-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-farm-green-600 mb-3">
                For Buyers
              </h4>
              <ul className="space-y-2">
                {["Fresher produce", "Transparent pricing", "Support local farmers", "Know your food source"].map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-farm-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex justify-center mt-4">
            <Button 
              className="bg-farm-green-600 hover:bg-farm-green-700"
              onClick={() => navigate("/register")}
            >
              Join Our Community Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
