
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Smith",
      role: "Organic Farmer",
      image: "/placeholder.svg",
      rating: 5,
      testimonial: "Since joining Farmers E-Market, I've been able to sell my produce directly to customers at better prices than through traditional channels. The platform is easy to use and has helped me grow my farm business."
    },
    {
      id: 2,
      name: "Emily Chen",
      role: "Restaurateur",
      image: "/placeholder.svg",
      rating: 5,
      testimonial: "As a restaurant owner, finding fresh, quality ingredients is crucial. This platform has connected me with local farmers providing the freshest produce for my dishes. My customers notice the difference!"
    },
    {
      id: 3,
      name: "Michael Rodriguez",
      role: "Home Cook",
      image: "/placeholder.svg",
      rating: 4,
      testimonial: "I love knowing exactly where my food comes from. The transparency and quality of products available on Farmers E-Market has made a huge difference in my family's meals. Will never go back to supermarket produce!"
    }
  ];

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        className={`h-4 w-4 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <section className="py-16 bg-farm-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-farm-green-700 mb-4">
            What Our Community Says
          </h2>
          <p className="text-lg text-farm-green-600 max-w-2xl mx-auto">
            Hear from the farmers and buyers who are part of our growing community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border border-farm-green-100 bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-farm-green-700">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-farm-green-600">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                
                <p className="text-gray-700 italic">
                  "{testimonial.testimonial}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
