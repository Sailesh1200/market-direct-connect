
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-farm-green-100 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-farm-green-700 mb-4">
              Farm Fresh to Your Door
            </h1>
            <p className="text-lg md:text-xl text-farm-green-600 mb-8">
              Connect directly with local farmers. Cut out the middleman. 
              Support sustainable agriculture and get the freshest produce 
              at the best prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button 
                size="lg" 
                className="bg-farm-green-600 hover:bg-farm-green-700"
                onClick={() => navigate("/market")}
              >
                Explore Market
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-farm-green-600 text-farm-green-600 hover:bg-farm-green-50"
                onClick={() => navigate("/register")}
              >
                Join Today
              </Button>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden shadow-xl border border-farm-green-200 transform translate-y-0 hover:-translate-y-2 transition-transform duration-300">
            <img 
              src="/placeholder.svg"
              alt="Fresh farm produce" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
