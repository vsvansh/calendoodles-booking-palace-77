
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Calendar, Users, Bell, Shield, CreditCard, Palette, Globe, VideoIcon, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"], {
    required_error: "Please select a theme.",
  }),
  font: z.enum(["inter", "manrope", "system"], {
    required_error: "Please select a font.",
  }),
  color: z.enum(["purple", "blue", "green", "orange", "pink"], {
    required_error: "Please select a color.",
  }),
});

const notificationsFormSchema = z.object({
  emailNotifications: z.boolean().default(false).optional(),
  smsNotifications: z.boolean().default(false).optional(),
  appNotifications: z.boolean().default(false).optional(),
  marketingEmails: z.boolean().default(false).optional(),
  securityEmails: z.boolean().default(false).optional(),
});

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z.string().email(),
  bio: z.string().max(160).optional(),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
});

const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
});

const displayFormSchema = z.object({
  timezone: z.string({
    required_error: "Please select a timezone.",
  }),
  language: z.string({
    required_error: "Please select a language.",
  }),
  dateFormat: z.string({
    required_error: "Please select a date format.",
  }),
  timeFormat: z.string({
    required_error: "Please select a time format.",
  }),
});

const privacyFormSchema = z.object({
  profileVisibility: z.enum(["public", "private", "contacts"], {
    required_error: "Please select profile visibility.",
  }),
  activityStatus: z.boolean().default(false).optional(),
  readReceipts: z.boolean().default(false).optional(),
  dataUsage: z.boolean().default(false).optional(),
});

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;
type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;
type ProfileFormValues = z.infer<typeof profileFormSchema>;
type AccountFormValues = z.infer<typeof accountFormSchema>;
type DisplayFormValues = z.infer<typeof displayFormSchema>;
type PrivacyFormValues = z.infer<typeof privacyFormSchema>;

