
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UserRole } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { Eye, EyeOff, User, Mail, Lock, AlertCircle } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (mode === "register") {
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const userExists = existingUsers.some((user: any) => user.email === email);
      
      if (userExists) {
        setError(t('emailAlreadyExists'));
        setIsSubmitting(false);
        return;
      }

      // Register new user
      const userData = {
        id: `user-${Date.now()}`,
        name: name || email.split("@")[0],
        email,
        password, // In a real app, this would be hashed
        role: userRole,
        createdAt: new Date().toISOString()
      };

      // Save to localStorage
      localStorage.setItem("users", JSON.stringify([...existingUsers, userData]));

      // Pass data to parent, excluding password
      const { password: _, ...safeUserData } = userData;
      onSuccess(safeUserData);
    } else {
      // Login logic
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const user = existingUsers.find((user: any) => user.email === email);
      
      if (!user) {
        setError(t('emailNotRegistered'));
        setIsSubmitting(false);
        return;
      }
      
      if (user.password !== password) {
        setError(t('incorrectPassword'));
        setIsSubmitting(false);
        return;
      }

      toast({
        title: t('loginSuccess'),
        description: t('welcomeBackMessage'),
      });

      // Set user data in localStorage for persistent login
      localStorage.setItem("currentUser", JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }));

      // Pass user data to parent, excluding password
      const { password: _, ...safeUserData } = user;
      onSuccess(safeUserData);
    }

    setIsSubmitting(false);
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
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4 mr-2" />
              <AlertDescription>
                {error}
                {error === t('emailNotRegistered') && (
                  <span className="block mt-1">
                    <a 
                      onClick={() => navigate('/register')}
                      className="text-blue-600 underline cursor-pointer"
                    >
                      {t('createAccountNow')}
                    </a>
                  </span>
                )}
              </AlertDescription>
            </Alert>
          )}

          {mode === "register" && (
            <div className="space-y-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {t('fullName')}
                </Label>
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
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {t('email')}
              </Label>
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
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  {t('password')}
                </Label>
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
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={mode === "login" ? t('enterPassword') : t('createPassword')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
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
