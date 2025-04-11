
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Available languages
export type Language = 'en' | 'ta';

// Translation dictionary type
export type TranslationDict = {
  [key: string]: {
    en: string;
    ta: string;
  };
};

// Initial translations (we'll add more as needed)
export const translations: TranslationDict = {
  // Common
  appName: {
    en: 'Farmers E-Market',
    ta: 'விவசாயிகள் மின்-சந்தை'
  },
  home: {
    en: 'Home',
    ta: 'முகப்பு'
  },
  prices: {
    en: 'Live Prices',
    ta: 'நேரலை விலைகள்'
  },
  login: {
    en: 'Login',
    ta: 'உள்நுழைக'
  },
  register: {
    en: 'Register',
    ta: 'பதிவு செய்க'
  },
  logout: {
    en: 'Logout',
    ta: 'வெளியேறு'
  },
  dashboard: {
    en: 'Dashboard',
    ta: 'கட்டுப்பாட்டு பலகை'
  },
  profile: {
    en: 'Profile',
    ta: 'சுயவிவரம்'
  },
  myOrders: {
    en: 'My Orders',
    ta: 'எனது ஆர்டர்கள்'
  },
  myProducts: {
    en: 'My Products',
    ta: 'எனது பொருட்கள்'
  },
  
  // Auth
  welcomeBack: {
    en: 'Welcome Back',
    ta: 'மீண்டும் வரவேற்கிறோம்'
  },
  loginToAccess: {
    en: 'Login to access your Farmers E-Market account',
    ta: 'உங்கள் விவசாயிகள் மின்-சந்தை கணக்கை அணுக உள்நுழையவும்'
  },
  joinFarmersEMarket: {
    en: 'Join Farmers E-Market',
    ta: 'விவசாயிகள் மின்-சந்தையில் இணையுங்கள்'
  },
  createAccount: {
    en: 'Create an account to connect with local farmers and buyers',
    ta: 'உள்ளூர் விவசாயிகள் மற்றும் வாங்குபவர்களுடன் இணைவதற்கு ஒரு கணக்கை உருவாக்கவும்'
  },
  email: {
    en: 'Email',
    ta: 'மின்னஞ்சல்'
  },
  password: {
    en: 'Password',
    ta: 'கடவுச்சொல்'
  },
  forgotPassword: {
    en: 'Forgot password?',
    ta: 'கடவுச்சொல் மறந்துவிட்டதா?'
  },
  dontHaveAccount: {
    en: "Don't have an account?",
    ta: 'கணக்கு இல்லையா?'
  },
  alreadyHaveAccount: {
    en: 'Already have an account?',
    ta: 'ஏற்கனவே கணக்கு உள்ளதா?'
  },
  fullName: {
    en: 'Full Name',
    ta: 'முழு பெயர்'
  },
  iAmA: {
    en: 'I am a',
    ta: 'நான் ஒரு'
  },
  farmer: {
    en: 'Farmer',
    ta: 'விவசாயி'
  },
  buyer: {
    en: 'Buyer',
    ta: 'வாங்குபவர்'
  },
  createYourAccount: {
    en: 'Create Account',
    ta: 'கணக்கை உருவாக்கு'
  },
  loggingIn: {
    en: 'Logging in...',
    ta: 'உள்நுழைகிறது...'
  },
  creatingAccount: {
    en: 'Creating account...',
    ta: 'கணக்கை உருவாக்குகிறது...'
  },
  
  // Prices Page
  livePrices: {
    en: 'Live Market Prices',
    ta: 'நேரலை சந்தை விலைகள்'
  },
  latestPrices: {
    en: 'Latest prices from agricultural markets',
    ta: 'விவசாய சந்தைகளில் இருந்து சமீபத்திய விலைகள்'
  },
  pricePerUnit: {
    en: 'Price Per',
    ta: 'விலை (ஒன்றுக்கு)'
  },
  priceChange: {
    en: 'Change',
    ta: 'மாற்றம்'
  },
  lastUpdated: {
    en: 'Last Updated',
    ta: 'கடைசியாக புதுப்பிக்கப்பட்டது'
  },
};

// Create the context type
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
});

// Create a provider component
export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Translation function
  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    // Fallback to English if translation not found
    if (translations[key] && translations[key]['en']) {
      return translations[key]['en'];
    }
    // Return the key itself if no translation exists
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);
