
import { useNavigate } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import BackButton from "@/components/ui/back-button";

const Index = () => {
  return (
    <div className="relative">
      <div className="absolute top-4 left-4 z-10">
        <BackButton />
      </div>
      <HomePage />
    </div>
  );
};

export default Index;