const Settings = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultAppearanceValues: Partial<AppearanceFormValues> = {
    theme: "system",
    font: "inter",
    color: "purple",
  };

  const defaultNotificationsValues: Partial<NotificationsFormValues> = {
    emailNotifications: true,
    smsNotifications: false,
    appNotifications: true,
    marketingEmails: false,
    securityEmails: true,
  };

  const defaultProfileValues: Partial<ProfileFormValues> = {
    username: "johndoe",
    email: "john.doe@example.com",
    bio: "Hair stylist with 5+ years of experience specializing in color and cutting.",
  };

  const defaultAccountValues: Partial<AccountFormValues> = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "555-123-4567",
    address: "123 Main St",
    city: "Anytown",
    state: "NY",
    zipCode: "12345",
  };

  const defaultDisplayValues: Partial<DisplayFormValues> = {
    timezone: "America/New_York",
    language: "en-US",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
  };

  const defaultPrivacyValues: Partial<PrivacyFormValues> = {
    profileVisibility: "public",
    activityStatus: true,
    readReceipts: true,
    dataUsage: false,
  };

  const appearanceForm = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: defaultAppearanceValues,
  });

  const notificationsForm = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: defaultNotificationsValues,
  });

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: defaultProfileValues,
  });

  const accountForm = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: defaultAccountValues,
  });

  const displayForm = useForm<DisplayFormValues>({
    resolver: zodResolver(displayFormSchema),
    defaultValues: defaultDisplayValues,
  });

  const privacyForm = useForm<PrivacyFormValues>({
    resolver: zodResolver(privacyFormSchema),
    defaultValues: defaultPrivacyValues,
  });

  function onAppearanceSubmit(data: AppearanceFormValues) {
    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: "Appearance settings updated!",
        description: "Your appearance settings have been updated successfully.",
      });
      setIsSubmitting(false);
    }, 1000);
  }

  function onNotificationsSubmit(data: NotificationsFormValues) {
    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: "Notification settings updated!",
        description: "Your notification settings have been updated successfully.",
      });
      setIsSubmitting(false);
    }, 1000);
  }

  function onProfileSubmit(data: ProfileFormValues) {
    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: "Profile updated!",
        description: "Your profile information has been updated successfully.",
      });
      setIsSubmitting(false);
    }, 1000);
  }

  function onAccountSubmit(data: AccountFormValues) {
    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: "Account settings updated!",
        description: "Your account details have been updated successfully.",
      });
      setIsSubmitting(false);
    }, 1000);
  }

  function onDisplaySubmit(data: DisplayFormValues) {
    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: "Display settings updated!",
        description: "Your display preferences have been updated successfully.",
      });
      setIsSubmitting(false);
    }, 1000);
  }

  function onPrivacySubmit(data: PrivacyFormValues) {
    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: "Privacy settings updated!",
        description: "Your privacy settings have been updated successfully.",
      });
      setIsSubmitting(false);
    }, 1000);
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account and app preferences.</p>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full h-auto">
          <TabsTrigger value="account" className="flex flex-row gap-2 items-center">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Account</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex flex-row gap-2 items-center">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="display" className="flex flex-row gap-2 items-center">
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">Display</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex flex-row gap-2 items-center">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="meetings" className="flex flex-row gap-2 items-center">
            <VideoIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Meetings</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex flex-row gap-2 items-center">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Privacy</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Update your profile information and how others see you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                    <FormField
                      control={profileForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="johndoe" {...field} />
                          </FormControl>
                          <FormDescription>
                            This is your public username that will appear on your profile.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john.doe@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about yourself"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            You can <span>@mention</span> other users and organizations.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Saving..." : "Update profile"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Update your personal information and contact details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...accountForm}>
                  <form onSubmit={accountForm.handleSubmit(onAccountSubmit)} className="space-y-4">
                    <FormField
                      control={accountForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={accountForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john.doe@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={accountForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="555-123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={accountForm.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="Anytown" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={accountForm.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input placeholder="NY" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Saving..." : "Update account"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Manage your payment methods and billing information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border rounded-md mb-4">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-md">
                    <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                  </div>
                </div>
                <div className="space-x-2">
                  <Button variant="ghost" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm">Delete</Button>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                <CreditCard className="mr-2 h-4 w-4" />
                Add payment method
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize the look and feel of the application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...appearanceForm}>
                <form onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)} className="space-y-6">
                  <FormField
                    control={appearanceForm.control}
                    name="theme"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Theme</FormLabel>
                        <div className="space-y-4">
                          <FormControl>
                            <RadioGroup
                              className="grid grid-cols-3 gap-4"
                              defaultValue={field.value}
                              onValueChange={field.onChange}
                            >
                              <div>
                                <RadioGroupItem
                                  value="light"
                                  id="theme-light"
                                  className="sr-only"
                                />
                                <Label
                                  htmlFor="theme-light"
                                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-100 hover:border-accent has-[:checked]:border-primary"
                                >
                                  <div className="mb-2 rounded-md bg-white border border-gray-200 w-full h-10"></div>
                                  <span>Light</span>
                                </Label>
                              </div>
                              <div>
                                <RadioGroupItem
                                  value="dark"
                                  id="theme-dark"
                                  className="sr-only"
                                />
                                <Label
                                  htmlFor="theme-dark"
                                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-zinc-950 p-4 hover:bg-zinc-900 hover:border-accent has-[:checked]:border-primary"
                                >
                                  <div className="mb-2 rounded-md bg-zinc-800 border border-zinc-700 w-full h-10"></div>
                                  <span className="text-white">Dark</span>
                                </Label>
                              </div>
                              <div>
                                <RadioGroupItem
                                  value="system"
                                  id="theme-system"
                                  className="sr-only"
                                />
                                <Label
                                  htmlFor="theme-system"
                                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-gradient-to-r from-white to-zinc-950 p-4 hover:bg-gray-50 hover:border-accent has-[:checked]:border-primary"
                                >
                                  <div className="mb-2 rounded-md bg-gradient-to-r from-white to-zinc-800 border border-gray-200 w-full h-10"></div>
                                  <span>System</span>
                                </Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={appearanceForm.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Accent Color</FormLabel>
                        <div className="space-y-4">
                          <FormControl>
                            <RadioGroup
                              className="grid grid-cols-5 gap-4"
                              defaultValue={field.value}
                              onValueChange={field.onChange}
                            >
                              <div>
                                <RadioGroupItem
                                  value="purple"
                                  id="color-purple"
                                  className="sr-only"
                                />
                                <Label
                                  htmlFor="color-purple"
                                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-2 hover:border-accent has-[:checked]:border-primary"
                                >
                                  <div className="mb-2 rounded-full bg-purple-500 w-8 h-8"></div>
                                  <span>Purple</span>
                                </Label>
                              </div>
                              <div>
                                <RadioGroupItem
                                  value="blue"
                                  id="color-blue"
                                  className="sr-only"
                                />
                                <Label
                                  htmlFor="color-blue"
                                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-2 hover:border-accent has-[:checked]:border-primary"
                                >
                                  <div className="mb-2 rounded-full bg-blue-500 w-8 h-8"></div>
                                  <span>Blue</span>
                                </Label>
                              </div>
                              <div>
                                <RadioGroupItem
                                  value="green"
                                  id="color-green"
                                  className="sr-only"
                                />
                                <Label
                                  htmlFor="color-green"
                                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-2 hover:border-accent has-[:checked]:border-primary"
                                >
                                  <div className="mb-2 rounded-full bg-green-500 w-8 h-8"></div>
                                  <span>Green</span>
                                </Label>
                              </div>
                              <div>
                                <RadioGroupItem
                                  value="orange"
                                  id="color-orange"
                                  className="sr-only"
                                />
                                <Label
                                  htmlFor="color-orange"
                                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-2 hover:border-accent has-[:checked]:border-primary"
                                >
                                  <div className="mb-2 rounded-full bg-orange-500 w-8 h-8"></div>
                                  <span>Orange</span>
                                </Label>
                              </div>
                              <div>
                                <RadioGroupItem
                                  value="pink"
                                  id="color-pink"
                                  className="sr-only"
                                />
                                <Label
                                  htmlFor="color-pink"
                                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-2 hover:border-accent has-[:checked]:border-primary"
                                >
                                  <div className="mb-2 rounded-full bg-pink-500 w-8 h-8"></div>
                                  <span>Pink</span>
                                </Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={appearanceForm.control}
                    name="font"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Font</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a font" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="inter">Inter</SelectItem>
                            <SelectItem value="manrope">Manrope</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Updating..." : "Update appearance"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="display" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Display Settings</CardTitle>
              <CardDescription>
                Configure how dates, times, and other display preferences work.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...displayForm}>
                <form onSubmit={displayForm.handleSubmit(onDisplaySubmit)} className="space-y-4">
                  <FormField
                    control={displayForm.control}
                    name="timezone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Timezone</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a timezone" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                            <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                            <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                            <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                            <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                            <SelectItem value="Europe/Paris">Central European Time (CET)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={displayForm.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Language</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a language" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="en-US">English (US)</SelectItem>
                            <SelectItem value="en-GB">English (UK)</SelectItem>
                            <SelectItem value="es-ES">Spanish (Spain)</SelectItem>
                            <SelectItem value="fr-FR">French (France)</SelectItem>
                            <SelectItem value="de-DE">German (Germany)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={displayForm.control}
                    name="dateFormat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date Format</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a date format" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                            <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                            <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={displayForm.control}
                    name="timeFormat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time Format</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a time format" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="12h">12-hour (1:30 PM)</SelectItem>
                            <SelectItem value="24h">24-hour (13:30)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Updating..." : "Update display settings"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...notificationsForm}>
                <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)} className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Communication Channels</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Select how you'd like to receive notifications
                    </p>
                    <div className="space-y-4">
                      <FormField
                        control={notificationsForm.control}
                        name="emailNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Email Notifications</FormLabel>
                              <FormDescription>
                                Receive notifications via email
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={notificationsForm.control}
                        name="smsNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>SMS Notifications</FormLabel>
                              <FormDescription>
                                Receive notifications via text message
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={notificationsForm.control}
                        name="appNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>App Notifications</FormLabel>
                              <FormDescription>
                                Receive notifications in the app
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium">Notification Types</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Select what types of notifications you want to receive
                    </p>
                    <div className="space-y-4">
                      <FormField
                        control={notificationsForm.control}
                        name="marketingEmails"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Marketing & Updates</FormLabel>
                              <FormDescription>
                                Receive emails about new features and promotions
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={notificationsForm.control}
                        name="securityEmails"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Security Alerts</FormLabel>
                              <FormDescription>
                                Receive emails about security and account activity
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save notification settings"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meetings" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Meeting Settings</CardTitle>
              <CardDescription>
                Configure your meeting and calendar preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Calendar Integration</h3>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                      <Calendar className="h-5 w-5 text-green-600 dark:text-green-300" />
                    </div>
                    <div>
                      <p className="font-medium">Google Calendar</p>
                      <p className="text-sm text-muted-foreground">Connected</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Disconnect</Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border mt-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                      <Mail className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                    </div>
                    <div>
                      <p className="font-medium">Microsoft Outlook</p>
                      <p className="text-sm text-muted-foreground">Not connected</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Meeting Preferences</h3>
                <div className="space-y-4">
                  <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <Label>Automatic Reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Send reminders before scheduled appointments
                      </p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>

                  <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <Label>Default Meeting Duration</Label>
                      <p className="text-sm text-muted-foreground">
                        Set your default meeting length
                      </p>
                    </div>
                    <Select defaultValue="30">
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 min</SelectItem>
                        <SelectItem value="30">30 min</SelectItem>
                        <SelectItem value="45">45 min</SelectItem>
                        <SelectItem value="60">60 min</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <Label>Buffer Time</Label>
                      <p className="text-sm text-muted-foreground">
                        Add buffer time between meetings
                      </p>
                    </div>
                    <Select defaultValue="10">
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Select buffer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">None</SelectItem>
                        <SelectItem value="5">5 min</SelectItem>
                        <SelectItem value="10">10 min</SelectItem>
                        <SelectItem value="15">15 min</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="mt-4" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save meeting settings"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Control who can see your information and how your data is used.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...privacyForm}>
                <form onSubmit={privacyForm.handleSubmit(onPrivacySubmit)} className="space-y-6">
                  <FormField
                    control={privacyForm.control}
                    name="profileVisibility"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profile Visibility</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Who can see your profile" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="public">Public - Everyone can see</SelectItem>
                            <SelectItem value="contacts">Contacts Only</SelectItem>
                            <SelectItem value="private">Private - Only you can see</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Control who can view your profile information.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={privacyForm.control}
                    name="activityStatus"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Activity Status</FormLabel>
                          <FormDescription>
                            Show when you are active on the platform
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={privacyForm.control}
                    name="readReceipts"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Read Receipts</FormLabel>
                          <FormDescription>
                            Show others when you've read their messages
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={privacyForm.control}
                    name="dataUsage"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Data Usage</FormLabel>
                          <FormDescription>
                            Allow us to use your data to improve our services
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save privacy settings"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
