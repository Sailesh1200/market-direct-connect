
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-farm-green-100 text-farm-green-700 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Farmers E-Market</h3>
            <p className="text-sm">
              Connecting farmers directly with local market buyers, reducing the 
              influence of middlemen and ensuring better prices for everyone.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-farm-green-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/market" className="hover:text-farm-green-500 transition-colors">
                  Market
                </Link>
              </li>
              <li>
                <Link to="/prices" className="hover:text-farm-green-500 transition-colors">
                  Live Prices
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-farm-green-500 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">For Users</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/register" className="hover:text-farm-green-500 transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-farm-green-500 transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-farm-green-500 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-farm-green-500 transition-colors">
                  Help &amp; Support
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: info@farmersmarket.com</li>
              <li>Phone: +1 (123) 456-7890</li>
              <li>Address: 123 Farm Road, Agriville</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-farm-green-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            &copy; {currentYear} Farmers E-Market. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <span className="text-sm flex items-center">
              Made with <Heart className="h-4 w-4 mx-1 text-farm-brown-500" /> for farmers everywhere
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
