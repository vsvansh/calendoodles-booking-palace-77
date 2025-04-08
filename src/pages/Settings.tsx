
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();
  const [theme, setTheme] = useState('system');
  const [language, setLanguage] = useState('english');
  
  const handleGeneralSave = () => {
    toast({
      title: 'Settings saved',
      description: 'Your general settings have been updated.',
    });
  };
  
  const handleAppearanceSave = () => {
    toast({
      title: 'Appearance updated',
      description: `Theme set to ${theme}.`,
    });
  };
  
  const handleNotificationSave = () => {
    toast({
      title: 'Notification preferences saved',
      description: 'Your notification settings have been updated.',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your application settings and preferences.
        </p>
      </div>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
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
                  <SelectContent>
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
                  <SelectContent>
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
                  <SelectContent>
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
                  <SelectContent>
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
                  <SelectContent>
                    <SelectItem value="sunday">Sunday</SelectItem>
                    <SelectItem value="monday">Monday</SelectItem>
                    <SelectItem value="saturday">Saturday</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handleGeneralSave}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
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
                  <SelectContent>
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
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Compact View</Label>
                  <p className="text-[0.8rem] text-muted-foreground">
                    Use a more compact layout throughout the application.
                  </p>
                </div>
                <Switch />
              </div>
              
              <div className="space-y-2">
                <Label>Accent Color</Label>
                <div className="flex gap-2">
                  <Button className="h-8 w-8 rounded-full bg-purple-500" variant="outline" />
                  <Button className="h-8 w-8 rounded-full bg-blue-500" variant="outline" />
                  <Button className="h-8 w-8 rounded-full bg-green-500" variant="outline" />
                  <Button className="h-8 w-8 rounded-full bg-red-500" variant="outline" />
                  <Button className="h-8 w-8 rounded-full bg-orange-500" variant="outline" />
                  <Button className="h-8 w-8 rounded-full bg-pink-500" variant="outline" />
                </div>
              </div>
              
              <Button onClick={handleAppearanceSave}>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
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
                <h3 className="text-lg font-medium">In-App Notifications</h3>
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
                <h3 className="text-lg font-medium">SMS Notifications</h3>
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
              
              <Button onClick={handleNotificationSave}>Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>
                Connect Calendoodles with other services you use.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between border p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-md flex items-center justify-center">
                    <span className="font-semibold text-blue-600">G</span>
                  </div>
                  <div>
                    <p className="font-medium">Google Calendar</p>
                    <p className="text-sm text-muted-foreground">Sync your appointments with Google Calendar</p>
                  </div>
                </div>
                <Button>Connect</Button>
              </div>
              
              <div className="flex items-center justify-between border p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-md flex items-center justify-center">
                    <span className="font-semibold text-blue-600">O</span>
                  </div>
                  <div>
                    <p className="font-medium">Outlook</p>
                    <p className="text-sm text-muted-foreground">Connect with your Outlook calendar</p>
                  </div>
                </div>
                <Button>Connect</Button>
              </div>
              
              <div className="flex items-center justify-between border p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-green-100 rounded-md flex items-center justify-center">
                    <span className="font-semibold text-green-600">S</span>
                  </div>
                  <div>
                    <p className="font-medium">Stripe</p>
                    <p className="text-sm text-muted-foreground">Process payments through Stripe</p>
                  </div>
                </div>
                <Button variant="outline">Disconnect</Button>
              </div>
              
              <div className="flex items-center justify-between border p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-purple-100 rounded-md flex items-center justify-center">
                    <span className="font-semibold text-purple-600">Z</span>
                  </div>
                  <div>
                    <p className="font-medium">Zoom</p>
                    <p className="text-sm text-muted-foreground">Host virtual appointments via Zoom</p>
                  </div>
                </div>
                <Button>Connect</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Configure technical aspects of your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex gap-2">
                  <Input id="api-key" value="sk-•••••••••••••••••••••••••••••••" readOnly />
                  <Button variant="outline">Copy</Button>
                  <Button variant="outline">Regenerate</Button>
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
              
              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium text-red-500 mb-2">Danger Zone</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700">
                    Export All Data
                  </Button>
                  <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700">
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
