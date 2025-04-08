
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const AppLayout = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar onMenuClick={() => setShowSidebar(!showSidebar)} />
      <Sidebar isOpen={showSidebar} setIsOpen={setShowSidebar} />
      <main className={`pt-16 pb-6 ${showSidebar ? 'pl-0 sm:pl-64' : 'pl-0'} transition-all duration-300 ease-in-out`}>
        <div className="p-4 sm:p-6 max-w-[1800px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
