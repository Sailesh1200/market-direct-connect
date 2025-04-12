
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
  emailNotRegistered: string;
  incorrectPassword: string;
  createAccountNow: string;
  
  // Dashboard common strings
  adminDashboard: string;
  adminDashboardDescription: string;
  unknownUserRole: string;
  unknownUserRoleDescription: string;
  pendingOrders: string;
  completedOrders: string;
  ordersInProgress: string;
  successfullyReceived: string;
  successfullyFulfilled: string;
  viewAllOrders: string;
  goToOrders: string;
  notifications: string;
  viewNotifications: string;
  recentUpdates: string;
  noRecentUpdates: string;
  viewAllUpdates: string;
  
  // Farmer dashboard strings
  farmerDashboardDesc: string;
  totalSales: string;
  lifetimeSalesValue: string;
  products: string;
  activeProductListings: string;
  ordersAwaitingAction: string;
  salesOverview: string;
  viewDetailedReports: string;
  recentActivity: string;
  noPendingOrders: string;
  marketPriceMonitoring: string;
  viewAllMarketPrices: string;
  manageProductAvailability: string;
  addNewProduct: string;
  showAllProducts: string;
  manageAllProducts: string;
  manageProducts: string;
  updateProductListings: string;
  goToProducts: string;
  manageOrders: string;
  viewAndProcessOrders: string;
  marketPrices: string;
  viewMarketPrices: string;
  viewPrices: string;
  
  // Buyer dashboard strings
  buyerDashboardDesc: string;
  totalPurchases: string;
  lifetimeSpending: string;
  ordersPlaced: string;
  totalOrdersHistory: string;
  purchaseHistory: string;
  viewOrderHistory: string;
  connectedFarmers: string;
  searchFarmers: string;
  availableProducts: string;
  viewProfile: string;
  message: string;
  showAllFarmers: string;
  browseAllFarmers: string;
  trendingMarketPrices: string;
  browseMarket: string;
  discoverFreshProducts: string;
  goToMarket: string;
  trackOrders: string;
  viewAndTrackOrders: string;
  findFarmers: string;
  connectWithLocalFarmers: string;
  browseFarmers: string;
  stayUpdatedWithChanges: string;
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
      emailNotRegistered: "Email address is not registered",
      incorrectPassword: "Incorrect password",
      createAccountNow: "Create an account now",

      // Dashboard common strings
      adminDashboard: 'Admin Dashboard',
      adminDashboardDescription: 'Welcome to the admin dashboard. Here you can manage users, products, and orders.',
      unknownUserRole: 'Unknown User Role',
      unknownUserRoleDescription: 'Your user role is not recognized. Please contact support for assistance.',
      pendingOrders: 'Pending Orders',
      completedOrders: 'Completed Orders',
      ordersInProgress: 'Orders in progress',
      successfullyReceived: 'Successfully received',
      successfullyFulfilled: 'Successfully fulfilled',
      viewAllOrders: 'View All Orders',
      goToOrders: 'Go to Orders',
      notifications: 'Notifications',
      viewNotifications: 'View Notifications',
      recentUpdates: 'Recent Updates',
      noRecentUpdates: 'No recent updates',
      viewAllUpdates: 'View All Updates',
      
      // Farmer dashboard strings
      farmerDashboardDesc: 'Track your sales, manage your products, and monitor market prices',
      totalSales: 'Total Sales',
      lifetimeSalesValue: 'Lifetime sales value',
      products: 'Products',
      activeProductListings: 'Active product listings',
      ordersAwaitingAction: 'Orders awaiting action',
      salesOverview: 'Sales Overview',
      viewDetailedReports: 'View Detailed Reports',
      recentActivity: 'Recent Activity',
      noPendingOrders: 'No pending orders',
      marketPriceMonitoring: 'Market Price Monitoring',
      viewAllMarketPrices: 'View All Market Prices',
      manageProductAvailability: 'Manage Product Availability',
      addNewProduct: 'Add New Product',
      showAllProducts: 'Show All Products',
      manageAllProducts: 'Manage All Products',
      manageProducts: 'Manage Products',
      updateProductListings: 'Update product listings',
      goToProducts: 'Go to Products',
      manageOrders: 'Manage Orders',
      viewAndProcessOrders: 'View and process orders',
      marketPrices: 'Market Prices',
      viewMarketPrices: 'View market prices',
      viewPrices: 'View Prices',
      
      // Buyer dashboard strings
      buyerDashboardDesc: 'Browse products, track your orders, and connect with farmers',
      totalPurchases: 'Total Purchases',
      lifetimeSpending: 'Lifetime spending',
      ordersPlaced: 'Orders Placed',
      totalOrdersHistory: 'Total orders history',
      purchaseHistory: 'Purchase History',
      viewOrderHistory: 'View Order History',
      connectedFarmers: 'Connected Farmers',
      searchFarmers: 'Search farmers...',
      availableProducts: 'Available Products',
      viewProfile: 'View Profile',
      message: 'Message',
      showAllFarmers: 'Show All Farmers',
      browseAllFarmers: 'Browse All Farmers',
      trendingMarketPrices: 'Trending Market Prices',
      browseMarket: 'Browse Market',
      discoverFreshProducts: 'Discover fresh products',
      goToMarket: 'Go to Market',
      trackOrders: 'Track Orders',
      viewAndTrackOrders: 'View and track orders',
      findFarmers: 'Find Farmers',
      connectWithLocalFarmers: 'Connect with local farmers',
      browseFarmers: 'Browse Farmers',
      stayUpdatedWithChanges: 'Stay updated with changes',
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
      emailNotRegistered: "மின்னஞ்சல் முகவரி பதிவு செய்யப்படவில்லை",
      incorrectPassword: "தவறான கடவுச்சொல்",
      createAccountNow: "இப்போது ஒரு கணக்கை உருவாக்கவும்",

      // Dashboard common strings
      adminDashboard: 'நிர்வாக டாஷ்போர்டு',
      adminDashboardDescription: 'நிர்வாக டாஷ்போர்டுக்கு வரவேற்கிறோம். இங்கே நீங்கள் பயனர்கள், பொருட்கள் மற்றும் ஆர்டர்களை நிர்வகிக்கலாம்.',
      unknownUserRole: 'அறியப்படாத பயனர் பங்கு',
      unknownUserRoleDescription: 'உங்கள் பயனர் பங்கு அங்கீகரிக்கப்படவில்லை. உதவிக்கு ஆதரவை தொடர்பு கொள்ளவும்.',
      pendingOrders: 'நிலுவையில் உள்ள ஆர்டர்கள்',
      completedOrders: 'முடிக்கப்பட்ட ஆர்டர்கள்',
      ordersInProgress: 'செயலில் உள்ள ஆர்டர்கள்',
      successfullyReceived: 'வெற்றிகரமாக பெறப்பட்டது',
      successfullyFulfilled: 'வெற்றிகரமாக நிறைவேற்றப்பட்டது',
      viewAllOrders: 'அனைத்து ஆர்டர்களையும் காண',
      goToOrders: 'ஆர்டர்களுக்குச் செல்க',
      notifications: 'அறிவிப்புகள்',
      viewNotifications: 'அறிவிப்புகளைக் காண',
      recentUpdates: 'சமீபத்திய புதுப்பிப்புகள்',
      noRecentUpdates: 'சமீபத்திய புதுப்பிப்புகள் இல்லை',
      viewAllUpdates: 'அனைத்து புதுப்பிப்புகளையும் காண',
      
      // Farmer dashboard strings
      farmerDashboardDesc: 'உங்கள் விற்பனையைக் கண்காணிக்கவும், உங்கள் பொருட்களை நிர்வகிக்கவும், சந்தை விலைகளைக் கண்காணிக்கவும்',
      totalSales: 'மொத்த விற்பனை',
      lifetimeSalesValue: 'வாழ்நாள் விற்பனை மதிப்பு',
      products: 'பொருட்கள்',
      activeProductListings: 'செயலில் உள்ள பொருட்கள் பட்டியல்',
      ordersAwaitingAction: 'நடவடிக்கைக்காக காத்திருக்கும் ஆர்டர்கள்',
      salesOverview: 'விற்பனை கண்ணோட்டம்',
      viewDetailedReports: 'விரிவான அறிக்கைகளைக் காண',
      recentActivity: 'சமீபத்திய செயல்பாடு',
      noPendingOrders: 'நிலுவையில் உள்ள ஆர்டர்கள் இல்லை',
      marketPriceMonitoring: 'சந்தை விலை கண்காணிப்பு',
      viewAllMarketPrices: 'அனைத்து சந்தை விலைகளையும் காண',
      manageProductAvailability: 'பொருட்களின் கிடைக்கும் தன்மையை நிர்வகிக்கவும்',
      addNewProduct: 'புதிய பொருளைச் சேர்',
      showAllProducts: 'அனைத்து பொருட்களையும் காட்டு',
      manageAllProducts: 'அனைத்து பொருட்களையும் நிர்வகி',
      manageProducts: 'பொருட்களை நிர்வகி',
      updateProductListings: 'பொருட்கள் பட்டியலை புதுப்பிக்கவும்',
      goToProducts: 'பொருட்களுக்குச் செல்க',
      manageOrders: 'ஆர்டர்களை நிர்வகி',
      viewAndProcessOrders: 'ஆர்டர்களைப் பார்த்து செயலாக்கவும்',
      marketPrices: 'சந்தை விலைகள்',
      viewMarketPrices: 'சந்தை விலைகளைக் காண',
      viewPrices: 'விலைகளைக் காண',
      
      // Buyer dashboard strings
      buyerDashboardDesc: 'பொருட்களை உலாவ, உங்கள் ஆர்டர்களைக் கண்காணிக்க, விவசாயிகளுடன் இணையவும்',
      totalPurchases: 'மொத்த கொள்முதல்கள்',
      lifetimeSpending: 'வாழ்நாள் செலவினம்',
      ordersPlaced: 'வைக்கப்பட்ட ஆர்டர்கள்',
      totalOrdersHistory: 'மொத்த ஆர்டர்கள் வரலாறு',
      purchaseHistory: 'கொள்முதல் வரலாறு',
      viewOrderHistory: 'ஆர்டர் வரலாற்றைக் காண',
      connectedFarmers: 'இணைக்கப்பட்ட விவசாயிகள்',
      searchFarmers: 'விவசாயிகளைத் தேடுங்கள்...',
      availableProducts: 'கிடைக்கக்கூடிய பொருட்கள்',
      viewProfile: 'சுயவிவரத்தைக் காண',
      message: 'செய்தி',
      showAllFarmers: 'அனைத்து விவசாயிகளையும் காட்டு',
      browseAllFarmers: 'அனைத்து விவசாயிகளையும் உலாவு',
      trendingMarketPrices: 'போக்குகளில் உள்ள சந்தை விலைகள்',
      browseMarket: 'சந்தையை உலாவு',
      discoverFreshProducts: 'புதிய பொருட்களைக் கண்டறியுங்கள்',
      goToMarket: 'சந்தைக்குச் செல்க',
      trackOrders: 'ஆர்டர்களைக் கண்காணி',
      viewAndTrackOrders: 'ஆர்டர்களைப் பார்த்து கண்காணிக்கவும்',
      findFarmers: 'விவசாயிகளைக் கண்டறி',
      connectWithLocalFarmers: 'உள்ளூர் விவசாயிகளுடன் இணையுங்கள்',
      browseFarmers: 'விவசாயிகளை உலாவு',
      stayUpdatedWithChanges: 'மாற்றங்களுடன் புதுப்பித்த நிலையில் இருங்கள்',
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
