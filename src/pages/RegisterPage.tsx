
import AuthForm from "@/components/auth/AuthForm";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface RegisterPageProps {
  onRegister: (userData: any) => void;
}

const RegisterPage = ({ onRegister }: RegisterPageProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleRegisterSuccess = (userData: any) => {
    onRegister(userData);
    
    // Redirect to dashboard
    navigate("/dashboard");
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
