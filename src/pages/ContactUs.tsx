
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, ExternalLink, MessageSquare, FileText, Shield, Cookie } from "lucide-react";

const ContactUs = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "We've received your message and will get back to you soon.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-calendoodle-blue to-calendoodle-purple bg-clip-text text-transparent">Contact Us</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          We'd love to hear from you! Reach out to our team with any questions, feedback, or inquiries.
        </p>
      </div>

      <Tabs defaultValue="contact" className="max-w-5xl mx-auto">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
        </TabsList>
        
        <TabsContent value="contact">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2 shadow-lg dark:shadow-glow-blue">
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Please describe your question or feedback..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      required
                    />
                  </div>
                  <Button type="submit" className="calendoodle-btn-primary">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="shadow-md dark:shadow-glow-purple">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Our Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 mt-0.5 text-calendoodle-blue" />
                    <div>
                      <p className="font-medium">Email Us</p>
                      <a href="mailto:info@calendoodles.com" className="text-sm text-calendoodle-blue hover:underline">
                        info@calendoodles.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 mt-0.5 text-calendoodle-green" />
                    <div>
                      <p className="font-medium">Call Us</p>
                      <a href="tel:+15551234567" className="text-sm text-calendoodle-green hover:underline">
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 mt-0.5 text-calendoodle-red" />
                    <div>
                      <p className="font-medium">Our Office</p>
                      <address className="text-sm not-italic">
                        123 Appointment Street<br />
                        Suite 456<br />
                        Calendar City, CC 12345
                      </address>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 mt-0.5 text-calendoodle-orange" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-sm">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md dark:shadow-glow-green">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Connect With Us</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-center gap-4">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                      </svg>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                      </svg>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                      </svg>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                        <rect x="2" y="9" width="4" height="12"/>
                        <circle cx="4" cy="4" r="2"/>
                      </svg>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="support">
          <Card className="shadow-lg dark:shadow-glow-blue">
            <CardHeader>
              <CardTitle>Support Options</CardTitle>
              <CardDescription>
                Choose the support option that works best for you
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="h-6 w-6 text-calendoodle-blue" />
                  <h3 className="text-xl font-medium">Live Chat</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Chat with our customer support team in real-time for immediate assistance.
                </p>
                <Button className="calendoodle-btn-primary">
                  Start Chat
                </Button>
                <p className="text-sm text-gray-500 mt-2">Available: 9AM - 8PM EST</p>
              </div>
              
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-4">
                  <Mail className="h-6 w-6 text-calendoodle-green" />
                  <h3 className="text-xl font-medium">Email Support</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Send us an email with your questions or issues, and we'll respond within 24 hours.
                </p>
                <Button variant="outline" className="border-calendoodle-green text-calendoodle-green hover:bg-calendoodle-green/10">
                  Email Us
                </Button>
                <p className="text-sm text-gray-500 mt-2">support@calendoodles.com</p>
              </div>
              
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-6 w-6 text-calendoodle-purple" />
                  <h3 className="text-xl font-medium">Knowledge Base</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Find answers to common questions in our comprehensive documentation.
                </p>
                <Button variant="outline" className="border-calendoodle-purple text-calendoodle-purple hover:bg-calendoodle-purple/10">
                  Browse Articles <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-4">
                  <Phone className="h-6 w-6 text-calendoodle-orange" />
                  <h3 className="text-xl font-medium">Phone Support</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Call us directly to speak with a customer support representative.
                </p>
                <Button variant="outline" className="border-calendoodle-orange text-calendoodle-orange hover:bg-calendoodle-orange/10">
                  +1 (555) 987-6543
                </Button>
                <p className="text-sm text-gray-500 mt-2">Available: Mon-Fri, 9AM - 5PM EST</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="policies">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/privacy-policy" className="block">
              <Card className="h-full shadow-md hover:shadow-lg transition-shadow cursor-pointer hover:border-calendoodle-blue/50 dark:hover:shadow-glow-blue">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-calendoodle-blue" />
                    <CardTitle>Privacy Policy</CardTitle>
                  </div>
                  <CardDescription>
                    Learn how we collect, use, and protect your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our privacy policy outlines our commitment to protecting your data and explains your rights regarding the information we collect.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="text-calendoodle-blue">
                    Read Privacy Policy <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </Link>
            
            <Link to="/terms-of-service" className="block">
              <Card className="h-full shadow-md hover:shadow-lg transition-shadow cursor-pointer hover:border-calendoodle-purple/50 dark:hover:shadow-glow-purple">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-calendoodle-purple" />
                    <CardTitle>Terms of Service</CardTitle>
                  </div>
                  <CardDescription>
                    Understand the terms governing the use of our platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our terms of service detail the rules, guidelines, and obligations when using Calendoodles, including your rights and responsibilities.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="text-calendoodle-purple">
                    Read Terms of Service <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </Link>
            
            <Link to="/cookie-policy" className="block">
              <Card className="h-full shadow-md hover:shadow-lg transition-shadow cursor-pointer hover:border-calendoodle-orange/50 dark:hover:shadow-glow-orange">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Cookie className="h-5 w-5 text-calendoodle-orange" />
                    <CardTitle>Cookie Policy</CardTitle>
                  </div>
                  <CardDescription>
                    Information about how we use cookies and similar technologies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our cookie policy explains what cookies are, how we use them, and what options you have regarding their use on our platform.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="text-calendoodle-orange">
                    Read Cookie Policy <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </Link>
            
            <Link to="/compliance" className="block">
              <Card className="h-full shadow-md hover:shadow-lg transition-shadow cursor-pointer hover:border-calendoodle-green/50 dark:hover:shadow-glow-green">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-calendoodle-green" />
                    <CardTitle>Compliance</CardTitle>
                  </div>
                  <CardDescription>
                    Learn about our commitment to legal and regulatory compliance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our compliance page outlines how we adhere to various regulations and industry standards, including GDPR, CCPA, and HIPAA where applicable.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="text-calendoodle-green">
                    Read Compliance Information <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          </div>
        </TabsContent>
      </Tabs>

      <Separator className="my-8" />

      <div className="text-center text-sm text-gray-500 dark:text-gray-400 space-y-2">
        <p>© {new Date().getFullYear()} Calendoodles. All rights reserved.</p>
      </div>
    </div>
  );
};

export default ContactUs;
