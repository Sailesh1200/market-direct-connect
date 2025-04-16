
import { Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

const Logo = ({ size = "md" }: LogoProps) => {
  const navigate = useNavigate();
  
  // Size classes based on the size prop
  const sizeClasses = {
    sm: "h-6 text-sm",
    md: "h-8 text-base",
    lg: "h-10 text-lg",
  };
  
  return (
    <div 
      className="flex items-center cursor-pointer" 
      onClick={() => navigate("/")}
    >
      <div className="flex items-center justify-center bg-farm-green-600 text-white rounded-md mr-2">
        <div className={`p-1 ${sizeClasses[size]}`}>
          <Leaf className="h-full w-auto" />
        </div>
      </div>
      <span className={`font-bold ${sizeClasses[size]} text-farm-green-700`}>
        Farmers E-Market
      </span>
    </div>
  );
};

export default Logo;
