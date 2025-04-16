import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChart3, Calendar, CreditCard, Layers, Settings, Users, ChevronRight, ChevronLeft, Home, CalendarClock, User, MessageSquare } from "lucide-react";
interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
const menuItems = [{
  title: "Dashboard",
  icon: <Home className="h-5 w-5" />,
  route: "/"
}, {
  title: "Calendar",
  icon: <Calendar className="h-5 w-5" />,
  route: "/calendar"
}, {
  title: "Appointments",
  icon: <CalendarClock className="h-5 w-5" />,
  route: "/appointments"
}, {
  title: "Services",
  icon: <Layers className="h-5 w-5" />,
  route: "/services"
}, {
  title: "Clients",
  icon: <Users className="h-5 w-5" />,
  route: "/clients"
}, {
  title: "Payments",
  icon: <CreditCard className="h-5 w-5" />,
  route: "/payments"
}, {
  title: "Analytics",
  icon: <BarChart3 className="h-5 w-5" />,
  route: "/analytics"
}];
const secondaryMenuItems = [{
  title: "Profile",
  icon: <User className="h-5 w-5" />,
  route: "/profile"
}, {
  title: "Settings",
  icon: <Settings className="h-5 w-5" />,
  route: "/settings"
}, {
  title: "Contact Us",
  icon: <MessageSquare className="h-5 w-5" />,
  route: "/contact-us"
}];
const Sidebar = ({
  isOpen,
  setIsOpen
}: SidebarProps) => {
  const isMobile = useIsMobile();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  if (isMobile) {
    if (!isOpen) return null;
    return <div className="fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity" onClick={toggleSidebar}>
        <SidebarContent isOpen={true} setIsOpen={setIsOpen} toggleSidebar={toggleSidebar} />
      </div>;
  }
  return <SidebarContent isOpen={isOpen} setIsOpen={setIsOpen} toggleSidebar={toggleSidebar} />;
};
const SidebarContent = ({
  isOpen,
  setIsOpen,
  toggleSidebar
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
}) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  return <aside className={cn("fixed left-0 top-16 bottom-0 z-40 h-[calc(100vh-4rem)] bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out", isOpen ? "w-64" : "w-20")} onClick={e => isMobile && e.stopPropagation()}> 
      <div className="h-full flex flex-col py-5 px-4 transition-all duration-300 ease-in-out">
        <div className="mb-5 text-center">
          {!isMobile && <Button variant="outline" size="icon" onClick={toggleSidebar} className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-110 transition-transform duration-300">
              {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              <span className="sr-only">Toggle sidebar</span>
            </Button>}
        </div>
        
        <ScrollArea className="flex-1 overflow-y-auto pr-1">
          <div className="space-y-2">
            <NavItems items={menuItems} isOpen={isOpen} currentPath={location.pathname} />
          </div>
          
          <div className="mt-6 space-y-2 border-t border-gray-200 dark:border-gray-800 pt-6">
            <NavItems items={secondaryMenuItems} isOpen={isOpen} currentPath={location.pathname} />
          </div>
        </ScrollArea>
        
        <div className="mt-6 border-t border-gray-200 dark:border-gray-800 pt-6 text-xs text-muted-foreground">
          {isOpen && <div className="text-center text-gray-500 dark:text-gray-400 text-xs pt-2">
              <div className="mb-1">Calendoodles v1.0.0 | Amulya</div>
              <div>&copy; {new Date().getFullYear()} | All rights reserved</div>
            </div>}
        </div>
      </div>
    </aside>;
};
const NavItems = ({
  items,
  isOpen,
  currentPath
}: {
  items: any[];
  isOpen: boolean;
  currentPath: string;
}) => {
  return items.map(item => <NavItem key={item.route} item={item} isOpen={isOpen} isActive={currentPath === item.route} />);
};
const NavItem = ({
  item,
  isOpen,
  isActive
}: {
  item: any;
  isOpen: boolean;
  isActive: boolean;
}) => {
  const navLink = <NavLink to={item.route} className={({
    isActive
  }) => cn("flex items-center group px-3 py-2 rounded-lg transition-all", "hover:bg-gray-100 dark:hover:bg-gray-800/80 hover:scale-105 hover:transition-all hover:duration-300", "dark:text-gray-300 dark:hover:text-white", "relative overflow-hidden", isActive ? "bg-gray-100 dark:bg-gray-800 text-calendoodle-blue dark:text-calendoodle-blue/90" : "text-gray-600 dark:text-gray-400", isOpen ? "justify-start" : "justify-center")}>
      <span className={cn("transition-all duration-300 transform group-hover:scale-110 group-hover:-rotate-3", "relative z-10")}>
        {item.icon}
      </span>
      {isOpen && <span className="ml-3 text-sm transition-all duration-300 transform group-hover:translate-x-1">{item.title}</span>}
      
    </NavLink>;
  if (!isOpen) {
    return <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{navLink}</TooltipTrigger>
          <TooltipContent side="right" className="bg-white dark:bg-gray-800 dark:border-gray-700 font-normal">
            {item.title}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>;
  }
  return navLink;
};
export default Sidebar;