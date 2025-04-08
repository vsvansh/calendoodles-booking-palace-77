
import { useState } from "react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Bell, Calendar, Menu, LogOut, User, Settings } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const isMobile = useIsMobile();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would come from auth context in a real app

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900/90 dark:border-gray-800 border-b z-10 animate-fade-in backdrop-blur-sm transition-colors duration-300">
      <div className="flex items-center justify-between h-16 px-4 md:px-6 relative">
        {/* Left section */}
        <div className="flex items-center gap-4">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={onMenuClick} className="md:hidden">
              <Menu className="h-6 w-6 text-calendoodle-blue dark:text-calendoodle-blue/90" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          )}
          
          <Link to="/" className="flex items-center gap-2 group">
            <Calendar className="h-6 w-6 text-calendoodle-purple transition-transform group-hover:rotate-12 dark:text-calendoodle-purple/90" />
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-calendoodle-blue to-calendoodle-purple text-transparent bg-clip-text group-hover:from-calendoodle-purple group-hover:to-calendoodle-blue transition-all duration-500 hidden sm:inline">
              Calendoodles
            </span>
          </Link>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-gray-500 hover:text-calendoodle-purple transition-colors dark:text-gray-400 dark:hover:text-calendoodle-purple" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
          </Button>
          
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-transparent">
                  <Avatar className="h-8 w-8 border-2 border-calendoodle-purple/40 transition-transform hover:scale-105">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback className="bg-calendoodle-blue text-white">
                      CD
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 dark:bg-gray-800 dark:border-gray-700">
                <DropdownMenuLabel className="dark:text-gray-200">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="dark:bg-gray-700" />
                <DropdownMenuItem className="cursor-pointer dark:hover:bg-gray-700 dark:focus:bg-gray-700 transition-colors">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer dark:hover:bg-gray-700 dark:focus:bg-gray-700 transition-colors">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="dark:bg-gray-700" />
                <DropdownMenuItem className="cursor-pointer dark:hover:bg-gray-700 dark:focus:bg-gray-700 transition-colors" onClick={() => setIsLoggedIn(false)}>
                  <LogOut className="mr-2 h-4 w-4 text-red-500" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button variant="gradient" className="rounded-full">Login</Button>
              </Link>
              <Link to="/register" className="hidden sm:block">
                <Button variant="outline" className="rounded-full border-2 dark:border-gray-700 dark:hover:border-calendoodle-blue/50 transition-colors">
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
