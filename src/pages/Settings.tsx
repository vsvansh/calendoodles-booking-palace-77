
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertCircle,
  Clock,
  Globe,
  Pencil,
  Save,
  Settings as SettingsIcon,
  Smartphone,
  Sun,
  Moon,
  Monitor,
  Languages,
  BellRing,
  UserCog,
  KeyRound,
  Calculator,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  // General settings state
  const [generalSettings, setGeneralSettings] = useState({
    timeFormat: "12h",
    dateFormat: "MM/DD/YYYY",
    timezone: "America/New_York",
    language: "en-US",
    autoApprove: true,
    bufferTime: "15",
  });
  
  // Theme settings state
  const [themeSettings, setThemeSettings] = useState({
    theme: "system",
    colorScheme: "blue",
    animations: true,
    reducedMotion: false,
    fontSize: "normal",
  });
  
  // Business settings state
  const [businessSettings, setBusinessSettings] = useState({
    businessName: "Calendoodles",
    businessEmail: "contact@calendoodles.com",
    businessPhone: "+1 (555) 123-4567",
    businessAddress: "123 Appointment St, Scheduling City, CA 94105",
    businessLogo: "",
    businessWebsite: "www.calendoodles.com",
    currency: "USD",
    workHours: {
      mondayStart: "09:00",
      mondayEnd: "17:00",
      tuesdayStart: "09:00",
      tuesdayEnd: "17:00",
      wednesdayStart: "09:00",
      wednesdayEnd: "17:00",
      thursdayStart: "09:00",
      thursdayEnd: "17:00",
      fridayStart: "09:00",
      fridayEnd: "17:00",
      saturdayStart: "",
      saturdayEnd: "",
      sundayStart: "",
      sundayEnd: "",
    },
    workDays: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false,
    },
  });
  
  // Integration settings state
  const [integrationSettings, setIntegrationSettings] = useState({
    googleCalendar: false,
    outlook: false,
    zoom: false,
    stripe: true,
    paypal: false,
    mailchimp: false,
  });
  
  const handleSaveSettings = () => {
    setIsEditing(false);
    toast({
      title: "Settings updated",
      description: "Your settings have been saved successfully.",
    });
  };
  
  const handleGeneralSettingsChange = (key: string, value: any) => {
    setGeneralSettings(prev => ({ ...prev, [key]: value }));
  };
  
  const handleThemeSettingsChange = (key: string, value: any) => {
    setThemeSettings(prev => ({ ...prev, [key]: value }));
  };
  
  const handleBusinessSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBusinessSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handleWorkHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBusinessSettings(prev => ({
      ...prev,
      workHours: {
        ...prev.workHours,
        [name]: value,
      }
    }));
  };
  
  const handleWorkDaysChange = (day: string, value: boolean) => {
    setBusinessSettings(prev => ({
      ...prev,
      workDays: {
        ...prev.workDays,
        [day]: value,
      }
    }));
  };
  
  const handleIntegrationToggle = (key: string, value: boolean) => {
    setIntegrationSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Settings</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Configure your application preferences
          </p>
        </div>
        <Button
          variant={isEditing ? "outline" : "default"}
          onClick={() => {
            if (isEditing) {
              handleSaveSettings();
            } else {
              setIsEditing(true);
            }
          }}
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" /> Save Changes
            </>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" /> Edit Settings
            </>
          )}
        </Button>
      </div>
      
      <Tabs defaultValue="general">
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 mb-6">
          <TabsTrigger value="general">
            <SettingsIcon className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Sun className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="business">
            <UserCog className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Business</span>
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Globe className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Integrations</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="calendoodle-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-calendoodle-blue" />
                  Time & Date
                </CardTitle>
                <CardDescription>
                  Configure how time and date are displayed in the application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="timeFormat">Time Format</Label>
                  <Select
                    value={generalSettings.timeFormat}
                    onValueChange={(value) => handleGeneralSettingsChange("timeFormat", value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger id="timeFormat" className="calendoodle-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12-hour (1:00 PM)</SelectItem>
                      <SelectItem value="24h">24-hour (13:00)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select
                    value={generalSettings.dateFormat}
                    onValueChange={(value) => handleGeneralSettingsChange("dateFormat", value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger id="dateFormat" className="calendoodle-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={generalSettings.timezone}
                    onValueChange={(value) => handleGeneralSettingsChange("timezone", value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger id="timezone" className="calendoodle-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="Europe/London">GMT/UTC (GMT)</SelectItem>
                      <SelectItem value="Europe/Paris">Central European Time (CET)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Japan Standard Time (JST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            <Card className="calendoodle-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-calendoodle-purple" />
                  Language & Region
                </CardTitle>
                <CardDescription>
                  Configure language and regional preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={generalSettings.language}
                    onValueChange={(value) => handleGeneralSettingsChange("language", value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger id="language" className="calendoodle-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="en-GB">English (UK)</SelectItem>
                      <SelectItem value="fr-FR">Français</SelectItem>
                      <SelectItem value="es-ES">Español</SelectItem>
                      <SelectItem value="de-DE">Deutsch</SelectItem>
                      <SelectItem value="ja-JP">日本語</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    defaultValue="USD"
                    disabled={!isEditing}
                  >
                    <SelectTrigger id="currency" className="calendoodle-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">US Dollar (USD)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                      <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                      <SelectItem value="JPY">Japanese Yen (JPY)</SelectItem>
                      <SelectItem value="CAD">Canadian Dollar (CAD)</SelectItem>
                      <SelectItem value="AUD">Australian Dollar (AUD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="firstDayOfWeek">First Day of Week</Label>
                  <Select
                    defaultValue="sunday"
                    disabled={!isEditing}
                  >
                    <SelectTrigger id="firstDayOfWeek" className="calendoodle-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sunday">Sunday</SelectItem>
                      <SelectItem value="monday">Monday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            <Card className="calendoodle-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-calendoodle-orange" />
                  Appointment Settings
                </CardTitle>
                <CardDescription>
                  Configure how appointments are handled
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoApprove">Auto-approve appointments</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Automatically approve new appointment requests
                    </p>
                  </div>
                  <Switch
                    id="autoApprove"
                    checked={generalSettings.autoApprove}
                    onCheckedChange={(checked) => handleGeneralSettingsChange("autoApprove", checked)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bufferTime">Buffer Time Between Appointments</Label>
                  <Select
                    value={generalSettings.bufferTime}
                    onValueChange={(value) => handleGeneralSettingsChange("bufferTime", value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger id="bufferTime" className="calendoodle-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">None</SelectItem>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="10">10 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cancelationWindow">Cancelation Window</Label>
                  <Select defaultValue="24" disabled={!isEditing}>
                    <SelectTrigger id="cancelationWindow" className="calendoodle-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hour before</SelectItem>
                      <SelectItem value="2">2 hours before</SelectItem>
                      <SelectItem value="6">6 hours before</SelectItem>
                      <SelectItem value="12">12 hours before</SelectItem>
                      <SelectItem value="24">24 hours before</SelectItem>
                      <SelectItem value="48">48 hours before</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            <Card className="calendoodle-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BellRing className="h-5 w-5 text-calendoodle-green" />
                  Notifications
                </CardTitle>
                <CardDescription>
                  Configure notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Send notifications to email
                      </p>
                    </div>
                    <Switch defaultChecked disabled={!isEditing} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Send notifications to browser
                      </p>
                    </div>
                    <Switch defaultChecked disabled={!isEditing} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Send notifications via text message
                      </p>
                    </div>
                    <Switch disabled={!isEditing} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Reminder Timing</Label>
                    </div>
                    <Select defaultValue="24" disabled={!isEditing}>
                      <SelectTrigger className="w-[180px] calendoodle-input">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 hour before</SelectItem>
                        <SelectItem value="2">2 hours before</SelectItem>
                        <SelectItem value="12">12 hours before</SelectItem>
                        <SelectItem value="24">24 hours before</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="appearance">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="calendoodle-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sun className="h-5 w-5 text-calendoodle-orange" />
                  Theme
                </CardTitle>
                <CardDescription>
                  Customize the appearance of the application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme Mode</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant={themeSettings.theme === "light" ? "default" : "outline"}
                      className={`flex flex-col items-center justify-center py-4 px-0 h-auto ${themeSettings.theme !== "light" ? "hover:bg-gray-100 dark:hover:bg-gray-800" : ""}`}
                      onClick={() => handleThemeSettingsChange("theme", "light")}
                      disabled={!isEditing}
                    >
                      <Sun className="h-5 w-5 mb-2" />
                      <span>Light</span>
                    </Button>
                    <Button
                      variant={themeSettings.theme === "dark" ? "default" : "outline"}
                      className={`flex flex-col items-center justify-center py-4 px-0 h-auto ${themeSettings.theme !== "dark" ? "hover:bg-gray-100 dark:hover:bg-gray-800" : ""}`}
                      onClick={() => handleThemeSettingsChange("theme", "dark")}
                      disabled={!isEditing}
                    >
                      <Moon className="h-5 w-5 mb-2" />
                      <span>Dark</span>
                    </Button>
                    <Button
                      variant={themeSettings.theme === "system" ? "default" : "outline"}
                      className={`flex flex-col items-center justify-center py-4 px-0 h-auto ${themeSettings.theme !== "system" ? "hover:bg-gray-100 dark:hover:bg-gray-800" : ""}`}
                      onClick={() => handleThemeSettingsChange("theme", "system")}
                      disabled={!isEditing}
                    >
                      <Monitor className="h-5 w-5 mb-2" />
                      <span>System</span>
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Color Scheme</Label>
                  <div className="grid grid-cols-4 gap-2">
                    <div
                      className={`h-10 rounded-md cursor-pointer flex items-center justify-center transition-all ${
                        themeSettings.colorScheme === "blue"
                          ? "ring-2 ring-calendoodle-blue ring-offset-2"
                          : "hover:opacity-80"
                      }`}
                      style={{ backgroundColor: "#3498db" }}
                      onClick={() => handleThemeSettingsChange("colorScheme", "blue")}
                    ></div>
                    <div
                      className={`h-10 rounded-md cursor-pointer flex items-center justify-center transition-all ${
                        themeSettings.colorScheme === "purple"
                          ? "ring-2 ring-calendoodle-purple ring-offset-2"
                          : "hover:opacity-80"
                      }`}
                      style={{ backgroundColor: "#9b59b6" }}
                      onClick={() => handleThemeSettingsChange("colorScheme", "purple")}
                    ></div>
                    <div
                      className={`h-10 rounded-md cursor-pointer flex items-center justify-center transition-all ${
                        themeSettings.colorScheme === "green"
                          ? "ring-2 ring-calendoodle-green ring-offset-2"
                          : "hover:opacity-80"
                      }`}
                      style={{ backgroundColor: "#2ecc71" }}
                      onClick={() => handleThemeSettingsChange("colorScheme", "green")}
                    ></div>
                    <div
                      className={`h-10 rounded-md cursor-pointer flex items-center justify-center transition-all ${
                        themeSettings.colorScheme === "orange"
                          ? "ring-2 ring-calendoodle-orange ring-offset-2"
                          : "hover:opacity-80"
                      }`}
                      style={{ backgroundColor: "#f39c12" }}
                      onClick={() => handleThemeSettingsChange("colorScheme", "orange")}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Font Size</Label>
                  <Select
                    value={themeSettings.fontSize}
                    onValueChange={(value) => handleThemeSettingsChange("fontSize", value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="calendoodle-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Animations</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Use animations throughout the interface
                    </p>
                  </div>
                  <Switch 
                    checked={themeSettings.animations} 
                    onCheckedChange={(checked) => handleThemeSettingsChange("animations", checked)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Reduced Motion</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Minimize non-essential animations
                    </p>
                  </div>
                  <Switch 
                    checked={themeSettings.reducedMotion} 
                    onCheckedChange={(checked) => handleThemeSettingsChange("reducedMotion", checked)}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card className="calendoodle-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-calendoodle-blue" />
                  Interface Preferences
                </CardTitle>
                <CardDescription>
                  Control how the application interface behaves
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Compact View</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Show more content with less spacing
                    </p>
                  </div>
                  <Switch defaultChecked={false} disabled={!isEditing} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Tooltips</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Display helpful tooltips when hovering elements
                    </p>
                  </div>
                  <Switch defaultChecked={true} disabled={!isEditing} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sidebar Collapsed by Default</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Start with a collapsed sidebar for more space
                    </p>
                  </div>
                  <Switch defaultChecked={false} disabled={!isEditing} />
                </div>
                
                <div className="space-y-2">
                  <Label>Default Calendar View</Label>
                  <Select defaultValue="month" disabled={!isEditing}>
                    <SelectTrigger className="calendoodle-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">Month</SelectItem>
                      <SelectItem value="week">Week</SelectItem>
                      <SelectItem value="day">Day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="business">
          <Card className="calendoodle-card">
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>
                Update your business details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4 md:col-span-2">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      name="businessName"
                      placeholder="Your Business Name"
                      value={businessSettings.businessName}
                      onChange={handleBusinessSettingsChange}
                      disabled={!isEditing}
                      className="calendoodle-input"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="businessEmail">Business Email</Label>
                  <Input
                    id="businessEmail"
                    name="businessEmail"
                    type="email"
                    placeholder="contact@yourbusiness.com"
                    value={businessSettings.businessEmail}
                    onChange={handleBusinessSettingsChange}
                    disabled={!isEditing}
                    className="calendoodle-input"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="businessPhone">Business Phone</Label>
                  <Input
                    id="businessPhone"
                    name="businessPhone"
                    placeholder="+1 (555) 123-4567"
                    value={businessSettings.businessPhone}
                    onChange={handleBusinessSettingsChange}
                    disabled={!isEditing}
                    className="calendoodle-input"
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="businessAddress">Business Address</Label>
                  <Textarea
                    id="businessAddress"
                    name="businessAddress"
                    placeholder="Your business address"
                    value={businessSettings.businessAddress}
                    onChange={handleBusinessSettingsChange}
                    disabled={!isEditing}
                    className="calendoodle-input"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="businessWebsite">Business Website</Label>
                  <Input
                    id="businessWebsite"
                    name="businessWebsite"
                    placeholder="www.yourbusiness.com"
                    value={businessSettings.businessWebsite}
                    onChange={handleBusinessSettingsChange}
                    disabled={!isEditing}
                    className="calendoodle-input"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="businessCurrency">Currency</Label>
                  <Select
                    defaultValue="USD"
                    disabled={!isEditing}
                  >
                    <SelectTrigger id="businessCurrency" className="calendoodle-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">US Dollar (USD)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                      <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                      <SelectItem value="CAD">Canadian Dollar (CAD)</SelectItem>
                      <SelectItem value="AUD">Australian Dollar (AUD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mt-8 border-t dark:border-gray-700 pt-6">
                <h3 className="text-lg font-medium mb-4">Working Hours</h3>
                
                <div className="space-y-4">
                  {/* Monday */}
                  <div className="flex items-center justify-between">
                    <div className="w-24">
                      <Label className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={businessSettings.workDays.monday}
                          onChange={(e) => handleWorkDaysChange("monday", e.target.checked)}
                          disabled={!isEditing}
                        />
                        Monday
                      </Label>
                    </div>
                    <div className="flex items-center gap-2 flex-1">
                      <Input
                        type="time"
                        name="mondayStart"
                        value={businessSettings.workHours.mondayStart}
                        onChange={handleWorkHoursChange}
                        disabled={!isEditing || !businessSettings.workDays.monday}
                        className="calendoodle-input"
                      />
                      <span className="mx-1">-</span>
                      <Input
                        type="time"
                        name="mondayEnd"
                        value={businessSettings.workHours.mondayEnd}
                        onChange={handleWorkHoursChange}
                        disabled={!isEditing || !businessSettings.workDays.monday}
                        className="calendoodle-input"
                      />
                    </div>
                  </div>
                  
                  {/* Tuesday */}
                  <div className="flex items-center justify-between">
                    <div className="w-24">
                      <Label className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={businessSettings.workDays.tuesday}
                          onChange={(e) => handleWorkDaysChange("tuesday", e.target.checked)}
                          disabled={!isEditing}
                        />
                        Tuesday
                      </Label>
                    </div>
                    <div className="flex items-center gap-2 flex-1">
                      <Input
                        type="time"
                        name="tuesdayStart"
                        value={businessSettings.workHours.tuesdayStart}
                        onChange={handleWorkHoursChange}
                        disabled={!isEditing || !businessSettings.workDays.tuesday}
                        className="calendoodle-input"
                      />
                      <span className="mx-1">-</span>
                      <Input
                        type="time"
                        name="tuesdayEnd"
                        value={businessSettings.workHours.tuesdayEnd}
                        onChange={handleWorkHoursChange}
                        disabled={!isEditing || !businessSettings.workDays.tuesday}
                        className="calendoodle-input"
                      />
                    </div>
                  </div>
                  
                  {/* Wednesday */}
                  <div className="flex items-center justify-between">
                    <div className="w-24">
                      <Label className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={businessSettings.workDays.wednesday}
                          onChange={(e) => handleWorkDaysChange("wednesday", e.target.checked)}
                          disabled={!isEditing}
                        />
                        Wednesday
                      </Label>
                    </div>
                    <div className="flex items-center gap-2 flex-1">
                      <Input
                        type="time"
                        name="wednesdayStart"
                        value={businessSettings.workHours.wednesdayStart}
                        onChange={handleWorkHoursChange}
                        disabled={!isEditing || !businessSettings.workDays.wednesday}
                        className="calendoodle-input"
                      />
                      <span className="mx-1">-</span>
                      <Input
                        type="time"
                        name="wednesdayEnd"
                        value={businessSettings.workHours.wednesdayEnd}
                        onChange={handleWorkHoursChange}
                        disabled={!isEditing || !businessSettings.workDays.wednesday}
                        className="calendoodle-input"
                      />
                    </div>
                  </div>
                  
                  {/* Thursday */}
                  <div className="flex items-center justify-between">
                    <div className="w-24">
                      <Label className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={businessSettings.workDays.thursday}
                          onChange={(e) => handleWorkDaysChange("thursday", e.target.checked)}
                          disabled={!isEditing}
                        />
                        Thursday
                      </Label>
                    </div>
                    <div className="flex items-center gap-2 flex-1">
                      <Input
                        type="time"
                        name="thursdayStart"
                        value={businessSettings.workHours.thursdayStart}
                        onChange={handleWorkHoursChange}
                        disabled={!isEditing || !businessSettings.workDays.thursday}
                        className="calendoodle-input"
                      />
                      <span className="mx-1">-</span>
                      <Input
                        type="time"
                        name="thursdayEnd"
                        value={businessSettings.workHours.thursdayEnd}
                        onChange={handleWorkHoursChange}
                        disabled={!isEditing || !businessSettings.workDays.thursday}
                        className="calendoodle-input"
                      />
                    </div>
                  </div>
                  
                  {/* Friday */}
                  <div className="flex items-center justify-between">
                    <div className="w-24">
                      <Label className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={businessSettings.workDays.friday}
                          onChange={(e) => handleWorkDaysChange("friday", e.target.checked)}
                          disabled={!isEditing}
                        />
                        Friday
                      </Label>
                    </div>
                    <div className="flex items-center gap-2 flex-1">
                      <Input
                        type="time"
                        name="fridayStart"
                        value={businessSettings.workHours.fridayStart}
                        onChange={handleWorkHoursChange}
                        disabled={!isEditing || !businessSettings.workDays.friday}
                        className="calendoodle-input"
                      />
                      <span className="mx-1">-</span>
                      <Input
                        type="time"
                        name="fridayEnd"
                        value={businessSettings.workHours.fridayEnd}
                        onChange={handleWorkHoursChange}
                        disabled={!isEditing || !businessSettings.workDays.friday}
                        className="calendoodle-input"
                      />
                    </div>
                  </div>
                  
                  {/* Saturday */}
                  <div className="flex items-center justify-between">
                    <div className="w-24">
                      <Label className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={businessSettings.workDays.saturday}
                          onChange={(e) => handleWorkDaysChange("saturday", e.target.checked)}
                          disabled={!isEditing}
                        />
                        Saturday
                      </Label>
                    </div>
                    <div className="flex items-center gap-2 flex-1">
                      <Input
                        type="time"
                        name="saturdayStart"
                        value={businessSettings.workHours.saturdayStart}
                        onChange={handleWorkHoursChange}
                        disabled={!isEditing || !businessSettings.workDays.saturday}
                        className="calendoodle-input"
                      />
                      <span className="mx-1">-</span>
                      <Input
                        type="time"
                        name="saturdayEnd"
                        value={businessSettings.workHours.saturdayEnd}
                        onChange={handleWorkHoursChange}
                        disabled={!isEditing || !businessSettings.workDays.saturday}
                        className="calendoodle-input"
                      />
                    </div>
                  </div>
                  
                  {/* Sunday */}
                  <div className="flex items-center justify-between">
                    <div className="w-24">
                      <Label className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={businessSettings.workDays.sunday}
                          onChange={(e) => handleWorkDaysChange("sunday", e.target.checked)}
                          disabled={!isEditing}
                        />
                        Sunday
                      </Label>
                    </div>
                    <div className="flex items-center gap-2 flex-1">
                      <Input
                        type="time"
                        name="sundayStart"
                        value={businessSettings.workHours.sundayStart}
                        onChange={handleWorkHoursChange}
                        disabled={!isEditing || !businessSettings.workDays.sunday}
                        className="calendoodle-input"
                      />
                      <span className="mx-1">-</span>
                      <Input
                        type="time"
                        name="sundayEnd"
                        value={businessSettings.workHours.sundayEnd}
                        onChange={handleWorkHoursChange}
                        disabled={!isEditing || !businessSettings.workDays.sunday}
                        className="calendoodle-input"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="calendoodle-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-blue-500" />
                  Calendar Integrations
                </CardTitle>
                <CardDescription>
                  Connect your calendars for synchronization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base flex items-center">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" fill="currentColor">
                        <path d="M21.56 10.738c0-.655-.069-1.158-.173-1.674h-9.305v3.037h5.443c-.137.993-.827 2.01-1.97 2.62v2.127h3.103c1.826-1.688 2.902-4.174 2.902-6.11z" fill="#4285F4" />
                        <path d="M12.083 21.75c2.62 0 4.865-.841 6.475-2.303l-3.103-2.358c-.862.565-1.97.972-3.372.972-2.572 0-4.762-1.757-5.55-4.106H3.473v2.438c1.69 3.313 5.132 5.357 8.61 5.357z" fill="#34A853" />
                        <path d="M6.533 13.955c-.207-.62-.31-1.282-.31-1.955s.103-1.338.31-1.955V7.605H3.473a9.563 9.563 0 000 8.79l3.06-2.44z" fill="#FBBC05" />
                        <path d="M12.083 5.925c1.447 0 2.734.482 3.75 1.434l2.734-2.734C16.834 2.84 14.589 2 12.082 2 8.603 2 5.162 4.044 3.473 7.605l3.06 2.344c.787-2.35 2.977-4.023 5.55-4.023z" fill="#EA4335" />
                      </svg>
                      Google Calendar
                    </Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Sync with your Google Calendar
                    </p>
                  </div>
                  <Switch 
                    checked={integrationSettings.googleCalendar} 
                    onCheckedChange={(checked) => handleIntegrationToggle("googleCalendar", checked)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base flex items-center">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" fill="currentColor">
                        <path d="M7.88 12.04q0 .45-.11.87-.1.41-.33.74-.22.33-.58.52-.37.2-.87.2t-.85-.2q-.35-.21-.57-.55-.22-.33-.33-.75-.1-.42-.1-.86t.1-.87q.1-.43.34-.76.22-.34.59-.54.36-.2.87-.2t.86.2q.35.21.57.55.22.34.31.77.1.43.1.88zM24 12v9.38q0 .46-.33.8-.33.32-.8.32H7.13q-.46 0-.8-.33-.32-.33-.32-.8V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h6.5V2.55q0-.44.3-.75.3-.3.75-.3h12.9q.44 0 .75.3.3.3.3.75V10.85l1.24.72h-.01q.1.07.18.18.07.12.07.25zm-6-8.25v3h3v-3zm0 4.5v3h3v-3zm0 4.5v1.83l3.05-1.83zm-5.25-9v3h3.75v-3zm0 4.5v3h3.75v-3zm0 4.5v2.03l2.41 1.5 1.34-.8v-2.73zM9 3.75V6h2l.13.01.12.04v-2.3zM5.98 15.98q.9 0 1.6-.3.7-.32 1.19-.86.48-.55.73-1.28.25-.74.25-1.61 0-.83-.25-1.55-.24-.71-.71-1.24t-1.15-.83q-.68-.3-1.55-.3-.92 0-1.64.3-.71.3-1.2.85-.5.54-.75 1.3-.25.74-.25 1.63 0 .85.26 1.56.26.72.74 1.23.48.52 1.17.81.69.3 1.56.3zM7.5 21h12.39L12 16.08V17q0 .41-.3.7-.29.3-.7.3H7.5zm15-.13v-7.24l-5.9 3.54Z" fill="#1e88e5"/>
                      </svg>
                      Microsoft Outlook
                    </Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Sync with your Outlook Calendar
                    </p>
                  </div>
                  <Switch 
                    checked={integrationSettings.outlook} 
                    onCheckedChange={(checked) => handleIntegrationToggle("outlook", checked)}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card className="calendoodle-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-blue-400" />
                  Video Conferencing
                </CardTitle>
                <CardDescription>
                  Connect your video conferencing services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base flex items-center">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" fill="currentColor">
                        <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm5.797 17.28c-.11.15-.22.27-.33.37a6.67 6.67 0 0 1-.55.49c-1.1.82-2.86 1.21-4.92 1.21-2.05 0-3.8-.39-4.9-1.21-.24-.18-.41-.34-.55-.49-.12-.1-.24-.23-.33-.37a2.4 2.4 0 0 1-.14-.32.86.86 0 0 1-.06-.36c0-.15.03-.28.08-.41a.85.85 0 0 1 .36-.47c.15-.1.32-.15.52-.15.16 0 .31.04.45.11.12.07.24.17.35.3a.41.41 0 0 1 .07-.12c.1-.11.25-.18.44-.18.32 0 .72.18 1.2.53.26.19.54.41.84.66.33.28.63.42.89.42.26 0 .56-.14.88-.42.31-.25.58-.47.85-.66.48-.35.88-.53 1.2-.53.19 0 .34.07.44.18.04.04.06.08.07.12.11-.13.23-.23.35-.3.14-.07.29-.11.45-.11.2 0 .37.05.52.15.2.14.32.29.36.47.05.13.08.26.08.41 0 .13-.01.25-.06.36-.04.1-.08.2-.14.32zm-1.07-8.09c-.25-.23-.57-.35-.98-.35-.42 0-.77.11-1.03.35-.27.23-.4.55-.4.95 0 .4.13.73.4.95.26.23.61.35 1.03.35.41 0 .73-.12.98-.35.26-.23.39-.55.39-.95 0-.4-.13-.72-.39-.95zm-5.53-.35c-.42 0-.77.11-1.03.35-.26.25-.39.56-.39.95 0 .4.13.73.39.95.26.23.61.35 1.03.35.42 0 .75-.12 1-.35.25-.23.38-.55.38-.95 0-.4-.13-.72-.38-.95-.25-.24-.58-.35-1-.35zm2.93 8.81c-1.62 0-2.93-1.31-2.93-2.93 0-1.62 1.31-2.93 2.93-2.93 1.62 0 2.93 1.31 2.93 2.93 0 1.62-1.31 2.93-2.93 2.93z" fill="#2d8cff"/>
                      </svg>
                      Zoom
                    </Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Generate Zoom meeting links
                    </p>
                  </div>
                  <Switch 
                    checked={integrationSettings.zoom} 
                    onCheckedChange={(checked) => handleIntegrationToggle("zoom", checked)}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card className="calendoodle-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <KeyRound className="h-5 w-5 text-purple-500" />
                  API & Integrations
                </CardTitle>
                <CardDescription>
                  Manage API keys and integrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="apiKey">API Key</Label>
                    <div className="w-full flex">
                      <Input
                        id="apiKey"
                        type="password"
                        defaultValue="sk_test_123456789012345678901234"
                        disabled={true}
                        className="calendoodle-input rounded-r-none flex-1"
                      />
                      <Button className="rounded-l-none">Copy</Button>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Use this to access the Calendoodle API
                    </p>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-2" disabled={!isEditing}>
                  <KeyRound className="h-4 w-4 mr-2" />
                  Generate New API Key
                </Button>
              </CardContent>
            </Card>
            
            <Card className="calendoodle-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-green-500" />
                  Payment Providers
                </CardTitle>
                <CardDescription>
                  Connect payment processing services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base flex items-center">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" fill="currentColor">
                        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z" fill="#6772E5" fill-rule="evenodd"/>
                      </svg>
                      Stripe
                    </Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Process payments with Stripe
                    </p>
                  </div>
                  <Switch 
                    checked={integrationSettings.stripe} 
                    onCheckedChange={(checked) => handleIntegrationToggle("stripe", checked)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base flex items-center">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" fill="currentColor">
                        <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 0 0-.794.68l-.04.22-.63 4.028-.03.11a.809.809 0 0 1-.794.68h-2.52c-.647 0-1.18-.533-1.08-1.17l1.08-6.85a.804.804 0 0 1 .795-.68h1.5c4.255 0 7.406-1.73 8.347-6.737.033-.176.063-.348.09-.514" fill="#27346A"/>
                        <path d="M9.417 7.642a.9.9 0 0 1 .89-.76h5.705c.347 0 .682.033 1.002.08a5.564 5.564 0 0 1 .814.22 4.114 4.114 0 0 1 .652.3c.153-.978.087-1.645-.21-2.248-1.095-2.242-3.83-2.97-6.98-2.97H6.098c-.646 0-1.202.533-1.303 1.17L2.05 15.474c-.076.49.29.94.795.94h3.848l.992-6.29-.02-.17c.106-.45.54-.784 1.057-.784h.695v-1.555z" fill="#27346A"/>
                      </svg>
                      PayPal
                    </Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Accept payments via PayPal
                    </p>
                  </div>
                  <Switch 
                    checked={integrationSettings.paypal} 
                    onCheckedChange={(checked) => handleIntegrationToggle("paypal", checked)}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card className="calendoodle-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Languages className="h-5 w-5 text-red-500" />
                  Email Marketing
                </CardTitle>
                <CardDescription>
                  Connect email marketing services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base flex items-center">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" fill="currentColor">
                        <path d="M22.435 11.084c-.292.357-2.196 2.587-6.199 3.871-3.996 1.278-4.556.506-4.618.05-.111-.828.582-1.587 3.393-2.644 3.06-1.15 3.93-1.66 5.15-2.92 1.078-1.112 1.086-2.394.927-3.035C19.79.89 12.538 1.33 9.394 3.487c-3.146 2.158-3.2 5.266-2.963 6.567.236 1.303 1.06 3.12-.37 4.479-1.43 1.357-3.296.85-4.073.236C.882 13.86.14 11.956.433 9.761.723 7.567 2.12 4.932 5.33 2.866 10.88-.76 19.696.684 21.552 5.866c.328.907.716 4.934-1.185 5.865a11.982 11.982 0 0 1-1.931-.647" fill="#E01B22"/>
                      </svg>
                      Mailchimp
                    </Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Sync contacts with Mailchimp
                    </p>
                  </div>
                  <Switch 
                    checked={integrationSettings.mailchimp} 
                    onCheckedChange={(checked) => handleIntegrationToggle("mailchimp", checked)}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
