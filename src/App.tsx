
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HomePage from "@/pages/HomePage";
import MarketPage from "@/pages/MarketPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import AdminDashboard from "@/pages/dashboard/AdminDashboard";
import NotFound from "@/pages/NotFound";
import { User, UserRole } from "@/types";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { products } from "@/data/mockData";
import { initializeDataStore } from "@/services/DataSyncService";

const queryClient = new QueryClient();

// Initialize data store with mock products
initializeDataStore(products);

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  
  // Check for logged in user on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    // Save to localStorage
    localStorage.setItem("currentUser", JSON.stringify(userData));
  };

  const handleLogout = () => {
    // Remove from localStorage
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  // Protected route component
  const ProtectedRoute = ({ children, requiredRole }: { children: JSX.Element, requiredRole?: UserRole }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }

    if (requiredRole && user.role !== requiredRole) {
      // User doesn't have the required role
      return <Navigate to="/dashboard" />;
    }

    return children;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <Navbar 
                userRole={user?.role || null} 
                userName={user?.name || null}
                onLogout={handleLogout}
              />
              
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route 
                    path="/market" 
                    element={
                      <ProtectedRoute>
                        <MarketPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/login" 
                    element={
                      user ? <Navigate to="/dashboard" /> : <LoginPage onLogin={handleLogin} />
                    } 
                  />
                  <Route 
                    path="/register" 
                    element={
                      user ? <Navigate to="/dashboard" /> : <RegisterPage onRegister={handleLogin} />
                    } 
                  />
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <DashboardPage user={user as User} />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin" 
                    element={
                      <ProtectedRoute requiredRole="admin">
                        <AdminDashboard user={user as User} />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/products/new" 
                    element={
                      <ProtectedRoute>
                        <AddProductPage user={user as User} />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              
              <Footer />
            </div>
          </BrowserRouter>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
