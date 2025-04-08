
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Camera, Trash2, CreditCard } from 'lucide-react';

const Profile = () => {
  const { toast } = useToast();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isPaymentMethodModalOpen, setIsPaymentMethodModalOpen] = useState(false);
  const [isChangePlanModalOpen, setIsChangePlanModalOpen] = useState(false);
  const [isCancelSubscriptionModalOpen, setIsCancelSubscriptionModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("professional");
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: ''
  });
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Profile updated',
      description: 'Your profile information has been updated successfully.',
    });
  };
  
  const handleSecurityUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Security settings updated',
      description: 'Your security settings have been updated successfully.',
    });
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
          toast({
            title: 'Profile image uploaded',
            description: 'Your profile image has been updated successfully.',
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleRemoveImage = () => {
    setProfileImage(null);
    toast({
      title: 'Profile image removed',
      description: 'Your profile image has been removed.',
    });
  };
  
  const handleAddPaymentMethod = () => {
    toast({
      title: 'Payment method added',
      description: 'Your payment method has been added successfully.',
    });
    setIsPaymentMethodModalOpen(false);
  };
  
  const handleChangePlan = () => {
    toast({
      title: 'Plan changed',
      description: `Your subscription plan has been changed to ${selectedPlan}.`,
    });
    setIsChangePlanModalOpen(false);
  };
  
  const handleCancelSubscription = () => {
    toast({
      title: 'Subscription cancelled',
      description: 'Your subscription has been cancelled successfully.',
    });
    setIsCancelSubscriptionModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription>
                Upload or change your profile picture
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative group">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profileImage || "/placeholder.svg"} alt="Profile" />
                    <AvatarFallback className="text-2xl">CD</AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Label 
                      htmlFor="picture" 
                      className="cursor-pointer h-full w-full flex items-center justify-center"
                    >
                      <Camera className="h-6 w-6 text-white" />
                      <span className="sr-only">Upload picture</span>
                    </Label>
                    <Input 
                      id="picture" 
                      type="file" 
                      accept="image/*" 
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Upload a new photo</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => document.getElementById('picture')?.click()}>
                      <Camera className="h-4 w-4 mr-2" />
                      Change
                    </Button>
                    {profileImage && (
                      <Button variant="outline" size="sm" onClick={handleRemoveImage}>
                        <Trash2 className="h-4 w-4 mr-2 text-red-500" />
                        Remove
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Recommended: Square JPG or PNG, at least 300x300 pixels
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" defaultValue="Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" defaultValue="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+1 (555) 123-4567" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="A brief description about yourself"
                      defaultValue="Professional hair stylist with 10+ years of experience in modern cutting techniques and color treatments."
                    />
                  </div>
                </div>
                <Button type="submit">Save Changes</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSecurityUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button type="submit">Update Password</Button>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Text Message Authentication</p>
                  <p className="text-sm text-muted-foreground">Use your phone as a second factor</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Authenticator App</p>
                  <p className="text-sm text-muted-foreground">Use an authenticator app as a second factor</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Security Keys</p>
                  <p className="text-sm text-muted-foreground">Use a security key (like YubiKey) as a second factor</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Manage when you'll receive email notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Appointment Confirmations</p>
                  <p className="text-sm text-muted-foreground">When a client books or confirms an appointment</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Appointment Reminders</p>
                  <p className="text-sm text-muted-foreground">24 hours before scheduled appointments</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Payment Confirmations</p>
                  <p className="text-sm text-muted-foreground">When a payment is processed</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Marketing Updates</p>
                  <p className="text-sm text-muted-foreground">Special offers and new features</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Manage your payment methods
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between border p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-20 bg-gray-200 rounded-md flex items-center justify-center">
                    <span className="font-semibold">VISA</span>
                  </div>
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
              <Button variant="outline" className="w-full" onClick={() => setIsPaymentMethodModalOpen(true)}>Add Payment Method</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>
                You are currently on the Professional plan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-lg">Professional Plan</p>
                    <p className="text-sm text-muted-foreground">$29/month, billed monthly</p>
                  </div>
                  <Button variant="outline" onClick={() => setIsChangePlanModalOpen(true)}>Change Plan</Button>
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <p className="text-sm">Unlimited appointments</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <p className="text-sm">Client management</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <p className="text-sm">Online payments</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <p className="text-sm">Email notifications</p>
                  </div>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={() => setIsCancelSubscriptionModalOpen(true)}
              >
                Cancel Subscription
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Add Payment Method Modal */}
      <Dialog open={isPaymentMethodModalOpen} onOpenChange={setIsPaymentMethodModalOpen}>
        <DialogContent className="sm:max-w-[500px] my-8">
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
            <DialogDescription>
              Enter your credit card details below
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input 
                id="cardNumber" 
                placeholder="1234 5678 9012 3456"
                value={newPaymentMethod.cardNumber}
                onChange={(e) => setNewPaymentMethod({...newPaymentMethod, cardNumber: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cardholderName">Cardholder Name</Label>
              <Input 
                id="cardholderName" 
                placeholder="John Doe"
                value={newPaymentMethod.cardholderName}
                onChange={(e) => setNewPaymentMethod({...newPaymentMethod, cardholderName: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input 
                  id="expiryDate" 
                  placeholder="MM/YY"
                  value={newPaymentMethod.expiryDate}
                  onChange={(e) => setNewPaymentMethod({...newPaymentMethod, expiryDate: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input 
                  id="cvv" 
                  placeholder="123"
                  value={newPaymentMethod.cvv}
                  onChange={(e) => setNewPaymentMethod({...newPaymentMethod, cvv: e.target.value})}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentMethodModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAddPaymentMethod}>Save Payment Method</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Change Plan Modal */}
      <Dialog open={isChangePlanModalOpen} onOpenChange={setIsChangePlanModalOpen}>
        <DialogContent className="sm:max-w-[500px] my-8">
          <DialogHeader>
            <DialogTitle>Change Subscription Plan</DialogTitle>
            <DialogDescription>
              Select a new subscription plan
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-900/40">
                <div className="flex items-start">
                  <input 
                    type="radio" 
                    id="plan-basic" 
                    name="plan" 
                    className="mt-1" 
                    checked={selectedPlan === "basic"}
                    onChange={() => setSelectedPlan("basic")}
                  />
                  <div className="ml-3">
                    <label htmlFor="plan-basic" className="font-medium block">Basic Plan</label>
                    <p className="text-sm text-gray-500">$9/month, billed monthly</p>
                    <ul className="text-sm mt-2">
                      <li>• Up to 50 appointments/month</li>
                      <li>• Basic client management</li>
                      <li>• Email notifications</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-900/40">
                <div className="flex items-start">
                  <input 
                    type="radio" 
                    id="plan-professional" 
                    name="plan"
                    className="mt-1"
                    checked={selectedPlan === "professional"}
                    onChange={() => setSelectedPlan("professional")}
                  />
                  <div className="ml-3">
                    <label htmlFor="plan-professional" className="font-medium block">Professional Plan</label>
                    <p className="text-sm text-gray-500">$29/month, billed monthly</p>
                    <ul className="text-sm mt-2">
                      <li>• Unlimited appointments</li>
                      <li>• Advanced client management</li>
                      <li>• Online payments</li>
                      <li>• Email & SMS notifications</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-900/40">
                <div className="flex items-start">
                  <input 
                    type="radio" 
                    id="plan-business" 
                    name="plan"
                    className="mt-1"
                    checked={selectedPlan === "business"}
                    onChange={() => setSelectedPlan("business")}
                  />
                  <div className="ml-3">
                    <label htmlFor="plan-business" className="font-medium block">Business Plan</label>
                    <p className="text-sm text-gray-500">$59/month, billed monthly</p>
                    <ul className="text-sm mt-2">
                      <li>• All Professional features</li>
                      <li>• Multiple staff members</li>
                      <li>• Advanced analytics</li>
                      <li>• White label booking options</li>
                      <li>• Priority support</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsChangePlanModalOpen(false)}>Cancel</Button>
            <Button onClick={handleChangePlan}>Change Plan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Cancel Subscription Modal */}
      <Dialog open={isCancelSubscriptionModalOpen} onOpenChange={setIsCancelSubscriptionModalOpen}>
        <DialogContent className="sm:max-w-[500px] my-8">
          <DialogHeader>
            <DialogTitle>Cancel Subscription</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel your subscription?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4">Cancelling your subscription will:</p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>End your access to premium features at the end of your billing period</li>
              <li>Not provide refunds for the current billing period</li>
              <li>Allow you to continue using the service until the end of the billing period</li>
            </ul>
            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md">
              <p className="text-amber-800 dark:text-amber-300 text-sm">
                We're sorry to see you go. If there's anything we can help with, please contact our support team.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCancelSubscriptionModalOpen(false)}>Keep Subscription</Button>
            <Button variant="destructive" onClick={handleCancelSubscription}>Cancel Subscription</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
