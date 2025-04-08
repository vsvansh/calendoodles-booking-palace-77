
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
import { Bell, Calendar, Menu, Moon, Settings, Sun, User } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const isMobile = useIsMobile();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would come from auth context in a real app

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 border-b z-10 animate-fade-in">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Left section */}
        <div className="flex items-center gap-4">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={onMenuClick} className="md:hidden">
              <Menu className="h-6 w-6 text-calendoodle-blue" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          )}
          
          <Link to="/" className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-calendoodle-purple animate-wiggle" />
            <span className="font-bold text-xl tracking-tight text-calendoodle-blue hidden sm:inline">
              Calendoodles
            </span>
          </Link>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-gray-500 hover:text-calendoodle-purple" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>
          
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8 border-2 border-calendoodle-purple/40">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback className="bg-calendoodle-blue text-white">
                      CD
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={() => setIsLoggedIn(false)}>
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button className="calendoodle-btn calendoodle-btn-primary">Login</Button>
              </Link>
              <Link to="/register" className="hidden sm:block">
                <Button variant="outline" className="calendoodle-btn">
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
