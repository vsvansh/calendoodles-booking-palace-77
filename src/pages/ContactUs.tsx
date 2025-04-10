
import { useState } from "react";
import { Mail, Phone, MessageCircle, Send, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactUs = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would send this data to your backend
    console.log({ name, email, message });
    
    // Show success message
    toast({
      title: "Message sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
      duration: 5000,
    });
    
    setSubmitted(true);
    
    // Reset form
    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4 animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 dark:text-white">
        Get in Touch
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
        We're here to help and answer any questions you might have. We look forward to hearing from you!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Contact Form */}
        <Card className="border shadow-lg dark:bg-gray-900/50 dark:border-gray-800 backdrop-blur-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-calendoodle-purple dark:text-calendoodle-blue dark:blue-glow" />
              Send us a message
            </CardTitle>
            <CardDescription>Fill out the form below to get in touch with our team</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1 dark:text-gray-200">
                  Name
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="dark:bg-gray-800 dark:border-gray-700 dark:focus:border-calendoodle-blue/50 transition-all"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1 dark:text-gray-200">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="dark:bg-gray-800 dark:border-gray-700 dark:focus:border-calendoodle-blue/50 transition-all"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1 dark:text-gray-200">
                  Message
                </label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you?"
                  rows={5}
                  required
                  className="resize-none dark:bg-gray-800 dark:border-gray-700 dark:focus:border-calendoodle-blue/50 transition-all"
                />
              </div>
              <Button 
                type="submit"
                variant="gradient"
                className="w-full py-6 mt-4 group"
                disabled={submitted}
              >
                {submitted ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 animate-pulse" />
                    Message sent!
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    Send message
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <div className="space-y-8">
          <Card className="border shadow-lg dark:bg-gray-900/50 dark:border-gray-800 backdrop-blur-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-calendoodle-purple dark:text-calendoodle-blue dark:blue-glow" />
                Contact Information
              </CardTitle>
              <CardDescription>Find us using the information below</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-calendoodle-purple dark:text-calendoodle-blue" />
                </div>
                <div>
                  <p className="text-sm font-medium dark:text-gray-200">Email</p>
                  <a href="mailto:support@calendoodles.com" className="text-sm text-blue-600 dark:text-calendoodle-blue hover:underline">
                    support@calendoodles.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-calendoodle-purple dark:text-calendoodle-blue" />
                </div>
                <div>
                  <p className="text-sm font-medium dark:text-gray-200">Phone</p>
                  <a href="tel:+11234567890" className="text-sm text-blue-600 dark:text-calendoodle-blue hover:underline">
                    +1 (123) 456-7890
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-calendoodle-purple dark:text-calendoodle-blue" />
                </div>
                <div>
                  <p className="text-sm font-medium dark:text-gray-200">Location</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    123 Calendoodle St.<br />
                    San Francisco, CA 94105
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-lg dark:bg-gray-900/50 dark:border-gray-800 backdrop-blur-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg">Hours of Operation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium dark:text-gray-300">Monday - Friday</span>
                  <span className="text-sm dark:text-gray-400">9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium dark:text-gray-300">Saturday</span>
                  <span className="text-sm dark:text-gray-400">10:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium dark:text-gray-300">Sunday</span>
                  <span className="text-sm dark:text-gray-400">Closed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer Links Section */}
      <div className="mt-16 border-t dark:border-gray-800 pt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4 dark:text-white">Platform</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-600 dark:text-gray-400 hover:text-calendoodle-purple dark:hover:text-calendoodle-blue transition-colors">Home</a></li>
              <li><a href="/calendar" className="text-gray-600 dark:text-gray-400 hover:text-calendoodle-purple dark:hover:text-calendoodle-blue transition-colors">Calendar</a></li>
              <li><a href="/appointments" className="text-gray-600 dark:text-gray-400 hover:text-calendoodle-purple dark:hover:text-calendoodle-blue transition-colors">Appointments</a></li>
              <li><a href="/services" className="text-gray-600 dark:text-gray-400 hover:text-calendoodle-purple dark:hover:text-calendoodle-blue transition-colors">Services</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 dark:text-white">Company</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-600 dark:text-gray-400 hover:text-calendoodle-purple dark:hover:text-calendoodle-blue transition-colors">About Us</a></li>
              <li><a href="/careers" className="text-gray-600 dark:text-gray-400 hover:text-calendoodle-purple dark:hover:text-calendoodle-blue transition-colors">Careers</a></li>
              <li><a href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-calendoodle-purple dark:hover:text-calendoodle-blue transition-colors">Blog</a></li>
              <li><a href="/press" className="text-gray-600 dark:text-gray-400 hover:text-calendoodle-purple dark:hover:text-calendoodle-blue transition-colors">Press</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 dark:text-white">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/help" className="text-gray-600 dark:text-gray-400 hover:text-calendoodle-purple dark:hover:text-calendoodle-blue transition-colors">Help Center</a></li>
              <li><a href="/guides" className="text-gray-600 dark:text-gray-400 hover:text-calendoodle-purple dark:hover:text-calendoodle-blue transition-colors">Guides</a></li>
              <li><a href="/api" className="text-gray-600 dark:text-gray-400 hover:text-calendoodle-purple dark:hover:text-calendoodle-blue transition-colors">API</a></li>
              <li><a href="/community" className="text-gray-600 dark:text-gray-400 hover:text-calendoodle-purple dark:hover:text-calendoodle-blue transition-colors">Community</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 dark:text-white">Legal</h3>
            <ul className="space-y-2">
              <li><a href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-calendoodle-purple dark:hover:text-calendoodle-blue transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-calendoodle-purple dark:hover:text-calendoodle-blue transition-colors">Terms of Service</a></li>
              <li><a href="/cookies" className="text-gray-600 dark:text-gray-400 hover:text-calendoodle-purple dark:hover:text-calendoodle-blue transition-colors">Cookie Policy</a></li>
              <li><a href="/compliance" className="text-gray-600 dark:text-gray-400 hover:text-calendoodle-purple dark:hover:text-calendoodle-blue transition-colors">Compliance</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 text-center pt-8 border-t dark:border-gray-800">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} Calendoodles. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
