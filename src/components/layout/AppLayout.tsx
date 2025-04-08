
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const AppLayout = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-800/90 dark:to-gray-900 transition-colors duration-300">
      <div className="dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-calendoodle-blue/10 dark:via-transparent dark:to-transparent fixed inset-0 z-0 pointer-events-none"></div>
      
      <Navbar onMenuClick={() => setShowSidebar(!showSidebar)} />
      <Sidebar isOpen={showSidebar} setIsOpen={setShowSidebar} />
      
      <main className={`pt-16 pb-6 relative z-1 ${showSidebar ? 'pl-0 sm:pl-64' : 'pl-0'} transition-all duration-300 ease-in-out`}>
        <div className="p-4 sm:p-6 max-w-[1800px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
