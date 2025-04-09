import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Bell, Calendar, Menu, LogOut, User, Settings, Check, Info, AlertTriangle } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";

interface NavbarProps {
  onMenuClick: () => void;
  sidebarOpen?: boolean;
}

const notifications = [
  {
    id: 1,
    title: "New appointment request",
    description: "John Doe requested an appointment for tomorrow at 2:00 PM",
    time: "5 minutes ago",
    type: "info",
    read: false
  },
  {
    id: 2,
    title: "Appointment confirmed",
    description: "Your meeting with Sarah Smith is confirmed for today at 4:30 PM",
    time: "1 hour ago",
    type: "success",
    read: false
  },
  {
    id: 3,
    title: "Appointment cancelled",
    description: "Mike Johnson cancelled their appointment scheduled for tomorrow",
    time: "2 hours ago",
    type: "warning",
    read: true
  },
  {
    id: 4,
    title: "Payment received",
    description: "You received a payment of $75.00 from Emily Davis",
    time: "Yesterday",
    type: "success",
    read: true
  }
];

const Navbar = ({
  onMenuClick,
  sidebarOpen
}: NavbarProps) => {
  const isMobile = useIsMobile();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [unreadCount, setUnreadCount] = useState(notifications.filter(n => !n.read).length);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNotificationClick = () => {
    setUnreadCount(0);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <Check className="h-4 w-4 text-green-500 dark:text-green-400 dark:blue-glow" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500 dark:text-yellow-400 dark:orange-glow" />;
      case "info":
      default:
        return <Info className="h-4 w-4 text-blue-500 dark:text-blue-400 dark:blue-glow" />;
    }
  };

  const handleSettingsClick = () => {
    navigate('/settings');
    window.scrollTo(0, 0);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 bg-white/95 dark:bg-gray-950/95 dark:border-gray-800 border-b z-40 animate-fade-in backdrop-blur-lg transition-all duration-300 ${scrolled ? 'shadow-md dark:shadow-[0_0_20px_rgba(0,0,0,0.3)]' : ''}`}>
      <div className="flex items-center justify-between h-16 px-4 md:px-6 relative">
        <div className="flex items-center gap-4">
          {isMobile && 
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onMenuClick} 
              className="md:hidden hover:scale-110 transition-all duration-300 active:scale-90"
            >
              <Menu className="h-6 w-6 text-calendoodle-blue dark:text-calendoodle-blue/90 dark:blue-glow" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          }
          
          <Link to="/" className="flex items-center gap-2 group" onClick={() => window.scrollTo(0, 0)}>
            <Calendar className="h-6 w-6 text-calendoodle-purple transition-transform group-hover:rotate-12 dark:text-calendoodle-purple/90 dark:purple-glow" />
            <span className="tracking-tight bg-gradient-to-r from-calendoodle-blue to-calendoodle-purple text-transparent bg-clip-text group-hover:from-calendoodle-purple group-hover:to-calendoodle-blue transition-all duration-500 hidden sm:inline text-2xl font-bold">
              Calendoodles
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative hover:scale-110 transition-all duration-300 active:scale-90">
                <Bell className="h-5 w-5 text-gray-500 hover:text-calendoodle-purple transition-colors dark:text-gray-400 dark:hover:text-calendoodle-purple dark:hover:purple-glow" />
                {unreadCount > 0 && 
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center animate-pulse-subtle">
                    {unreadCount}
                  </span>
                }
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 dark:bg-gray-900 dark:border-gray-700 dark:shadow-[0_5px_15px_rgba(0,0,0,0.5)] animate-slide-up" align="end">
              <DropdownMenuLabel className="flex justify-between items-center dark:text-white">
                <span>Notifications</span>
                <Button variant="ghost" size="sm" className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" onClick={handleNotificationClick}>
                  Mark all as read
                </Button>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="dark:bg-gray-700" />
              <div className="max-h-[300px] overflow-y-auto scrollbar-thin">
                {notifications.length > 0 ? (
                  notifications.map(notification => (
                    <DropdownMenuItem key={notification.id} className="p-0 focus:bg-transparent">
                      <div className={`w-full p-3 hover:bg-gray-100 dark:hover:bg-gray-800/50 cursor-pointer transition-colors duration-300 ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                        <div className="flex items-start gap-2">
                          <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex justify-between">
                              <p className="text-sm font-medium dark:text-white">{notification.title}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</p>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-300">
                              {notification.description}
                            </p>
                          </div>
                          {!notification.read && <div className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0 mt-2 dark:blue-glow"></div>}
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <div className="py-6 text-center">
                    <p className="text-gray-500 dark:text-gray-400">No notifications yet</p>
                  </div>
                )}
              </div>
              <DropdownMenuSeparator className="dark:bg-gray-700" />
              <DropdownMenuItem className="justify-center focus:bg-transparent">
                <Link to="/notifications" className="text-sm text-calendoodle-blue hover:text-calendoodle-blue/80 dark:hover:text-calendoodle-blue/90 dark:hover:blue-glow font-medium" onClick={() => window.scrollTo(0, 0)}>
                  View all notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-transparent hover:scale-110 transition-transform duration-300">
                  <Avatar className="h-8 w-8 border-2 border-calendoodle-purple/40 transition-transform hover:scale-105 dark:shadow-[0_0_10px_rgba(155,89,182,0.5)]">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback className="bg-calendoodle-blue text-white">
                      CD
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 dark:bg-gray-900 dark:border-gray-700 animate-slide-up">
                <DropdownMenuLabel className="dark:text-gray-200">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="dark:bg-gray-700" />
                <DropdownMenuItem className="cursor-pointer dark:hover:bg-gray-800 dark:focus:bg-gray-800 transition-colors" onClick={() => {
                  navigate('/profile');
                  window.scrollTo(0, 0);
                }}>
                  <User className="mr-2 h-4 w-4 dark:blue-glow" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer dark:hover:bg-gray-800 dark:focus:bg-gray-800 transition-colors" onClick={handleSettingsClick}>
                  <Settings className="mr-2 h-4 w-4 dark:blue-glow" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="dark:bg-gray-700" />
                <DropdownMenuItem className="cursor-pointer dark:hover:bg-gray-800 dark:focus:bg-gray-800 transition-colors" onClick={() => setIsLoggedIn(false)}>
                  <LogOut className="mr-2 h-4 w-4 text-red-500 dark:text-red-400" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login" onClick={() => window.scrollTo(0, 0)}>
                <Button variant="gradient" className="rounded-full hover:scale-105 transition-all duration-300 dark:shadow-glow-blue">
                  Login
                </Button>
              </Link>
              <Link to="/register" className="hidden sm:block" onClick={() => window.scrollTo(0, 0)}>
                <Button variant="outline" className="rounded-full border-2 dark:border-gray-700 dark:hover:border-calendoodle-blue/50 transition-colors hover:scale-105 dark:hover:shadow-[0_0_12px_rgba(52,152,219,0.4)]">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
