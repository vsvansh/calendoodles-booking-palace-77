
import React from "react";
import { NavLink } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  BarChart3, 
  Calendar, 
  CreditCard, 
  Layers, 
  Settings, 
  Users,
  ChevronRight,
  ChevronLeft,
  Home,
  CalendarClock,
  User,
  MessageSquare
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const menuItems = [
  {
    title: "Dashboard",
    icon: <Home className="h-5 w-5" />,
    route: "/",
  },
  {
    title: "Calendar",
    icon: <Calendar className="h-5 w-5" />,
    route: "/calendar",
  },
  {
    title: "Appointments",
    icon: <CalendarClock className="h-5 w-5" />,
    route: "/appointments",
  },
  {
    title: "Services",
    icon: <Layers className="h-5 w-5" />,
    route: "/services",
  },
  {
    title: "Clients",
    icon: <Users className="h-5 w-5" />,
    route: "/clients",
  },
  {
    title: "Payments",
    icon: <CreditCard className="h-5 w-5" />,
    route: "/payments",
  },
  {
    title: "Analytics",
    icon: <BarChart3 className="h-5 w-5" />,
    route: "/analytics",
  },
];

const secondaryMenuItems = [
  {
    title: "Profile",
    icon: <User className="h-5 w-5" />,
    route: "/profile",
  },
  {
    title: "Settings",
    icon: <Settings className="h-5 w-5" />,
    route: "/settings",
  },
  {
    title: "Contact Us",
    icon: <MessageSquare className="h-5 w-5" />,
    route: "/contact-us",
  }
];

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // For mobile, show sidebar as an overlay when open
  if (isMobile) {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity" onClick={toggleSidebar}>
        <SidebarContent isOpen={true} setIsOpen={setIsOpen} toggleSidebar={toggleSidebar} />
      </div>
    );
  }

  // For desktop, show collapsible sidebar that shrinks instead of hiding
  return <SidebarContent isOpen={isOpen} setIsOpen={setIsOpen} toggleSidebar={toggleSidebar} />;
};

// Separating the content to reuse between mobile and desktop views
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

  return (
    <aside 
      className={cn(
        "fixed left-0 top-16 bottom-0 z-40 h-[calc(100vh-4rem)] bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-20"
      )}
      // Stop propagation to prevent the sidebar from closing when clicking inside it (for mobile)
      onClick={e => isMobile && e.stopPropagation()}
    > 
      <div 
        className={cn(
          "h-full flex flex-col py-5 px-4 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 transition-all duration-300 ease-in-out",
        )}
      >
        {/* Toggle button at the top */}
        <div className="mb-5 text-center">
          {!isMobile && (
            <Button
              variant="outline"
              size="icon"
              onClick={toggleSidebar}
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isOpen ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          )}
        </div>
        
        <div className="flex-1 space-y-2">
          <NavItems items={menuItems} isOpen={isOpen} />
        </div>
        
        <div className="mt-6 space-y-2 border-t border-gray-200 dark:border-gray-800 pt-6">
          <NavItems items={secondaryMenuItems} isOpen={isOpen} />
        </div>
        
        <div className="mt-6 border-t border-gray-200 dark:border-gray-800 pt-6 text-xs text-muted-foreground">
          {isOpen && (
            <div className="text-center text-gray-500 dark:text-gray-400 text-xs pt-2">
              <div className="mb-1">Calendoodles v1.0.0</div>
              <div>&copy; {new Date().getFullYear()} | All rights reserved</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

// Menu item render logic with optional tooltips for collapsed state
const NavItems = ({ items, isOpen }: { items: any[]; isOpen: boolean }) => {
  return items.map((item) => (
    <NavItem key={item.route} item={item} isOpen={isOpen} />
  ));
};

const NavItem = ({ item, isOpen }: { item: any; isOpen: boolean }) => {
  const navLink = (
    <NavLink
      to={item.route}
      className={({ isActive }) => 
        cn(
          "flex items-center group px-3 py-2 rounded-lg transition-colors",
          "hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:transition-all hover:duration-300",
          isActive 
            ? "bg-gray-100 dark:bg-gray-800/60 text-calendoodle-blue dark:text-calendoodle-blue/90" 
            : "text-gray-600 dark:text-gray-400",
          isOpen ? "justify-start" : "justify-center"
        )
      }
      onClick={() => window.scrollTo(0, 0)}
    >
      <span className={cn(
        "transition duration-300",
        isActive => isActive 
          ? "text-calendoodle-blue dark:blue-glow" 
          : "text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200"
      )}>
        {item.icon}
      </span>
      {isOpen && <span className="ml-3 text-sm">{item.title}</span>}
    </NavLink>
  );

  if (!isOpen) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{navLink}</TooltipTrigger>
          <TooltipContent side="right" className="bg-white dark:bg-gray-800 dark:border-gray-700 font-normal">
            {item.title}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return navLink;
};

export default Sidebar;
