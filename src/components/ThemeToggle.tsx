
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check for dark mode preference
    if (typeof window !== 'undefined') {
      // Check for system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return true;
      }
      // Check for stored preference
      const storedTheme = window.localStorage.getItem('theme');
      if (storedTheme) {
        return storedTheme === 'dark';
      }
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
      className="rounded-full transition-all duration-300 relative"
    >
      <div className="relative">
        {isDarkMode ? (
          <>
            <div className="absolute inset-0 bg-calendoodle-blue rounded-full opacity-20 animate-pulse-glow" />
            <Moon className="h-5 w-5 transition-transform rotate-0 scale-100 text-calendoodle-blue" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-calendoodle-orange rounded-full opacity-20 animate-pulse-glow" />
            <Sun className="h-5 w-5 transition-transform rotate-0 scale-100 text-calendoodle-orange" />
          </>
        )}
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
