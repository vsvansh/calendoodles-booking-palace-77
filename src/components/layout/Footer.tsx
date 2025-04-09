
import { Link } from "react-router-dom";
import { Calendar, Heart, Github, Twitter, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  
  const renderDialogContent = () => {
    switch(activeDialog) {
      case "features":
        return (
          <DialogContent className="sm:max-w-[650px] dark:bg-gray-900 dark:border-gray-800 animate-fade-in">
            <DialogHeader>
              <DialogTitle className="text-2xl dark:text-white">Features</DialogTitle>
              <DialogDescription className="dark:text-gray-400">Discover what Calendoodles can do for you</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="border dark:border-gray-800 p-4 rounded-lg hover:shadow-md transition-all dark:hover:border-calendoodle-blue/30">
                <h3 className="text-lg font-medium dark:text-white mb-2">Smart Scheduling</h3>
                <p className="dark:text-gray-300">AI-powered scheduling that takes into account your preferences and availability.</p>
              </div>
              <div className="border dark:border-gray-800 p-4 rounded-lg hover:shadow-md transition-all dark:hover:border-calendoodle-purple/30">
                <h3 className="text-lg font-medium dark:text-white mb-2">Client Management</h3>
                <p className="dark:text-gray-300">Keep track of all your client information in one place, with detailed profiles and history.</p>
              </div>
              <div className="border dark:border-gray-800 p-4 rounded-lg hover:shadow-md transition-all dark:hover:border-calendoodle-orange/30">
                <h3 className="text-lg font-medium dark:text-white mb-2">Payment Processing</h3>
                <p className="dark:text-gray-300">Accept payments online, generate invoices, and track your revenue with ease.</p>
              </div>
              <div className="border dark:border-gray-800 p-4 rounded-lg hover:shadow-md transition-all dark:hover:border-calendoodle-green/30">
                <h3 className="text-lg font-medium dark:text-white mb-2">Analytics Dashboard</h3>
                <p className="dark:text-gray-300">Get insights into your business with powerful analytics and reporting tools.</p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setActiveDialog(null)}>Close</Button>
            </div>
          </DialogContent>
        );
        
      case "pricing":
        return (
          <DialogContent className="sm:max-w-[650px] dark:bg-gray-900 dark:border-gray-800 animate-fade-in">
            <DialogHeader>
              <DialogTitle className="text-2xl dark:text-white">Pricing Plans</DialogTitle>
              <DialogDescription className="dark:text-gray-400">Choose the perfect plan for your needs</DialogDescription>
            </DialogHeader>
            <div className="grid sm:grid-cols-3 gap-4 py-4">
              <div className="border dark:border-gray-800 p-4 rounded-lg hover:shadow-md transition-all dark:hover:border-calendoodle-blue/30">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-medium dark:text-white">Basic</h3>
                  <p className="text-3xl font-bold mt-2 dark:text-white">$9<span className="text-sm font-normal">/month</span></p>
                  <p className="text-sm mt-1 dark:text-gray-400">Perfect for individuals</p>
                </div>
                <ul className="space-y-2 text-sm dark:text-gray-300">
                  <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> 50 appointments/month</li>
                  <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> Basic analytics</li>
                  <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> Email notifications</li>
                  <li className="flex items-center"><span className="mr-2 text-red-500">✕</span> Client management</li>
                </ul>
              </div>
              <div className="border-2 border-calendoodle-blue dark:border-calendoodle-blue/50 p-4 rounded-lg shadow-md dark:shadow-[0_0_15px_rgba(52,152,219,0.2)]">
                <div className="text-center mb-4">
                  <span className="bg-calendoodle-blue text-white text-xs py-1 px-2 rounded-full">POPULAR</span>
                  <h3 className="text-lg font-medium mt-2 dark:text-white">Pro</h3>
                  <p className="text-3xl font-bold mt-2 dark:text-white">$29<span className="text-sm font-normal">/month</span></p>
                  <p className="text-sm mt-1 dark:text-gray-400">Perfect for small businesses</p>
                </div>
                <ul className="space-y-2 text-sm dark:text-gray-300">
                  <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> Unlimited appointments</li>
                  <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> Advanced analytics</li>
                  <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> Client management</li>
                  <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> Payment processing</li>
                </ul>
              </div>
              <div className="border dark:border-gray-800 p-4 rounded-lg hover:shadow-md transition-all dark:hover:border-calendoodle-purple/30">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-medium dark:text-white">Enterprise</h3>
                  <p className="text-3xl font-bold mt-2 dark:text-white">$99<span className="text-sm font-normal">/month</span></p>
                  <p className="text-sm mt-1 dark:text-gray-400">Perfect for large teams</p>
                </div>
                <ul className="space-y-2 text-sm dark:text-gray-300">
                  <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> All Pro features</li>
                  <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> Multiple team members</li>
                  <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> Custom integrations</li>
                  <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> Priority support</li>
                </ul>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setActiveDialog(null)}>Close</Button>
            </div>
          </DialogContent>
        );
      
      case "integrations":
        return (
          <DialogContent className="sm:max-w-[650px] dark:bg-gray-900 dark:border-gray-800 animate-fade-in">
            <DialogHeader>
              <DialogTitle className="text-2xl dark:text-white">Integrations</DialogTitle>
              <DialogDescription className="dark:text-gray-400">Connect Calendoodles with your favorite apps</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4">
              <div className="border dark:border-gray-800 p-4 rounded-lg flex flex-col items-center hover:shadow-md transition-all dark:hover:border-calendoodle-blue/30">
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-2">
                  <svg className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z" fill="currentColor"/>
                  </svg>
                </div>
                <span className="text-sm font-medium dark:text-white">Google Calendar</span>
              </div>
              <div className="border dark:border-gray-800 p-4 rounded-lg flex flex-col items-center hover:shadow-md transition-all dark:hover:border-calendoodle-blue/30">
                <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-2">
                  <svg className="h-6 w-6 text-green-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 4C5.57 4 4 5.57 4 7.5V16.5C4 18.43 5.57 20 7.5 20H16.5C18.43 20 20 18.43 20 16.5V7.5C20 5.57 18.43 4 16.5 4H7.5ZM7 9.5C7 8.12 8.12 7 9.5 7H14.5C15.88 7 17 8.12 17 9.5V14.5C17 15.88 15.88 17 14.5 17H9.5C8.12 17 7 15.88 7 14.5V9.5Z" fill="currentColor"/>
                  </svg>
                </div>
                <span className="text-sm font-medium dark:text-white">Outlook</span>
              </div>
              <div className="border dark:border-gray-800 p-4 rounded-lg flex flex-col items-center hover:shadow-md transition-all dark:hover:border-calendoodle-blue/30">
                <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-2">
                  <svg className="h-6 w-6 text-purple-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.54 4.18C18.88 3.49 17.54 2.74 15.68 3.02C14.29 3.23 13.11 3.93 12 4.97C10.89 3.93 9.71 3.23 8.32 3.02C6.46 2.74 5.12 3.49 4.46 4.18C3.79 4.87 3.66 5.94 4.04 7.36C4.42 8.78 5.54 10.75 7.92 12.45C8.35 12.77 8.86 13 9.4 13.14V18.03L11 18.4V14.53L11.71 14.88C11.89 14.96 12.11 14.96 12.3 14.88L13 14.53V18.4L14.6 18.03V13.14C15.14 13 15.65 12.77 16.08 12.45C18.46 10.75 19.58 8.78 19.96 7.36C20.34 5.94 20.21 4.87 19.54 4.18Z" fill="currentColor"/>
                  </svg>
                </div>
                <span className="text-sm font-medium dark:text-white">Slack</span>
              </div>
              <div className="border dark:border-gray-800 p-4 rounded-lg flex flex-col items-center hover:shadow-md transition-all dark:hover:border-calendoodle-blue/30">
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-2">
                  <svg className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
                  </svg>
                </div>
                <span className="text-sm font-medium dark:text-white">Zoom</span>
              </div>
              <div className="border dark:border-gray-800 p-4 rounded-lg flex flex-col items-center hover:shadow-md transition-all dark:hover:border-calendoodle-blue/30">
                <div className="h-12 w-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-2">
                  <svg className="h-6 w-6 text-red-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.36 9.27L12.05 6.21C11.81 6.08 11.55 6 11.27 6C10.48 6 9.83 6.65 9.83 7.44V13.56C9.83 14.35 10.48 15 11.27 15C11.55 15 11.81 14.92 12.05 14.79L17.36 11.73C17.87 11.42 18.17 10.86 18.17 10.25C18.17 9.64 17.87 9.08 17.36 9.27Z" fill="currentColor"/>
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
                  </svg>
                </div>
                <span className="text-sm font-medium dark:text-white">YouTube</span>
              </div>
              <div className="border dark:border-gray-800 p-4 rounded-lg flex flex-col items-center hover:shadow-md transition-all dark:hover:border-calendoodle-blue/30">
                <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-2">
                  <svg className="h-6 w-6 text-green-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.41 11.58L12.41 2.58C12.05 2.22 11.55 2 11 2H4C2.9 2 2 2.9 2 4V11C2 11.55 2.22 12.05 2.59 12.42L11.59 21.42C11.95 21.78 12.45 22 13 22C13.55 22 14.05 21.78 14.41 21.42L21.41 14.42C21.78 14.05 22 13.55 22 13C22 12.45 21.77 11.95 21.41 11.58ZM7 8C5.9 8 5 7.1 5 6C5 4.9 5.9 4 7 4C8.1 4 9 4.9 9 6C9 7.1 8.1 8 7 8Z" fill="currentColor"/>
                  </svg>
                </div>
                <span className="text-sm font-medium dark:text-white">Stripe</span>
              </div>
              <div className="border dark:border-gray-800 p-4 rounded-lg flex flex-col items-center hover:shadow-md transition-all dark:hover:border-calendoodle-blue/30">
                <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-2">
                  <svg className="h-6 w-6 text-yellow-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.5 3.5L18 2L16.5 3.5L15 2L13.5 3.5L12 2L10.5 3.5L9 2L7.5 3.5L6 2V16H3V19C3 20.66 4.34 22 6 22H18C19.66 22 21 20.66 21 19V2L19.5 3.5ZM15 20H6C5.45 20 5 19.55 5 19V18H15V20ZM19 19C19 19.55 18.55 20 18 20C17.45 20 17 19.55 17 19V18H19V19ZM19 16H5V5H19V16Z" fill="currentColor"/>
                    <path d="M16 8H8V10H16V8Z" fill="currentColor"/>
                    <path d="M16 11H8V13H16V11Z" fill="currentColor"/>
                  </svg>
                </div>
                <span className="text-sm font-medium dark:text-white">PayPal</span>
              </div>
              <div className="border dark:border-gray-800 p-4 rounded-lg flex flex-col items-center hover:shadow-md transition-all dark:hover:border-calendoodle-blue/30">
                <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-2">
                  <svg className="h-6 w-6 text-purple-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/>
                  </svg>
                </div>
                <span className="text-sm font-medium dark:text-white">Square</span>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setActiveDialog(null)}>Close</Button>
            </div>
          </DialogContent>
        );
      
      case "changelog":
        return (
          <DialogContent className="sm:max-w-[650px] dark:bg-gray-900 dark:border-gray-800 animate-fade-in">
            <DialogHeader>
              <DialogTitle className="text-2xl dark:text-white">Changelog</DialogTitle>
              <DialogDescription className="dark:text-gray-400">Latest updates and improvements</DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4 max-h-[60vh] overflow-y-auto pr-2">
              <div>
                <div className="flex items-center mb-2">
                  <span className="text-sm font-semibold bg-calendoodle-blue/10 text-calendoodle-blue dark:bg-calendoodle-blue/20 dark:text-calendoodle-blue/90 px-2 py-0.5 rounded">v2.3.0</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-3">April 5, 2025</span>
                </div>
                <h3 className="text-lg font-medium dark:text-white">New Analytics Dashboard</h3>
                <ul className="mt-2 space-y-1 text-sm dark:text-gray-300 list-disc list-inside">
                  <li>Added new charts and graphs for better visualization</li>
                  <li>Implemented export functionality for reports</li>
                  <li>Added historical data comparison</li>
                  <li>Fixed bugs in date range selection</li>
                </ul>
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <span className="text-sm font-semibold bg-calendoodle-purple/10 text-calendoodle-purple dark:bg-calendoodle-purple/20 dark:text-calendoodle-purple/90 px-2 py-0.5 rounded">v2.2.0</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-3">March 15, 2025</span>
                </div>
                <h3 className="text-lg font-medium dark:text-white">Enhanced Calendar Experience</h3>
                <ul className="mt-2 space-y-1 text-sm dark:text-gray-300 list-disc list-inside">
                  <li>Added drag-and-drop functionality for events</li>
                  <li>Implemented multi-day event support</li>
                  <li>Added "Jump to Date" feature</li>
                  <li>Improved mobile calendar experience</li>
                </ul>
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <span className="text-sm font-semibold bg-calendoodle-green/10 text-calendoodle-green dark:bg-calendoodle-green/20 dark:text-calendoodle-green/90 px-2 py-0.5 rounded">v2.1.5</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-3">February 28, 2025</span>
                </div>
                <h3 className="text-lg font-medium dark:text-white">Performance Improvements</h3>
                <ul className="mt-2 space-y-1 text-sm dark:text-gray-300 list-disc list-inside">
                  <li>Reduced page load time by 40%</li>
                  <li>Optimized database queries</li>
                  <li>Implemented lazy loading for appointments</li>
                  <li>Added offline support for basic functions</li>
                </ul>
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <span className="text-sm font-semibold bg-calendoodle-orange/10 text-calendoodle-orange dark:bg-calendoodle-orange/20 dark:text-calendoodle-orange/90 px-2 py-0.5 rounded">v2.1.0</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-3">February 10, 2025</span>
                </div>
                <h3 className="text-lg font-medium dark:text-white">Payment Processing Updates</h3>
                <ul className="mt-2 space-y-1 text-sm dark:text-gray-300 list-disc list-inside">
                  <li>Added support for multiple payment providers</li>
                  <li>Implemented invoice generation with PDF export</li>
                  <li>Added automatic payment reminders</li>
                  <li>Improved payment tracking and reporting</li>
                </ul>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setActiveDialog(null)}>Close</Button>
            </div>
          </DialogContent>
        );
        
      case "help":
        return (
          <DialogContent className="sm:max-w-[650px] dark:bg-gray-900 dark:border-gray-800 animate-fade-in">
            <DialogHeader>
              <DialogTitle className="text-2xl dark:text-white">Help Center</DialogTitle>
              <DialogDescription className="dark:text-gray-400">Find answers to your questions</DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-6">
              <div>
                <h3 className="text-lg font-medium dark:text-white mb-2">Frequently Asked Questions</h3>
                <div className="space-y-3">
                  <div className="border dark:border-gray-800 rounded-lg p-3 hover:shadow-md transition-all dark:hover:border-calendoodle-blue/30">
                    <h4 className="font-medium dark:text-white">How do I create a new appointment?</h4>
                    <p className="text-sm mt-1 dark:text-gray-300">Go to the Calendar page and click on the "New Event" button or directly click on the desired time slot.</p>
                  </div>
                  <div className="border dark:border-gray-800 rounded-lg p-3 hover:shadow-md transition-all dark:hover:border-calendoodle-blue/30">
                    <h4 className="font-medium dark:text-white">Can I export my calendar to other apps?</h4>
                    <p className="text-sm mt-1 dark:text-gray-300">Yes, you can export your calendar to Google Calendar, Outlook, and other apps that support iCal format.</p>
                  </div>
                  <div className="border dark:border-gray-800 rounded-lg p-3 hover:shadow-md transition-all dark:hover:border-calendoodle-blue/30">
                    <h4 className="font-medium dark:text-white">How do refunds work?</h4>
                    <p className="text-sm mt-1 dark:text-gray-300">You can process refunds through the Payments section. Select the invoice and click on the "Refund" button.</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium dark:text-white mb-2">Contact Support</h3>
                <p className="dark:text-gray-300 mb-4">Our support team is available 24/7 to assist you with any questions or issues you may have.</p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" className="flex items-center gap-2 dark:border-gray-700">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
                    </svg>
                    Email Support
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 dark:border-gray-700">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.23 15.26L16.69 14.97C16.08 14.9 15.48 15.11 15.05 15.54L13.21 17.38C10.38 15.94 8.06 13.63 6.62 10.79L8.47 8.94C8.9 8.51 9.11 7.91 9.04 7.3L8.75 4.78C8.63 3.77 7.78 3 6.76 3H5.03C3.9 3 2.96 3.94 3.03 5.07C3.56 13.62 10.39 20.44 18.93 20.97C20.06 21.04 21 20.1 21 18.97V17.24C21 16.23 20.23 15.38 19.23 15.26Z" fill="currentColor"/>
                    </svg>
                    Call Support
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 dark:border-gray-700">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" fill="currentColor"/>
                    </svg>
                    Live Chat
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setActiveDialog(null)}>Close</Button>
            </div>
          </DialogContent>
        );
      
      case "documentation":
        return (
          <DialogContent className="sm:max-w-[650px] dark:bg-gray-900 dark:border-gray-800 animate-fade-in">
            <DialogHeader>
              <DialogTitle className="text-2xl dark:text-white">Documentation</DialogTitle>
              <DialogDescription className="dark:text-gray-400">Learn how to use Calendoodles effectively</DialogDescription>
            </DialogHeader>
            <div className="py-4 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2">
              <div className="border dark:border-gray-800 p-4 rounded-lg hover:shadow-md transition-all dark:hover:border-calendoodle-blue/30">
                <h3 className="text-lg font-medium dark:text-white mb-1">Getting Started</h3>
                <p className="text-sm dark:text-gray-300 mb-3">Learn the basics of Calendoodles and set up your account.</p>
                <Button variant="outline" size="sm" className="w-full dark:border-gray-700">View Guide</Button>
              </div>
              <div className="border dark:border-gray-800 p-4 rounded-lg hover:shadow-md transition-all dark:hover:border-calendoodle-purple/30">
                <h3 className="text-lg font-medium dark:text-white mb-1">Calendar Management</h3>
                <p className="text-sm dark:text-gray-300 mb-3">Learn how to create, edit, and manage calendar events.</p>
                <Button variant="outline" size="sm" className="w-full dark:border-gray-700">View Guide</Button>
              </div>
              <div className="border dark:border-gray-800 p-4 rounded-lg hover:shadow-md transition-all dark:hover:border-calendoodle-orange/30">
                <h3 className="text-lg font-medium dark:text-white mb-1">Client Management</h3>
                <p className="text-sm dark:text-gray-300 mb-3">Learn how to add, edit, and manage client profiles.</p>
                <Button variant="outline" size="sm" className="w-full dark:border-gray-700">View Guide</Button>
              </div>
              <div className="border dark:border-gray-800 p-4 rounded-lg hover:shadow-md transition-all dark:hover:border-calendoodle-green/30">
                <h3 className="text-lg font-medium dark:text-white mb-1">Payment Processing</h3>
                <p className="text-sm dark:text-gray-300 mb-3">Learn how to process payments and manage invoices.</p>
                <Button variant="outline" size="sm" className="w-full dark:border-gray-700">View Guide</Button>
              </div>
              <div className="border dark:border-gray-800 p-4 rounded-lg hover:shadow-md transition-all dark:hover:border-calendoodle-blue/30">
                <h3 className="text-lg font-medium dark:text-white mb-1">Analytics</h3>
                <p className="text-sm dark:text-gray-300 mb-3">Learn how to use analytics to grow your business.</p>
                <Button variant="outline" size="sm" className="w-full dark:border-gray-700">View Guide</Button>
              </div>
              <div className="border dark:border-gray-800 p-4 rounded-lg hover:shadow-md transition-all dark:hover:border-calendoodle-purple/30">
                <h3 className="text-lg font-medium dark:text-white mb-1">Settings & Customization</h3>
                <p className="text-sm dark:text-gray-300 mb-3">Learn how to customize Calendoodles to fit your needs.</p>
                <Button variant="outline" size="sm" className="w-full dark:border-gray-700">View Guide</Button>
              </div>
              <div className="border dark:border-gray-800 p-4 rounded-lg hover:shadow-md transition-all dark:hover:border-calendoodle-orange/30">
                <h3 className="text-lg font-medium dark:text-white mb-1">API Documentation</h3>
                <p className="text-sm dark:text-gray-300 mb-3">Learn how to integrate Calendoodles with other apps.</p>
                <Button variant="outline" size="sm" className="w-full dark:border-gray-700">View Guide</Button>
              </div>
              <div className="border dark:border-gray-800 p-4 rounded-lg hover:shadow-md transition-all dark:hover:border-calendoodle-green/30">
                <h3 className="text-lg font-medium dark:text-white mb-1">Mobile App</h3>
                <p className="text-sm dark:text-gray-300 mb-3">Learn how to use Calendoodles on your mobile device.</p>
                <Button variant="outline" size="sm" className="w-full dark:border-gray-700">View Guide</Button>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setActiveDialog(null)}>Close</Button>
            </div>
          </DialogContent>
        );
        
      case "contact":
        return (
          <DialogContent className="sm:max-w-[650px] dark:bg-gray-900 dark:border-gray-800 animate-fade-in">
            <DialogHeader>
              <DialogTitle className="text-2xl dark:text-white">Contact Us</DialogTitle>
              <DialogDescription className="dark:text-gray-400">We'd love to hear from you</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium dark:text-white block mb-1" htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm dark:text-white"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium dark:text-white block mb-1" htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm dark:text-white"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium dark:text-white block mb-1" htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm dark:text-white"
                    placeholder="Subject"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium dark:text-white block mb-1" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm dark:text-white"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <Button className="mr-2" variant="outline" onClick={() => setActiveDialog(null)}>Cancel</Button>
                  <Button onClick={() => setActiveDialog(null)}>Send Message</Button>
                </div>
              </form>
            </div>
          </DialogContent>
        );
      
      case "privacy":
        return (
          <DialogContent className="sm:max-w-[750px] dark:bg-gray-900 dark:border-gray-800 animate-fade-in">
            <DialogHeader>
              <DialogTitle className="text-2xl dark:text-white">Privacy Policy</DialogTitle>
              <DialogDescription className="dark:text-gray-400">Last updated: April 1, 2025</DialogDescription>
            </DialogHeader>
            <div className="py-4 max-h-[60vh] overflow-y-auto pr-2 space-y-4">
              <p className="dark:text-gray-300">
                At Calendoodles, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our application.
              </p>
              <div>
                <h3 className="text-lg font-medium dark:text-white mb-2">Information We Collect</h3>
                <p className="dark:text-gray-300 mb-2">
                  We collect information that you provide directly to us when you:
                </p>
                <ul className="list-disc list-inside dark:text-gray-300 space-y-1">
                  <li>Register for an account</li>
                  <li>Fill in forms on our website</li>
                  <li>Correspond with us by phone, email, or otherwise</li>
                  <li>Use our calendar and appointment scheduling features</li>
                  <li>Process payments through our application</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium dark:text-white mb-2">How We Use Your Information</h3>
                <p className="dark:text-gray-300">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside dark:text-gray-300 space-y-1">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send you technical notices, updates, security alerts, and support messages</li>
                  <li>Respond to your comments, questions, and requests</li>
                  <li>Develop new products and services</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium dark:text-white mb-2">Data Security</h3>
                <p className="dark:text-gray-300">
                  We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no security system is impenetrable and we cannot guarantee the absolute security of your data.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium dark:text-white mb-2">Data Retention</h3>
                <p className="dark:text-gray-300">
                  We will retain your information for as long as your account is active or as needed to provide you services. We will retain and use your information to comply with our legal obligations, resolve disputes, and enforce our agreements.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium dark:text-white mb-2">Changes to This Privacy Policy</h3>
                <p className="dark:text-gray-300">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setActiveDialog(null)}>Close</Button>
            </div>
          </DialogContent>
        );
      
      case "terms":
        return (
          <DialogContent className="sm:max-w-[750px] dark:bg-gray-900 dark:border-gray-800 animate-fade-in">
            <DialogHeader>
              <DialogTitle className="text-2xl dark:text-white">Terms of Service</DialogTitle>
              <DialogDescription className="dark:text-gray-400">Last updated: April 1, 2025</DialogDescription>
            </DialogHeader>
            <div className="py-4 max-h-[60vh] overflow-y-auto pr-2 space-y-4">
              <p className="dark:text-gray-300">
                Welcome to Calendoodles. By accessing or using our website and services, you agree to be bound by these Terms of Service.
              </p>
              <div>
                <h3 className="text-lg font-medium dark:text-white mb-2">1. Acceptance of Terms</h3>
                <p className="dark:text-gray-300">
                  By accessing or using our services, you agree to these Terms of Service and our Privacy Policy. If you do not agree to these Terms, you may not access or use our services.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium dark:text-white mb-2">2. Changes to Terms</h3>
                <p className="dark:text-gray-300">
                  We may revise these Terms from time to time. The most current version will always be posted on our website. By continuing to access or use our services after revisions become effective, you agree to be bound by the revised Terms.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium dark:text-white mb-2">3. Account Registration</h3>
                <p className="dark:text-gray-300">
                  To access certain features of our services, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium dark:text-white mb-2">4. User Content</h3>
                <p className="dark:text-gray-300">
                  Our services may allow you to upload, store, share, or otherwise make available certain information, text, graphics, videos, or other material. You retain ownership of any intellectual property rights that you hold in that content.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium dark:text-white mb-2">5. Payment Terms</h3>
                <p className="dark:text-gray-300">
                  Certain aspects of our services may require payment. You agree to pay all fees and charges incurred by your account on a timely basis and according to the fees, charges, and billing terms in effect at the time.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium dark:text-white mb-2">6. Termination</h3>
                <p className="dark:text-gray-300">
                  We may terminate or suspend your account and bar access to our services immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including but not limited to a breach of the Terms.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium dark:text-white mb-2">7. Limitation of Liability</h3>
                <p className="dark:text-gray-300">
                  In no event shall Calendoodles, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use our services.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium dark:text-white mb-2">8. Governing Law</h3>
                <p className="dark:text-gray-300">
                  These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setActiveDialog(null)}>Close</Button>
            </div>
          </DialogContent>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <footer className="bg-white/90 dark:bg-gray-900/95 backdrop-blur-lg border-t dark:border-gray-800/70 py-6 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative z-10 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_15px_rgba(0,0,0,0.2)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <Calendar className="h-6 w-6 text-calendoodle-purple transition-transform group-hover:rotate-12 dark:text-calendoodle-purple/90 dark:filter dark:drop-shadow-[0_0_8px_rgba(155,89,182,0.8)]" />
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-calendoodle-blue to-calendoodle-purple text-transparent bg-clip-text group-hover:from-calendoodle-purple group-hover:to-calendoodle-blue transition-all duration-500">
                Calendoodles
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Simplify your scheduling and appointment management with our intuitive platform.
            </p>
            <div className="flex items-center space-x-4">
              <a href="https://twitter.com/calendoodles" className="text-gray-500 hover:text-calendoodle-blue transition-colors dark:hover:text-calendoodle-blue/90 dark:filter dark:hover:drop-shadow-[0_0_8px_rgba(52,152,219,0.8)]">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://facebook.com/calendoodles" className="text-gray-500 hover:text-calendoodle-blue transition-colors dark:hover:text-calendoodle-blue/90 dark:filter dark:hover:drop-shadow-[0_0_8px_rgba(52,152,219,0.8)]">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://instagram.com/calendoodles" className="text-gray-500 hover:text-calendoodle-blue transition-colors dark:hover:text-calendoodle-blue/90 dark:filter dark:hover:drop-shadow-[0_0_8px_rgba(52,152,219,0.8)]">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://github.com/calendoodles" className="text-gray-500 hover:text-calendoodle-blue transition-colors dark:hover:text-calendoodle-blue/90 dark:filter dark:hover:drop-shadow-[0_0_8px_rgba(52,152,219,0.8)]">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Product</h3>
            <ul className="space-y-3">
              <li>
                <button onClick={() => setActiveDialog("features")} className="text-sm text-gray-600 hover:text-calendoodle-blue dark:text-gray-400 dark:hover:text-calendoodle-blue/90 dark:hover:filter dark:hover:drop-shadow-[0_0_8px_rgba(52,152,219,0.8)]">Features</button>
              </li>
              <li>
                <button onClick={() => setActiveDialog("pricing")} className="text-sm text-gray-600 hover:text-calendoodle-blue dark:text-gray-400 dark:hover:text-calendoodle-blue/90 dark:hover:filter dark:hover:drop-shadow-[0_0_8px_rgba(52,152,219,0.8)]">Pricing</button>
              </li>
              <li>
                <button onClick={() => setActiveDialog("integrations")} className="text-sm text-gray-600 hover:text-calendoodle-blue dark:text-gray-400 dark:hover:text-calendoodle-blue/90 dark:hover:filter dark:hover:drop-shadow-[0_0_8px_rgba(52,152,219,0.8)]">Integrations</button>
              </li>
              <li>
                <button onClick={() => setActiveDialog("changelog")} className="text-sm text-gray-600 hover:text-calendoodle-blue dark:text-gray-400 dark:hover:text-calendoodle-blue/90 dark:hover:filter dark:hover:drop-shadow-[0_0_8px_rgba(52,152,219,0.8)]">Changelog</button>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Support</h3>
            <ul className="space-y-3">
              <li>
                <button onClick={() => setActiveDialog("help")} className="text-sm text-gray-600 hover:text-calendoodle-blue dark:text-gray-400 dark:hover:text-calendoodle-blue/90 dark:hover:filter dark:hover:drop-shadow-[0_0_8px_rgba(52,152,219,0.8)]">Help Center</button>
              </li>
              <li>
                <button onClick={() => setActiveDialog("documentation")} className="text-sm text-gray-600 hover:text-calendoodle-blue dark:text-gray-400 dark:hover:text-calendoodle-blue/90 dark:hover:filter dark:hover:drop-shadow-[0_0_8px_rgba(52,152,219,0.8)]">Documentation</button>
              </li>
              <li>
                <button onClick={() => setActiveDialog("contact")} className="text-sm text-gray-600 hover:text-calendoodle-blue dark:text-gray-400 dark:hover:text-calendoodle-blue/90 dark:hover:filter dark:hover:drop-shadow-[0_0_8px_rgba(52,152,219,0.8)]">Contact Us</button>
              </li>
              <li>
                <Link to="/status" className="text-sm text-gray-600 hover:text-calendoodle-blue dark:text-gray-400 dark:hover:text-calendoodle-blue/90 dark:hover:filter dark:hover:drop-shadow-[0_0_8px_rgba(52,152,219,0.8)]">System Status</Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Legal</h3>
            <ul className="space-y-3">
              <li>
                <button onClick={() => setActiveDialog("privacy")} className="text-sm text-gray-600 hover:text-calendoodle-blue dark:text-gray-400 dark:hover:text-calendoodle-blue/90 dark:hover:filter dark:hover:drop-shadow-[0_0_8px_rgba(52,152,219,0.8)]">Privacy Policy</button>
              </li>
              <li>
                <button onClick={() => setActiveDialog("terms")} className="text-sm text-gray-600 hover:text-calendoodle-blue dark:text-gray-400 dark:hover:text-calendoodle-blue/90 dark:hover:filter dark:hover:drop-shadow-[0_0_8px_rgba(52,152,219,0.8)]">Terms of Service</button>
              </li>
              <li>
                <Link to="/cookies" className="text-sm text-gray-600 hover:text-calendoodle-blue dark:text-gray-400 dark:hover:text-calendoodle-blue/90 dark:hover:filter dark:hover:drop-shadow-[0_0_8px_rgba(52,152,219,0.8)]">Cookie Policy</Link>
              </li>
              <li>
                <Link to="/compliance" className="text-sm text-gray-600 hover:text-calendoodle-blue dark:text-gray-400 dark:hover:text-calendoodle-blue/90 dark:hover:filter dark:hover:drop-shadow-[0_0_8px_rgba(52,152,219,0.8)]">Compliance</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800/70 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {year} Calendoodles. All rights reserved.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 md:mt-0 flex items-center">
            Made with <Heart className="h-4 w-4 text-red-500 mx-1 dark:filter dark:drop-shadow-[0_0_5px_rgba(231,76,60,0.8)]" /> for better scheduling
          </p>
        </div>
      </div>
      
      {/* Dialogs for footer links */}
      {renderDialogContent()}
    </footer>
  );
};

export default Footer;
