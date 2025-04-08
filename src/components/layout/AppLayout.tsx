
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useIsMobile } from "@/hooks/use-mobile";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen bg-calendoodle-cream/30">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex flex-col flex-1">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className={`flex-1 p-4 md:p-6 ${isMobile ? 'pt-20' : 'pt-24'}`}>
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
        
        <footer className="py-4 px-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Calendoodles Booking System. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default AppLayout;
