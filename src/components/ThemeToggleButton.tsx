
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

export function ThemeToggleButton() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check for stored preference
    if (typeof window !== 'undefined') {
      const storedTheme = window.localStorage.getItem('theme');
      return storedTheme === 'dark';
    }
    return false;
  });

  const { toast } = useToast();

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

  // Initialize to light mode on component mount
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    setIsDarkMode(false);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    toast({
      title: newMode ? "Dark mode enabled" : "Light mode enabled",
      description: newMode ? "Interface switched to dark theme" : "Interface switched to light theme",
    });
  };

  return (
    <div className="relative flex items-center">
      <Button 
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="relative mr-2 p-0 h-8 w-8 rounded-full overflow-hidden hover:bg-transparent"
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        <span className="sr-only">Toggle theme</span>
        {isDarkMode ? (
          <Moon className="h-5 w-5 text-blue-400 drop-shadow-glow" />
        ) : (
          <Sun className="h-5 w-5 text-amber-400" />
        )}
      </Button>
      
      <div className="hidden md:flex items-center">
        <Switch
          checked={isDarkMode}
          onCheckedChange={toggleTheme}
          className={`${
            isDarkMode 
              ? 'bg-blue-600 dark:bg-blue-700' 
              : 'bg-amber-500'
          } relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none`}
        />
        <span className="sr-only">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
      </div>
    </div>
  );
}
