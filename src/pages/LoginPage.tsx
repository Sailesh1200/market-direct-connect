
import AuthForm from "@/components/auth/AuthForm";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface LoginPageProps {
  onLogin: (userData: any) => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleLoginSuccess = (userData: any) => {
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
