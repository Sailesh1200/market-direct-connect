
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <Features />
      <HowItWorks />
    </div>
  );
};

export default HomePage;
