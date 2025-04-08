
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetClose, SheetContent } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Calendar,
  Clock,
  Home,
  Settings,
  Users,
  CalendarClock,
  CreditCard,
  BarChart3,
  User,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  const navigationItems = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
    { name: 'Appointments', href: '/appointments', icon: CalendarClock },
    { name: 'Services', href: '/services', icon: Clock },
    { name: 'Clients', href: '/clients', icon: Users },
    { name: 'Payments', href: '/payments', icon: CreditCard },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const renderNavItems = () => (
    <div className="space-y-1">
      {navigationItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = location.pathname === item.href;
        
        return (
          <TooltipProvider key={item.name} delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg group transition-all 
                  ${isActive 
                    ? 'bg-calendoodle-purple/20 text-calendoodle-purple dark:bg-calendoodle-purple/30 dark:text-white' 
                    : 'hover:bg-calendoodle-purple/10 hover:text-calendoodle-purple dark:hover:bg-calendoodle-purple/20 dark:text-gray-200 dark:hover:text-white'}`}
                >
                  <IconComponent className={`${!isOpen && !isMobile ? 'mx-auto' : 'mr-3'} h-5 w-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 ${isActive ? 'text-calendoodle-purple' : ''}`} aria-hidden="true" />
                  {(isOpen || isMobile) && <span className="truncate transition-all duration-300">{item.name}</span>}
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className={isOpen ? "hidden" : ""}>
                {item.name}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );

  const mobileView = () => (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="left" className="w-64 p-0 border-r pt-16 dark:bg-gray-900 dark:border-gray-800">
        <ScrollArea className="h-full py-4 scrollbar-thin">
          <div className="px-3 pb-16 pt-2">{renderNavItems()}</div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );

  const desktopView = () => (
    <div
      className={`transition-all duration-300 fixed z-20 ${
        isOpen ? 'w-64' : 'w-16'
      } left-0 inset-y-0 bg-white dark:bg-gray-900 border-r dark:border-gray-800 h-screen pt-16`}
    >
      <div className="flex items-center justify-end px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="h-6 w-6 absolute right-2 top-[74px] dark:text-gray-200"
        >
          {isOpen ? (
            <PanelLeftClose className="h-4 w-4" />
          ) : (
            <PanelLeftOpen className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      <ScrollArea className="h-full py-4 scrollbar-thin">
        <div className="px-3 pb-16 pt-2">{renderNavItems()}</div>
      </ScrollArea>
    </div>
  );

  return (
    <>
      {isMobile ? mobileView() : desktopView()}
      {!isMobile && <div className={`${isOpen ? 'w-64' : 'w-16'} transition-all duration-300`} />}
    </>
  );
};

export default Sidebar;
