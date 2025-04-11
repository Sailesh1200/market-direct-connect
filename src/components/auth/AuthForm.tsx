
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UserRole } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";

interface AuthFormProps {
  mode: "login" | "register";
  onSuccess: (userData: any) => void;
}

const AuthForm = ({ mode, onSuccess }: AuthFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userRole, setUserRole] = useState<UserRole>("buyer");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // This is a mock authentication function
    // In a real app, you'd integrate with your auth provider
    setTimeout(() => {
      // Mock success
      const userData = {
        id: "user-123",
        name: name || email.split("@")[0],
        email,
        role: userRole,
        createdAt: new Date().toISOString()
      };

      toast({
        title: mode === "login" ? t('loginSuccess') : t('registrationSuccess'),
        description: mode === "login" 
          ? t('welcomeBackMessage') 
          : t('accountCreatedMessage'),
      });

      onSuccess(userData);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-farm-green-700">
          {mode === "login" ? t('loginToAccount') : t('createAccount')}
        </CardTitle>
        <CardDescription>
          {mode === "login"
            ? t('enterCredentials')
            : t('joinToConnect')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {mode === "register" && (
            <div className="space-y-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('fullName')}</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={t('enterFullName')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>{t('iAmA')}</Label>
                <RadioGroup 
                  value={userRole} 
                  onValueChange={(value) => setUserRole(value as UserRole)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="farmer" id="farmer" />
                    <Label htmlFor="farmer" className="cursor-pointer">{t('farmer')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="buyer" id="buyer" />
                    <Label htmlFor="buyer" className="cursor-pointer">{t('buyer')}</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('email')}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t('enterEmail')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{t('password')}</Label>
                {mode === "login" && (
                  <a 
                    href="#" 
                    className="text-xs text-farm-green-600 hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      toast({
                        title: t('passwordReset'),
                        description: t('passwordResetMessage'),
                      });
                    }}
                  >
                    {t('forgotPassword')}
                  </a>
                )}
              </div>
              <Input
                id="password"
                type="password"
                placeholder={mode === "login" ? t('enterPassword') : t('createPassword')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-farm-green-600 hover:bg-farm-green-700"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? mode === "login" ? t('loggingIn') : t('creatingAccount')
                : mode === "login" ? t('login') : t('createYourAccount')}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <p className="text-sm text-gray-600">
          {mode === "login" ? t('dontHaveAccount') : t('alreadyHaveAccount')} {" "}
          <a
            className="text-farm-green-600 hover:underline font-medium cursor-pointer"
            onClick={() => navigate(mode === "login" ? "/register" : "/login")}
          >
            {mode === "login" ? t('register') : t('login')}
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
