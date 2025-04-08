
import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { useOnClickOutside } from "@/hooks/use-click-outside";
import { useIsMobile } from "@/hooks/use-mobile";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const AppLayout = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-800/90 dark:to-gray-900 transition-colors duration-300">
      <div className="dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-calendoodle-blue/10 dark:via-transparent dark:to-transparent fixed inset-0 z-0 pointer-events-none"></div>
      
      <Navbar onMenuClick={() => setShowSidebar(!showSidebar)} />
      
      <div className="flex flex-grow pt-16">
        <div ref={sidebarRef} className="z-10">
          <Sidebar isOpen={showSidebar} setIsOpen={setShowSidebar} />
        </div>
        
        <main 
          className={`flex-grow z-1 transition-all duration-300 ease-in-out ${
            showSidebar ? 'pl-0 sm:pl-64' : 'pl-0 sm:pl-16'
          }`}
        >
          <div className="p-4 sm:p-6 max-w-[1800px] mx-auto min-h-[calc(100vh-11rem)]">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
