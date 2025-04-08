
import { useState, useEffect } from 'react';
import { Moon, Sun, Stars } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check for dark mode preference
    if (typeof window !== 'undefined') {
      // Check for stored preference
      const storedTheme = window.localStorage.getItem('theme');
      if (storedTheme) {
        return storedTheme === 'dark';
      }
      // Check for system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    // Update the class on the html element
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme} 
      className="rounded-full transition-all duration-500 relative overflow-hidden"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative z-10">
        {isDarkMode ? (
          <div className="relative">
            <div className="absolute inset-0 bg-calendoodle-blue rounded-full opacity-20 animate-pulse-glow"></div>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <Stars className="h-3 w-3 absolute text-white opacity-70 animate-ping" style={{ top: '15%', left: '20%' }} />
            </div>
            <Moon className="h-5 w-5 transition-transform rotate-0 scale-100 text-calendoodle-blue" />
          </div>
        ) : (
          <div className="relative">
            <div className="absolute inset-0 bg-calendoodle-orange rounded-full opacity-20 animate-pulse-glow"></div>
            <Sun className="h-5 w-5 transition-transform rotate-0 scale-100 text-calendoodle-orange" />
          </div>
        )}
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
