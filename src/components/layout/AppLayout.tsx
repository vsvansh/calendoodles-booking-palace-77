
import { useState, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useOnClickOutside } from "@/hooks/use-click-outside";
import { useIsMobile } from "@/hooks/use-mobile";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const AppLayout = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Close the sidebar on mobile when clicking outside
  useOnClickOutside(sidebarRef, () => {
    if (isMobile) {
      setShowSidebar(false);
    }
  });
  
  // Close sidebar on mobile by default
  useEffect(() => {
    if (isMobile) {
      setShowSidebar(false);
    } else {
      // For desktop, try to load sidebar state from localStorage
      const savedSidebarState = localStorage.getItem('sidebar-state');
      if (savedSidebarState) {
        setShowSidebar(savedSidebarState === 'true');
      }
    }
  }, [isMobile]);
  
  // Save sidebar state to localStorage when it changes (desktop only)
  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem('sidebar-state', String(showSidebar));
    }
  }, [showSidebar, isMobile]);
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

  // Apply dark mode by default
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    // Set dark mode by default (unless explicitly set to light)
    if (!savedTheme || savedTheme === 'dark' || (savedTheme === 'system' && prefersDark)) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 dark:bg-gradient-to-b dark:from-gray-950 dark:via-gray-900/90 dark:to-gray-950 transition-colors duration-500">
      {/* Radial gradient for enhanced dark mode */}
      <div className="dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] dark:from-calendoodle-blue/15 dark:via-transparent dark:to-transparent fixed inset-0 z-0 pointer-events-none"></div>
      <div className="dark:bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] dark:from-calendoodle-purple/10 dark:via-transparent dark:to-transparent fixed inset-0 z-0 pointer-events-none"></div>
      
      {/* Fixed position navbar */}
      <Navbar onMenuClick={() => setShowSidebar(!showSidebar)} sidebarOpen={showSidebar} />
      
      <div className="flex flex-grow pt-16">
        {/* Sidebar with fixed position */}
        <div ref={sidebarRef} className="z-40">
          <Sidebar isOpen={showSidebar} setIsOpen={setShowSidebar} />
        </div>
        
        {/* Main content area with adjusted margins for sidebar spacing */}
        <main 
          className={`flex-grow z-10 flex flex-col transition-all duration-500 ease-out ${
            showSidebar ? 'pl-0 sm:pl-64' : 'pl-0 sm:pl-20'
          }`}
        >
          <div className="flex-grow p-4 sm:p-6 max-w-[1800px] mx-auto w-full animate-fade-in">
            <Outlet />
          </div>
          {/* Footer is inside the main element and respects sidebar width */}
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
