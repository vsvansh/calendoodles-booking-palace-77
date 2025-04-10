
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Index from "./pages/Index";
import Calendar from "./pages/Calendar";
import Appointments from "./pages/Appointments";
import Services from "./pages/Services";
import Clients from "./pages/Clients";
import Payments from "./pages/Payments";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import ChatbotDrawer from "./components/chat/ChatbotDrawer";
import ContactUs from "./pages/ContactUs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth Routes with back buttons added via props */}
          <Route path="/login" element={<Login showBackButton={true} />} />
          <Route path="/register" element={<Register showBackButton={true} />} />
          
          {/* App Routes */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/services" element={<Services />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Route>
          
          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatbotDrawer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
