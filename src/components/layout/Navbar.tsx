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
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "./LanguageSelector";
import Logo from "./Logo";

interface NavbarProps {
  userRole: UserRole | null;
  userName: string | null;
  onLogout: () => void;
}

const Navbar = ({ userRole, userName, onLogout }: NavbarProps) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
          >
            {t('home')}
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => navigate("/prices")}
          >
            {t('prices')}
          </Button>
          
          <LanguageSelector />
          
          {userRole ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  {userName || userRole}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{t('profile')}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  {t('dashboard')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  {t('profile')}
                </DropdownMenuItem>
                {userRole === "farmer" && (
                  <DropdownMenuItem onClick={() => navigate("/products")}>
                    {t('myProducts')}
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => navigate("/orders")}>
                  {t('myOrders')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  {t('logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={() => navigate("/login")}
              >
                {t('login')}
              </Button>
              <Button 
                variant="default" 
                onClick={() => navigate("/register")}
              >
                {t('register')}
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
              {t('home')}
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => {
                navigate("/prices");
                setIsMobileMenuOpen(false);
              }}
            >
              {t('prices')}
            </Button>
            
            <div className="flex items-center py-2">
              <span className="mr-2">{t('language')}:</span>
              <LanguageSelector />
            </div>
            
            {userRole ? (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    navigate("/dashboard");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {t('dashboard')}
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    navigate("/profile");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {t('profile')}
                </Button>
                {userRole === "farmer" && (
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      navigate("/products");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {t('myProducts')}
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    navigate("/orders");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {t('myOrders')}
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-destructive" 
                  onClick={() => {
                    onLogout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {t('logout')}
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
                  {t('login')}
                </Button>
                <Button 
                  variant="default" 
                  onClick={() => {
                    navigate("/register");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {t('register')}
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
