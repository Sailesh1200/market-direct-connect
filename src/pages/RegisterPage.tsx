
import { useEffect } from "react";
import AuthForm from "@/components/auth/AuthForm";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { User } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface RegisterPageProps {
  onRegister: (userData: User) => void;
}

const RegisterPage = ({ onRegister }: RegisterPageProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();

  // Check if user is already logged in (stored in localStorage)
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      // User is already logged in, redirect to dashboard
      onRegister(JSON.parse(currentUser));
      navigate("/dashboard");
    }
  }, [navigate, onRegister]);

  const handleRegisterSuccess = (userData: User) => {
    // Instead of storing user in localStorage and auto-login,
    // just show a success message and redirect to login page
    toast({
      title: t('registrationSuccess'),
      description: t('accountCreatedMessage'),
    });
    
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold text-farm-green-700 mb-2">
          {t('joinFarmersEMarket')}
        </h1>
        <p className="text-lg text-farm-green-600">
          {t('createAccount')}
        </p>
      </div>

      <AuthForm mode="register" onSuccess={handleRegisterSuccess} />
    </div>
  );
};

export default RegisterPage;
