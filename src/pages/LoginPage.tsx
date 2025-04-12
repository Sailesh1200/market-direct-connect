
import { useEffect } from "react";
import AuthForm from "@/components/auth/AuthForm";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { User } from "@/types";

interface LoginPageProps {
  onLogin: (userData: User) => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Check if user is already logged in (stored in localStorage)
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      // User is already logged in, redirect to dashboard
      onLogin(JSON.parse(currentUser));
      navigate("/dashboard");
    }
  }, [navigate, onLogin]);

  const handleLoginSuccess = (userData: User) => {
    // Store the user in localStorage for persistent login
    localStorage.setItem("currentUser", JSON.stringify(userData));
    onLogin(userData);
    
    // Redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold text-farm-green-700 mb-2">
          {t('welcomeBack')}
        </h1>
        <p className="text-lg text-farm-green-600">
          {t('loginToAccess')}
        </p>
      </div>

      <AuthForm mode="login" onSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;
