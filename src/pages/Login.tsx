
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock login - in a real app, this would call an API
    setTimeout(() => {
      // For demo purposes, any login works
      toast({
        title: "Login successful!",
        description: "Welcome back to Calendoodles!",
      });
      setIsLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-calendoodle-cream/30 p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <div className="flex justify-center">
            <Calendar className="h-12 w-12 text-calendoodle-purple animate-bounce" />
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-calendoodle-charcoal">
            Welcome back to Calendoodles
          </h1>
          <p className="mt-2 text-lg text-gray-500">
            Sign in to manage your appointments
          </p>
        </div>

        <Card className="calendoodle-card">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-xl text-center">Sign In</CardTitle>
              <CardDescription className="text-center">
                Enter your email and password to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link 
                    to="/forgot-password" 
                    className="text-sm font-medium text-calendoodle-blue hover:text-calendoodle-blue/80"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
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
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
              <p className="text-center text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="font-medium text-calendoodle-blue hover:text-calendoodle-blue/80">
                  Create one now
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
