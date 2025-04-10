
import { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import AppLayout from "@/components/layout/AppLayout";

// Pages
import Index from "@/pages/Index";
import Calendar from "@/pages/Calendar";
import Appointments from "@/pages/Appointments";
import Services from "@/pages/Services";
import Clients from "@/pages/Clients";
import Payments from "@/pages/Payments";
import Analytics from "@/pages/Analytics";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import ContactUs from "@/pages/ContactUs";

// Policy Pages
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import CookiePolicy from "@/pages/CookiePolicy";
import Compliance from "@/pages/Compliance";

const App = () => {
  // Set default theme as light mode
  useEffect(() => {
    // Check for saved theme preference or use light as default
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Index />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/services" element={<Services />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/compliance" element={<Compliance />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
