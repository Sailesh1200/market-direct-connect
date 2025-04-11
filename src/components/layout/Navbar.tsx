
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, User, LogOut } from "lucide-react";

interface NavbarProps {
  userRole: UserRole | null;
  userName: string | null;
  onLogout: () => void;
}

const Navbar = ({ userRole, userName, onLogout }: NavbarProps) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/placeholder.svg" alt="Logo" className="h-8 w-8 mr-2" />
          <span 
            className="font-bold text-xl text-farm-green-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Farmers E-Market
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
          >
            Home
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => navigate("/market")}
          >
            Market
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => navigate("/prices")}
          >
            Live Prices
          </Button>
          
          {userRole ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  {userName || userRole}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  Profile
                </DropdownMenuItem>
                {userRole === "farmer" && (
                  <DropdownMenuItem onClick={() => navigate("/products")}>
                    My Products
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => navigate("/orders")}>
                  My Orders
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button 
                variant="default" 
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu />
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white py-2 px-4">
          <div className="flex flex-col space-y-2">
            <Button 
              variant="ghost" 
              onClick={() => {
                navigate("/");
                setIsMobileMenuOpen(false);
              }}
            >
              Home
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => {
                navigate("/market");
                setIsMobileMenuOpen(false);
              }}
            >
              Market
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => {
                navigate("/prices");
                setIsMobileMenuOpen(false);
              }}
            >
              Live Prices
            </Button>
            
            {userRole ? (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    navigate("/dashboard");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Dashboard
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    navigate("/profile");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Profile
                </Button>
                {userRole === "farmer" && (
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      navigate("/products");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    My Products
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    navigate("/orders");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  My Orders
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-destructive" 
                  onClick={() => {
                    onLogout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    navigate("/login");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Login
                </Button>
                <Button 
                  variant="default" 
                  onClick={() => {
                    navigate("/register");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
