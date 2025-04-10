
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Check, Mail, MapPin, Phone, MessageSquare, Calendar, Clock, ExternalLink, Facebook, Twitter, Instagram, Linkedin, Youtube, ChevronRight, ArrowRight } from "lucide-react";

const ContactUs = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiry: "general"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInquiryChange = (value: string) => {
    setFormData(prev => ({ ...prev, inquiry: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        inquiry: "general"
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-calendoodle-blue/10 to-calendoodle-purple/10 dark:from-calendoodle-blue/20 dark:to-calendoodle-purple/20 rounded-xl p-8 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/40 dark:bg-black/20 backdrop-blur-sm z-0"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
            Have questions or need assistance? We're here to help! Reach out to our team for support, inquiries, or feedback.
          </p>
        </div>
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-calendoodle-purple opacity-10 rounded-full filter blur-3xl animate-pulse-subtle"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card className="border-2 border-gray-100 dark:border-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      placeholder="Your name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="your.email@example.com" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="inquiry">Inquiry Type</Label>
                    <Select value={formData.inquiry} onValueChange={handleInquiryChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Question</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="billing">Billing Question</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input 
                      id="subject" 
                      name="subject" 
                      placeholder="What is this about?" 
                      value={formData.subject} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    placeholder="How can we help you?" 
                    rows={5} 
                    value={formData.message} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                
                <Button type="submit" className="w-full calendoodle-btn-primary rounded-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>Sending... <Mail className="ml-2 h-4 w-4 animate-bounce" /></>
                  ) : (
                    <>Send Message <ArrowRight className="ml-2 h-4 w-4" /></>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        
        {/* Contact Information */}
        <div className="space-y-6">
          <Card className="border-2 border-gray-100 dark:border-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Here's how you can reach us directly.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-calendoodle-blue/10 text-calendoodle-blue">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Email Us</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">contact@calendoodles.com</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">support@calendoodles.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-calendoodle-green/10 text-calendoodle-green">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Phone Support</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">+1 (555) 123-4567</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Mon-Fri, 9AM-6PM EST</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-calendoodle-orange/10 text-calendoodle-orange">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Our Location</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">123 Calendar Street</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Appointment City, AC 12345</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-calendoodle-purple/10 text-calendoodle-purple">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Business Hours</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Monday - Friday: 9AM - 6PM</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Weekend: Closed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-gray-100 dark:border-gray-800 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle>Connect With Us</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mt-2">
                <Button variant="outline" size="icon" className="rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-400 dark:hover:text-blue-300">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-500 dark:hover:text-pink-400">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-500">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-500">
                  <Youtube className="h-5 w-5" />
                  <span className="sr-only">YouTube</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all duration-300">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-100">How do I reset my password?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                You can reset your password by clicking on the "Forgot Password" link on the login page. You will receive an email with instructions to reset your password.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all duration-300">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-100">Can I cancel my subscription?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, you can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all duration-300">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-100">How secure is my data?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We take data security very seriously. We use industry-standard encryption and security measures to protect your information. You can learn more in our Privacy Policy.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all duration-300">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-100">Can I integrate with other services?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, Calendoodles integrates with many popular services including Google Calendar, Outlook, Zoom, and more. Check our Integrations page for more details.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Footer content moved from footer */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-6 w-6 text-calendoodle-purple" />
              <span className="tracking-tight bg-gradient-to-r from-calendoodle-blue to-calendoodle-purple text-transparent bg-clip-text text-2xl font-bold">
                Calendoodles
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              Simplify scheduling and appointment management with our intuitive platform. Streamline your business operations and focus on what matters most.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-calendoodle-blue p-0 h-auto">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-calendoodle-blue p-0 h-auto">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-calendoodle-blue p-0 h-auto">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-calendoodle-blue p-0 h-auto">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about-us" className="text-gray-600 dark:text-gray-400 hover:text-calendoodle-blue dark:hover:text-calendoodle-blue transition-colors flex items-center gap-1">
                  <ChevronRight className="h-4 w-4" /> About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 dark:text-gray-400 hover:text-calendoodle-blue dark:hover:text-calendoodle-blue transition-colors flex items-center gap-1">
                  <ChevronRight className="h-4 w-4" /> Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-calendoodle-blue dark:hover:text-calendoodle-blue transition-colors flex items-center gap-1">
                  <ChevronRight className="h-4 w-4" /> Blog
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="text-gray-600 dark:text-gray-400 hover:text-calendoodle-blue dark:hover:text-calendoodle-blue transition-colors flex items-center gap-1">
                  <ChevronRight className="h-4 w-4" /> Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy-policy" className="text-gray-600 dark:text-gray-400 hover:text-calendoodle-blue dark:hover:text-calendoodle-blue transition-colors flex items-center gap-1">
                  <ChevronRight className="h-4 w-4" /> Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-600 dark:text-gray-400 hover:text-calendoodle-blue dark:hover:text-calendoodle-blue transition-colors flex items-center gap-1">
                  <ChevronRight className="h-4 w-4" /> Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-gray-600 dark:text-gray-400 hover:text-calendoodle-blue dark:hover:text-calendoodle-blue transition-colors flex items-center gap-1">
                  <ChevronRight className="h-4 w-4" /> Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/compliance" className="text-gray-600 dark:text-gray-400 hover:text-calendoodle-blue dark:hover:text-calendoodle-blue transition-colors flex items-center gap-1">
                  <ChevronRight className="h-4 w-4" /> Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Calendoodles. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
