
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import MarketPreview from "@/components/home/MarketPreview";
import Testimonials from "@/components/home/Testimonials";
import { products } from "@/data/mockData";

const HomePage = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <Features />
      <MarketPreview featuredProducts={featuredProducts} />
      <HowItWorks />
      <Testimonials />
    </div>
  );
};

export default HomePage;
