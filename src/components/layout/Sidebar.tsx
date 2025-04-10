import { forwardRef, useRef } from 'react';
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
  ChevronRight,
  MessageSquareHeart
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(({ isOpen, setIsOpen }, ref) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  
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
    { name: 'Contact Us', href: '/contact-us', icon: MessageSquareHeart },
  ];

  const renderNavItems = () => (
    <div className="space-y-2">
      {navigationItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = location.pathname === item.href;
        
        return (
          <TooltipProvider key={item.name} delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl group transition-all duration-300
                  ${isActive 
                    ? 'bg-calendoodle-purple/20 text-calendoodle-purple dark:bg-calendoodle-purple/30 dark:text-white' 
                    : 'hover:bg-calendoodle-purple/10 hover:text-calendoodle-purple dark:hover:bg-calendoodle-purple/20 dark:text-gray-300 dark:hover:text-white'}`}
                  onClick={() => {
                    if (isMobile) setIsOpen(false);
                    // Scroll to top when navigating
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth'
                    });
                  }}
                >
                  <IconComponent 
                    className={`${!isOpen && !isMobile ? 'mx-auto' : 'mr-3'} h-5 w-5 flex-shrink-0 
                    group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 
                    ${isActive ? 'text-calendoodle-purple dark:text-calendoodle-blue dark:drop-shadow-[0_0_8px_rgba(52,152,219,0.8)]' : ''}`} 
                    aria-hidden="true" 
                  />
                  {(isOpen || isMobile) && (
                    <span className="truncate transition-all duration-300">
                      {item.name}
                    </span>
                  )}
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
      <SheetContent side="left" className="w-64 p-0 border-r pt-16 dark:bg-gray-950 dark:border-gray-800 dark:shadow-[0_0_25px_rgba(0,0,0,0.3)]">
        <ScrollArea className="h-full py-4 scrollbar-thin">
          <div className="px-3 pb-16 pt-2">
            {renderNavItems()}
          </div>
        </ScrollArea>
        <SheetClose ref={closeButtonRef} className="sr-only">Close</SheetClose>
      </SheetContent>
    </Sheet>
  );

  const desktopView = () => (
    <div
      ref={ref}
      className={`fixed z-30 ${
        isOpen ? 'w-64' : 'w-20'
      } left-0 top-16 bottom-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-r dark:border-gray-800 h-[calc(100vh-4rem)] dark:shadow-[0_0_20px_rgba(0,0,0,0.3)] transition-all duration-500 ease-in-out`}
    >
      <div className="flex items-center justify-end px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="h-7 w-7 absolute -right-3.5 top-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-sm z-50 hover:shadow-md dark:hover:shadow-[0_0_8px_rgba(52,152,219,0.5)] transition-all duration-300"
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? (
            <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform duration-300 hover:scale-110" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400 rotate-180 transition-transform duration-300 hover:scale-110" />
          )}
        </Button>
      </div>
      
      <ScrollArea className="h-full py-4 scrollbar-thin">
        <div className="px-3 pb-16 pt-6">{renderNavItems()}</div>
      </ScrollArea>
    </div>
  );

  return (
    <>
      {isMobile ? mobileView() : desktopView()}
      {!isMobile && <div className={`${isOpen ? 'w-64' : 'w-20'} flex-shrink-0 transition-all duration-500`} />}
    </>
  );
});

Sidebar.displayName = "Sidebar";

export default Sidebar;
