
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, MapPin, Briefcase, Calendar, Settings, Bell, Lock, Globe, Upload, Trash, Save, Edit, LogOut } from "lucide-react";

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    company: "Design Studio Inc.",
    bio: "UI/UX Designer with over 8 years of experience creating beautiful digital experiences. Passionate about user-centered design and accessibility.",
    website: "www.sarahjohnson.design",
    timezone: "Pacific Time (PT)",
  });
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    reminders: true,
    marketing: false,
    calendar: true,
  });
  
  const handleProfileSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved.",
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Profile</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 calendoodle-card h-fit">
          <CardHeader className="flex flex-col items-center">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src="https://i.pravatar.cc/150?img=47" alt="Profile" />
                <AvatarFallback className="bg-calendoodle-purple text-white text-2xl">
                  SJ
                </AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                size="icon"
                className="absolute bottom-0 right-0 rounded-full bg-white dark:bg-gray-800 shadow-md border-2 border-white dark:border-gray-700"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <CardTitle className="mt-4 text-xl">{profileData.name}</CardTitle>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{profileData.company}</p>
            
            <div className="w-full mt-6">
              <div className="flex items-center text-sm text-gray-700 dark:text-gray-300 mb-3">
                <Mail className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                <span className="truncate">{profileData.email}</span>
              </div>
              <div className="flex items-center text-sm text-gray-700 dark:text-gray-300 mb-3">
                <Phone className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                <span>{profileData.phone}</span>
              </div>
              <div className="flex items-center text-sm text-gray-700 dark:text-gray-300 mb-3">
                <MapPin className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                <span>{profileData.location}</span>
              </div>
              <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <Globe className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                <a
                  href={`https://${profileData.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-calendoodle-blue hover:underline"
                >
                  {profileData.website}
                </a>
              </div>
            </div>
            
            <div className="w-full mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="outline"
                className="w-full text-red-500 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </CardHeader>
        </Card>
        
        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="personal">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="space-y-6 mt-6">
              <Card className="calendoodle-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle>Personal Information</CardTitle>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Update your personal details
                    </p>
                  </div>
                  <Button
                    variant={isEditing ? "outline" : "default"}
                    onClick={() => {
                      if (isEditing) {
                        handleProfileSave();
                      } else {
                        setIsEditing(true);
                      }
                    }}
                  >
                    {isEditing ? (
                      <>
                        <Save className="h-4 w-4 mr-2" /> Save
                      </>
                    ) : (
                      <>
                        <Edit className="h-4 w-4 mr-2" /> Edit
                      </>
                    )}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="name"
                          name="name"
                          value={profileData.name}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="pl-10 calendoodle-input"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profileData.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="pl-10 calendoodle-input"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="phone"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="pl-10 calendoodle-input"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="location"
                          name="location"
                          value={profileData.location}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="pl-10 calendoodle-input"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="company"
                          name="company"
                          value={profileData.company}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="pl-10 calendoodle-input"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="website"
                          name="website"
                          value={profileData.website}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="pl-10 calendoodle-input"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={profileData.bio}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="calendoodle-input min-h-[100px]"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6 mt-6">
              <Card className="calendoodle-card">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Control how you receive notifications
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <Label className="text-base">Email Notifications</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive updates and alerts via email
                        </p>
                      </div>
                      <Switch 
                        checked={notifications.email} 
                        onCheckedChange={(checked) => handleNotificationChange("email", checked)} 
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <Label className="text-base">Push Notifications</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive updates directly to your device
                        </p>
                      </div>
                      <Switch 
                        checked={notifications.push} 
                        onCheckedChange={(checked) => handleNotificationChange("push", checked)} 
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <Label className="text-base">SMS Notifications</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive updates via text message
                        </p>
                      </div>
                      <Switch 
                        checked={notifications.sms} 
                        onCheckedChange={(checked) => handleNotificationChange("sms", checked)} 
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium mb-4">Notification Types</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="space-y-0.5">
                          <Label className="text-base">Appointment Reminders</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Get notified about upcoming appointments
                          </p>
                        </div>
                        <Switch 
                          checked={notifications.reminders} 
                          onCheckedChange={(checked) => handleNotificationChange("reminders", checked)} 
                        />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="space-y-0.5">
                          <Label className="text-base">Marketing Updates</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Receive news and special offers
                          </p>
                        </div>
                        <Switch 
                          checked={notifications.marketing} 
                          onCheckedChange={(checked) => handleNotificationChange("marketing", checked)} 
                        />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="space-y-0.5">
                          <Label className="text-base">Calendar Sync</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Sync appointments with your calendar
                          </p>
                        </div>
                        <Switch 
                          checked={notifications.calendar} 
                          onCheckedChange={(checked) => handleNotificationChange("calendar", checked)} 
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-6 mt-6">
              <Card className="calendoodle-card">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Manage your security preferences
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <Label className="text-base">Two-Factor Authentication</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Button variant="outline" className="bg-calendoodle-blue/10 text-calendoodle-blue border-calendoodle-blue/20">
                        Enable
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <Label className="text-base">Change Password</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Update your password regularly for better security
                        </p>
                      </div>
                      <Button variant="outline">
                        <Lock className="h-4 w-4 mr-2" /> Update
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <Label className="text-base">Active Sessions</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Manage devices where you're currently logged in
                        </p>
                      </div>
                      <Button variant="outline">View All</Button>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium mb-4">Data & Privacy</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="space-y-0.5">
                          <Label className="text-base">Export Your Data</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Download a copy of your data
                          </p>
                        </div>
                        <Button variant="outline">
                          <Upload className="h-4 w-4 mr-2" /> Export
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="space-y-0.5">
                          <Label className="text-base">Delete Account</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Permanently delete your account and all data
                          </p>
                        </div>
                        <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950">
                          <Trash className="h-4 w-4 mr-2" /> Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
