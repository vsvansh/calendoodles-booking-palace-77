
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

// Define accent color type and options
type AccentColor = 'purple' | 'blue' | 'green' | 'red' | 'orange' | 'pink';

const accentColors: Record<AccentColor, { bg: string, ring: string }> = {
  'purple': { bg: 'bg-purple-500', ring: 'ring-purple-300' },
  'blue': { bg: 'bg-blue-500', ring: 'ring-blue-300' },
  'green': { bg: 'bg-green-500', ring: 'ring-green-300' },
  'red': { bg: 'bg-red-500', ring: 'ring-red-300' },
  'orange': { bg: 'bg-orange-500', ring: 'ring-orange-300' },
  'pink': { bg: 'bg-pink-500', ring: 'ring-pink-300' }
};

const Settings = () => {
  const { toast } = useToast();
  const [theme, setTheme] = useState(() => {
    // Get theme from localStorage or default to 'light'
    return localStorage.getItem('theme') || 'light';
  });
  const [language, setLanguage] = useState('english');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [compactView, setCompactView] = useState(false);
  const [accentColor, setAccentColor] = useState<AccentColor>('purple');
  const [activeTab, setActiveTab] = useState('general');
  
  // Apply theme when component mounts or theme changes
  useEffect(() => {
    const htmlElement = document.documentElement;
    
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else if (theme === 'light') {
      htmlElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else if (theme === 'system') {
      // Check system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemPrefersDark) {
        htmlElement.classList.add('dark');
      } else {
        htmlElement.classList.remove('dark');
      }
      localStorage.setItem('theme', 'system');
    }
  }, [theme]);
  
  useEffect(() => {
    // Apply reduced motion settings
    if (reducedMotion) {
      document.body.classList.add('reduce-motion');
    } else {
      document.body.classList.remove('reduce-motion');
    }
  }, [reducedMotion]);
  
  useEffect(() => {
    // Apply compact view settings
    if (compactView) {
      document.body.classList.add('compact-view');
    } else {
      document.body.classList.remove('compact-view');
    }
  }, [compactView]);
  
  useEffect(() => {
    // Apply accent color
    document.body.setAttribute('data-accent', accentColor);

    // Update CSS variables based on accent color
    const root = document.documentElement;
    
    // Define color values for each accent
    const colorValues = {
      'purple': {
        main: '#9b59b6',
        light: '#d6bcfa',
        dark: '#7e3996',
      },
      'blue': {
        main: '#3498db',
        light: '#bee3f8',
        dark: '#2c78b4',
      },
      'green': {
        main: '#2ecc71',
        light: '#c6f6d5',
        dark: '#25a25a',
      },
      'red': {
        main: '#e74c3c',
        light: '#fed7d7',
        dark: '#c53030',
      },
      'orange': {
        main: '#f39c12',
        light: '#feebc8',
        dark: '#c27d0e',
      },
      'pink': {
        main: '#e84393',
        light: '#fed7e2',
        dark: '#b83280',
      },
    };

    const selected = colorValues[accentColor];
    
    root.style.setProperty('--calendoodle-accent', selected.main);
    root.style.setProperty('--calendoodle-accent-light', selected.light);
    root.style.setProperty('--calendoodle-accent-dark', selected.dark);

  }, [accentColor]);
  
  const handleGeneralSave = () => {
    toast({
      title: 'Settings saved',
      description: 'Your general settings have been updated.',
    });
  };
  
  const handleAppearanceSave = () => {
    toast({
      title: 'Appearance updated',
      description: `Theme set to ${theme}, accent color set to ${accentColor}.`,
    });
  };
  
  const handleNotificationSave = () => {
    toast({
      title: 'Notification preferences saved',
      description: 'Your notification settings have been updated.',
    });
  };

  const handleAddPaymentMethod = () => {
    toast({
      title: 'Add Payment Method',
      description: 'Payment method form would open here.',
      variant: 'default',
    });
  };

  const handleChangePlan = () => {
    toast({
      title: 'Change Plan',
      description: 'Plan selection options would appear here.',
      variant: 'default',
    });
  };
  
  const handleCancelSubscription = () => {
    toast({
      title: 'Cancel Subscription',
      description: 'Subscription cancellation process would start here.',
      variant: 'destructive',
    });
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Scroll to top when changing tabs
    window.scrollTo(0, 0);
  };

  const handleAccentColorChange = (color: AccentColor) => {
    setAccentColor(color);
    toast({
      title: 'Accent color updated',
      description: `Accent color changed to ${color}.`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-200 dark:to-white bg-clip-text text-transparent">Settings</h1>
        <p className="text-muted-foreground">
          Manage your application settings and preferences.
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList className="glass-effect dark:neo-blur">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card className="border-2 border-gray-100 dark:border-gray-800 shadow-md dark:shadow-[0_0_20px_rgba(0,0,0,0.2)] dark:bg-gray-900/80 transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="dark:text-gray-100">General Settings</CardTitle>
              <CardDescription className="dark:text-gray-400">
                Manage your basic application preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="america-new_york">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a timezone" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    <SelectItem value="america-new_york">America/New York (UTC-04:00)</SelectItem>
                    <SelectItem value="america-los_angeles">America/Los Angeles (UTC-07:00)</SelectItem>
                    <SelectItem value="america-chicago">America/Chicago (UTC-05:00)</SelectItem>
                    <SelectItem value="europe-london">Europe/London (UTC+01:00)</SelectItem>
                    <SelectItem value="asia-tokyo">Asia/Tokyo (UTC+09:00)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select 
                  value={language} 
                  onValueChange={setLanguage}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="japanese">Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dateFormat">Date Format</Label>
                <Select defaultValue="mm-dd-yyyy">
                  <SelectTrigger>
                    <SelectValue placeholder="Select date format" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="yyyy-mm-dd">YYYY/MM/DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timeFormat">Time Format</Label>
                <Select defaultValue="12h">
                  <SelectTrigger>
                    <SelectValue placeholder="Select time format" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    <SelectItem value="12h">12-hour (1:00 PM)</SelectItem>
                    <SelectItem value="24h">24-hour (13:00)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>First Day of Week</Label>
                  <p className="text-[0.8rem] text-muted-foreground">
                    Choose which day your calendar week starts on.
                  </p>
                </div>
                <Select defaultValue="sunday">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    <SelectItem value="sunday">Sunday</SelectItem>
                    <SelectItem value="monday">Monday</SelectItem>
                    <SelectItem value="saturday">Saturday</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handleGeneralSave} className="transition-all duration-300 hover:scale-105 dark:hover:shadow-[0_0_15px_rgba(52,152,219,0.5)]">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4">
          <Card className="border-2 border-gray-100 dark:border-gray-800 shadow-md dark:shadow-[0_0_20px_rgba(0,0,0,0.2)] dark:bg-gray-900/80 transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="dark:text-gray-100">Appearance</CardTitle>
              <CardDescription className="dark:text-gray-400">
                Customize how Calendoodles looks for you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Theme</Label>
                  <p className="text-[0.8rem] text-muted-foreground">
                    Select your preferred theme for the application.
                  </p>
                </div>
                <Select 
                  value={theme} 
                  onValueChange={setTheme}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Reduced Motion</Label>
                  <p className="text-[0.8rem] text-muted-foreground">
                    Reduce motion effects in the user interface.
                  </p>
                </div>
                <Switch checked={reducedMotion} onCheckedChange={setReducedMotion} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Compact View</Label>
                  <p className="text-[0.8rem] text-muted-foreground">
                    Use a more compact layout throughout the application.
                  </p>
                </div>
                <Switch checked={compactView} onCheckedChange={setCompactView} />
              </div>
              
              <div className="space-y-2">
                <Label>Accent Color</Label>
                <div className="flex gap-3 flex-wrap">
                  {(Object.keys(accentColors) as AccentColor[]).map(color => (
                    <Button 
                      key={color}
                      className={`h-9 w-9 rounded-full ${accentColors[color].bg} transition-all duration-300 
                        ${accentColor === color ? `ring-4 ${accentColors[color].ring} scale-125 shadow-lg` : 'opacity-70 hover:opacity-100'}`} 
                      variant="outline" 
                      aria-label={`Set accent color to ${color}`}
                      onClick={() => handleAccentColorChange(color)}
                    />
                  ))}
                </div>
                <p className="text-[0.8rem] text-muted-foreground pt-2">
                  Accent colors affect buttons, links, and highlights throughout the app.
                </p>
              </div>
              
              <Button onClick={handleAppearanceSave} className="transition-all duration-300 hover:scale-105 dark:hover:shadow-[0_0_15px_rgba(52,152,219,0.5)]">Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card className="border-2 border-gray-100 dark:border-gray-800 shadow-md dark:shadow-[0_0_20px_rgba(0,0,0,0.2)] dark:bg-gray-900/80 transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="dark:text-gray-100">Notification Settings</CardTitle>
              <CardDescription className="dark:text-gray-400">
                Configure how and when you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium dark:text-gray-200">Email Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-appointments">Appointment Reminders</Label>
                    <Switch id="email-appointments" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-bookings">New Bookings</Label>
                    <Switch id="email-bookings" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-cancellations">Cancellations</Label>
                    <Switch id="email-cancellations" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-marketing">Marketing & Updates</Label>
                    <Switch id="email-marketing" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium dark:text-gray-200">In-App Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="app-appointments">Appointment Reminders</Label>
                    <Switch id="app-appointments" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="app-bookings">New Bookings</Label>
                    <Switch id="app-bookings" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="app-messages">Client Messages</Label>
                    <Switch id="app-messages" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="app-system">System Notifications</Label>
                    <Switch id="app-system" defaultChecked />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium dark:text-gray-200">SMS Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-appointments">Appointment Reminders</Label>
                    <Switch id="sms-appointments" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-urgent">Urgent Notifications</Label>
                    <Switch id="sms-urgent" />
                  </div>
                </div>
              </div>
              
              <Button onClick={handleNotificationSave} className="transition-all duration-300 hover:scale-105 dark:hover:shadow-[0_0_15px_rgba(52,152,219,0.5)]">Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations" className="space-y-4">
          <Card className="border-2 border-gray-100 dark:border-gray-800 shadow-md dark:shadow-[0_0_20px_rgba(0,0,0,0.2)] dark:bg-gray-900/80 transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="dark:text-gray-100">Integrations</CardTitle>
              <CardDescription className="dark:text-gray-400">
                Connect Calendoodles with other services you use.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between border border-gray-200 dark:border-gray-700 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-md flex items-center justify-center">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">G</span>
                  </div>
                  <div>
                    <p className="font-medium dark:text-gray-200">Google Calendar</p>
                    <p className="text-sm text-muted-foreground">Sync your appointments with Google Calendar</p>
                  </div>
                </div>
                <Button className="transition-all duration-300 hover:scale-105">Connect</Button>
              </div>
              
              <div className="flex items-center justify-between border border-gray-200 dark:border-gray-700 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-md flex items-center justify-center">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">O</span>
                  </div>
                  <div>
                    <p className="font-medium dark:text-gray-200">Outlook</p>
                    <p className="text-sm text-muted-foreground">Connect with your Outlook calendar</p>
                  </div>
                </div>
                <Button className="transition-all duration-300 hover:scale-105">Connect</Button>
              </div>
              
              <div className="flex items-center justify-between border border-gray-200 dark:border-gray-700 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-md flex items-center justify-center">
                    <span className="font-semibold text-green-600 dark:text-green-400">S</span>
                  </div>
                  <div>
                    <p className="font-medium dark:text-gray-200">Stripe</p>
                    <p className="text-sm text-muted-foreground">Process payments through Stripe</p>
                  </div>
                </div>
                <Button variant="outline" className="dark:border-gray-600 dark:text-gray-300 transition-all duration-300 hover:scale-105">Disconnect</Button>
              </div>
              
              <div className="flex items-center justify-between border border-gray-200 dark:border-gray-700 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-md flex items-center justify-center">
                    <span className="font-semibold text-purple-600 dark:text-purple-400">Z</span>
                  </div>
                  <div>
                    <p className="font-medium dark:text-gray-200">Zoom</p>
                    <p className="text-sm text-muted-foreground">Host virtual appointments via Zoom</p>
                  </div>
                </div>
                <Button className="transition-all duration-300 hover:scale-105">Connect</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4">
          <Card className="border-2 border-gray-100 dark:border-gray-800 shadow-md dark:shadow-[0_0_20px_rgba(0,0,0,0.2)] dark:bg-gray-900/80 transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="dark:text-gray-100">Advanced Settings</CardTitle>
              <CardDescription className="dark:text-gray-400">
                Configure technical aspects of your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex gap-2">
                  <Input id="api-key" value="sk-•••••••••••••••••••••••••••••••" readOnly className="dark:bg-gray-800 dark:border-gray-700" />
                  <Button variant="outline" className="dark:border-gray-700 dark:hover:border-gray-600 transition-all duration-300 hover:scale-105">Copy</Button>
                  <Button variant="outline" className="dark:border-gray-700 dark:hover:border-gray-600 transition-all duration-300 hover:scale-105">Regenerate</Button>
                </div>
                <p className="text-[0.8rem] text-muted-foreground">
                  Use this key to access the Calendoodles API from external applications.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Developer Mode</Label>
                    <p className="text-[0.8rem] text-muted-foreground">
                      Enable additional debugging options.
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Experimental Features</Label>
                    <p className="text-[0.8rem] text-muted-foreground">
                      Try new features before they're released.
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-red-500 mb-2">Danger Zone</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-900/20 hover:text-red-700 transition-all duration-300 hover:scale-105">
                    Export All Data
                  </Button>
                  <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-900/20 hover:text-red-700 transition-all duration-300 hover:scale-105">
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
