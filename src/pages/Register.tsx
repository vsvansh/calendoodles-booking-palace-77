
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RegisterProps {
  showBackButton?: boolean;
}

const Register = ({ showBackButton = false }: RegisterProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!name || !email || !password || !agreeTerms) {
      toast({
        title: "Error",
        description: "Please fill all fields and agree to terms",
        variant: "destructive"
      });
      return;
    }

    // Success toast
    toast({
      title: "Account created!",
      description: "Welcome to Calendoodles!",
    });
    
    // Redirect to dashboard after successful registration
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900/95 p-4 animate-fade-in">
      <div className="dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-calendoodle-blue/10 dark:via-transparent dark:to-transparent fixed inset-0 z-0 pointer-events-none"></div>
      
      <div className="w-full max-w-md">
        {showBackButton && (
          <Link to="/" className="block mb-4 text-calendoodle-blue hover:underline">
            ← Back to Home
          </Link>
        )}
        
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <Calendar className="h-8 w-8 text-calendoodle-purple transition-transform group-hover:rotate-12" />
            <span className="font-bold text-2xl tracking-tight bg-gradient-to-r from-calendoodle-blue to-calendoodle-purple text-transparent bg-clip-text group-hover:from-calendoodle-purple group-hover:to-calendoodle-blue transition-all duration-500">
              Calendoodles
            </span>
          </Link>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Create your account</p>
        </div>
        
        <Card className="border-2 shadow-lg dark:shadow-calendoodle-purple/5 dark:bg-gray-900/80 dark:border-gray-800">
          <CardHeader className="space-y-1 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Sign up</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Enter your information to create an account
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Must be at least 8 characters with a number and a special character
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                  required
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-300"
                >
                  I agree to the{" "}
                  <Link to="/terms" className="text-calendoodle-blue dark:text-calendoodle-blue/90 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-calendoodle-blue dark:text-calendoodle-blue/90 hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              <Button type="submit" className="w-full bg-calendoodle-purple hover:bg-calendoodle-purple/90 dark:text-white">
                Create Account
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-900/80 px-2 text-gray-500">Or continue with</span>
              </div>
            </div>
            <div className="flex gap-2 w-full">
              <Button variant="outline" className="w-full">
                Google
              </Button>
              <Button variant="outline" className="w-full">
                Apple
              </Button>
            </div>
            <div className="text-center text-sm mt-2">
              Already have an account?{" "}
              <Link to="/login" className="underline text-calendoodle-blue dark:text-calendoodle-blue/90">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;
