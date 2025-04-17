
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "@/components/layout/Logo";
import LanguageSelector from "@/components/layout/LanguageSelector";
import NotificationsMenu from "@/components/common/NotificationsMenu";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { UserRole } from "@/types";
import { 
  Menu, 
  Home, 
  Store, 
  BarChart2, 
  User,
  LogOut,
  LayoutDashboard,
  ShieldCheck
} from "lucide-react";

interface NavbarProps {
  userRole: UserRole | null;
  userName: string | null;
  onLogout: () => void;
}

const UpdatedNavbar = ({ userRole, userName, onLogout }: NavbarProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Check scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Navigation items based on user role
  const getNavItems = () => {
    const items = [
      { label: t('home'), path: "/", icon: <Home className="h-4 w-4 mr-2" /> },
      { label: "Market", path: "/market", icon: <Store className="h-4 w-4 mr-2" /> },
      { label: t('prices'), path: "/prices", icon: <BarChart2 className="h-4 w-4 mr-2" /> },
    ];
    
    if (userRole) {
      items.push({ 
        label: t('dashboard'), 
        path: "/dashboard", 
        icon: <LayoutDashboard className="h-4 w-4 mr-2" /> 
      });
      
      if (userRole === "admin") {
        items.push({ 
          label: "Admin Panel", 
          path: "/admin", 
          icon: <ShieldCheck className="h-4 w-4 mr-2" /> 
        });
      }
    }
    
    return items;
  };
  
  const navItems = getNavItems();
  
  return (
    <nav 
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white shadow-md py-2"
          : "bg-white/80 backdrop-blur-md py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="mr-6">
              <Logo />
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-farm-green-600 ${
                    location.pathname === item.path 
                      ? "text-farm-green-700 border-b-2 border-farm-green-600" 
                      : "text-gray-600"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Right side: auth buttons or user menu */}
          <div className="flex items-center space-x-2">
            <LanguageSelector />
            
            {userRole && <NotificationsMenu />}
            
            {userRole ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="relative h-9 w-9 rounded-full"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-farm-green-100">
                      <User className="h-5 w-5 text-farm-green-700" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{userName}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    {t('dashboard')}
                  </DropdownMenuItem>
                  {userRole === "admin" && (
                    <DropdownMenuItem onClick={() => navigate("/admin")}>
                      <ShieldCheck className="h-4 w-4 mr-2" />
                      {t('adminPanel')}
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    {t('logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/login")}
                  className="border-farm-green-600 text-farm-green-600 hover:bg-farm-green-50"
                >
                  {t('login')}
                </Button>
                <Button 
                  onClick={() => navigate("/register")}
                  className="bg-farm-green-600 hover:bg-farm-green-700"
                >
                  {t('register')}
                </Button>
              </div>
            )}
            
            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <div className="py-4">
                    <div className="flex flex-col space-y-3">
                      {navItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`flex items-center py-2 px-3 rounded-md text-sm font-medium ${
                            location.pathname === item.path 
                              ? "bg-farm-green-50 text-farm-green-700" 
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {item.icon}
                          {item.label}
                        </Link>
                      ))}
                      
                      {!userRole && (
                        <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col space-y-2">
                          <Button 
                            variant="outline" 
                            onClick={() => navigate("/login")}
                            className="w-full border-farm-green-600 text-farm-green-600 hover:bg-farm-green-50"
                          >
                            {t('login')}
                          </Button>
                          <Button 
                            onClick={() => navigate("/register")}
                            className="w-full bg-farm-green-600 hover:bg-farm-green-700"
                          >
                            {t('register')}
                          </Button>
                        </div>
                      )}
                      
                      {userRole && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <Button 
                            variant="destructive" 
                            onClick={() => {
                              onLogout();
                              navigate("/");
                            }}
                            className="w-full"
                          >
                            <LogOut className="h-4 w-4 mr-2" />
                            {t('logout')}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UpdatedNavbar;
