import React, { createContext, useContext, useState, useCallback } from 'react';

export type Language = 'en' | 'ta';

interface LanguageContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof TranslationStrings) => string;
}

interface TranslationStrings {
  appName: string;
  home: string;
  prices: string;
  login: string;
  register: string;
  logout: string;
  dashboard: string;
  profile: string;
  myProducts: string;
  myOrders: string;
  welcomeBack: string;
  loginToAccess: string;
  loginToAccount: string;
  enterCredentials: string;
  email: string;
  enterEmail: string;
  password: string;
  enterPassword: string;
  forgotPassword: string;
  passwordReset: string;
  passwordResetMessage: string;
  dontHaveAccount: string;
  alreadyHaveAccount: string;
  loggingIn: string;
  loginSuccess: string;
  welcomeBackMessage: string;
  joinFarmersEMarket: string;
  createAccount: string;
  joinToConnect: string;
  fullName: string;
  enterFullName: string;
  iAmA: string;
  farmer: string;
  buyer: string;
  createPassword: string;
  creatingAccount: string;
  createYourAccount: string;
  registrationSuccess: string;
  accountCreatedMessage: string;
  language: string;
  invalidCredentials: string;
  emailAlreadyExists: string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>((localStorage.getItem('language') as Language) || 'en');

  const translations: Record<Language, TranslationStrings> = {
    en: {
      appName: 'Farmers E-Market',
      home: 'Home',
      prices: 'Prices',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      dashboard: 'Dashboard',
      profile: 'Profile',
      myProducts: 'My Products',
      myOrders: 'My Orders',
      welcomeBack: 'Welcome Back!',
      loginToAccess: 'Login to access your account',
      loginToAccount: 'Login to your Account',
      enterCredentials: 'Enter your credentials below',
      email: 'Email',
      enterEmail: 'Enter your email',
      password: 'Password',
      enterPassword: 'Enter your password',
      forgotPassword: 'Forgot password?',
      passwordReset: 'Password Reset',
      passwordResetMessage: 'A password reset link has been sent to your email address.',
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: "Already have an account?",
      loggingIn: 'Logging In...',
      loginSuccess: 'Login Successful!',
      welcomeBackMessage: 'Welcome back to Farmers E-Market!',
      joinFarmersEMarket: 'Join Farmers E-Market!',
      createAccount: 'Create an Account',
      joinToConnect: 'Join to connect with farmers and buyers',
      fullName: 'Full Name',
      enterFullName: 'Enter your full name',
      iAmA: 'I am a',
      farmer: 'Farmer',
      buyer: 'Buyer',
      createPassword: 'Create a password',
      creatingAccount: 'Creating Account...',
      createYourAccount: 'Create Your Account',
      registrationSuccess: 'Registration Successful!',
      accountCreatedMessage: 'Your account has been created successfully!',
      language: 'Language',
      invalidCredentials: "Invalid email or password",
      emailAlreadyExists: "An account with this email already exists",
    },
    ta: {
      appName: 'விவசாயிகள் இ-சந்தை',
      home: 'வீடு',
      prices: 'விலைகள்',
      login: 'உள்நுழை',
      register: 'பதிவு செய்',
      logout: 'வெளியேறு',
      dashboard: 'டாஷ்போர்டு',
      profile: 'சுயவிவரம்',
      myProducts: 'எனது பொருட்கள்',
      myOrders: 'எனது ஆர்டர்கள்',
      welcomeBack: 'மீண்டும் வருக!',
      loginToAccess: 'உங்கள் கணக்கை அணுக உள்நுழைக',
      loginToAccount: 'உங்கள் கணக்கில் உள்நுழைக',
      enterCredentials: 'கீழே உங்கள் சான்றுகளை உள்ளிடவும்',
      email: 'மின்னஞ்சல்',
      enterEmail: 'உங்கள் மின்னஞ்சலை உள்ளிடவும்',
      password: 'கடவுச்சொல்',
      enterPassword: 'உங்கள் கடவுச்சொல்லை உள்ளிடவும்',
      forgotPassword: 'கடவுச்சொல்லை மறந்தீர்களா?',
      passwordReset: 'கடவுச்சொல் மீட்டமைப்பு',
      passwordResetMessage: 'கடவுச்சொல் மீட்டமைப்பு இணைப்பு உங்கள் மின்னஞ்சல் முகவரிக்கு அனுப்பப்பட்டுள்ளது.',
      dontHaveAccount: "கணக்கு இல்லையா?",
      alreadyHaveAccount: "ஏற்கனவே கணக்கு உள்ளதா?",
      loggingIn: 'உள்நுழைகிறது...',
      loginSuccess: 'உள்நுழைவு வெற்றிகரம்!',
      welcomeBackMessage: 'விவசாயிகள் இ-சந்தைக்கு மீண்டும் வருக!',
      joinFarmersEMarket: 'விவசாயிகள் இ-சந்தையில் சேருங்கள்!',
      createAccount: 'கணக்கை உருவாக்கு',
      joinToConnect: 'விவசாயிகள் மற்றும் வாங்குபவர்களுடன் இணையுங்கள்',
      fullName: 'முழு பெயர்',
      enterFullName: 'உங்கள் முழு பெயரை உள்ளிடவும்',
      iAmA: 'நான் ஒரு',
      farmer: 'விவசாயி',
      buyer: 'வாங்குபவர்',
      createPassword: 'கடவுச்சொல்லை உருவாக்கு',
      creatingAccount: 'கணக்கை உருவாக்குகிறது...',
      createYourAccount: 'உங்கள் கணக்கை உருவாக்குங்கள்',
      registrationSuccess: 'பதிவு வெற்றிகரம்!',
      accountCreatedMessage: 'உங்கள் கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது!',
      language: 'மொழி',
      invalidCredentials: "தவறான மின்னஞ்சல் அல்லது கடவுச்சொல்",
      emailAlreadyExists: "இந்த மின்னஞ்சலுடன் ஒரு கணக்கு ஏற்கனவே உள்ளது",
    }
  };

  const t = useCallback((key: keyof TranslationStrings) => {
    return translations[language][key] || key;
  }, [language]);

  React.useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const value: LanguageContextProps = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
