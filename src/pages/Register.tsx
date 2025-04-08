
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords match",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Mock registration - in a real app, this would call an API
    setTimeout(() => {
      toast({
        title: "Registration successful!",
        description: "Welcome to Calendoodles!",
      });
      setIsLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-calendoodle-cream/30 p-4">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        <div className="text-center">
          <div className="flex justify-center">
            <Calendar className="h-12 w-12 text-calendoodle-purple animate-bounce" />
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-calendoodle-charcoal">
            Join Calendoodles Today
          </h1>
          <p className="mt-2 text-lg text-gray-500">
            Create an account to start booking
          </p>
        </div>

        <Card className="calendoodle-card">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-xl text-center">Create Account</CardTitle>
              <CardDescription className="text-center">
                Fill in your details to create your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="calendoodle-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="calendoodle-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="calendoodle-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="calendoodle-input"
                />
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-4">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full calendoodle-btn calendoodle-btn-primary"
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
              <p className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-calendoodle-blue hover:text-calendoodle-blue/80">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;
