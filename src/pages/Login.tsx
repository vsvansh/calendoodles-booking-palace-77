
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      setIsLoading(false);
      
      if (email === "demo@calendoodles.com" && password === "password") {
        toast({
          title: "Login successful",
          description: "Welcome back to Calendoodles!",
        });
        navigate("/");
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Try demo@calendoodles.com / password",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <div className="dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-calendoodle-blue/10 dark:via-transparent dark:to-transparent fixed inset-0 z-0"></div>
      
      <header className="py-4 px-6 flex justify-between items-center relative z-10">
        <Link to="/" className="flex items-center gap-2 group">
          <Calendar className="h-6 w-6 text-calendoodle-purple transition-transform group-hover:rotate-12" />
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-calendoodle-blue to-calendoodle-purple text-transparent bg-clip-text">
            Calendoodles
          </span>
        </Link>
        <ThemeToggle />
      </header>
      
      <div className="flex flex-1 items-center justify-center p-4 sm:p-6 relative z-10">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center text-sm text-calendoodle-blue hover:text-calendoodle-purple">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to home
            </Link>
            <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">Welcome back</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Sign in to your account to continue
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 px-6 py-8 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 mt-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    placeholder="you@example.com"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 calendoodle-input"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-calendoodle-blue hover:text-calendoodle-purple">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 calendoodle-input"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1.5"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe} 
                    onCheckedChange={(checked) => {
                      setRememberMe(checked as boolean);
                    }} 
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full calendoodle-btn calendoodle-btn-primary"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
              
              <div className="text-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-calendoodle-blue hover:text-calendoodle-purple font-medium">
                    Sign up
                  </Link>
                </span>
              </div>
            </form>
            
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300 dark:border-gray-600"></span>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="outline" className="calendoodle-input">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="calendoodle-input">
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.09 19.12C8.24 19.36 7.37 19.44 6.46 19.5C6.36 18.94 6.26 18.38 6.25 17.82C5.92 17.75 5.56 17.75 5.24 17.69C4.7 17.59 4.27 17.32 3.91 16.92C3.35 16.27 3.11 15.49 3 14.67C2.86 13.68 2.78 12.68 2.78 11.68C2.78 10.73 2.94 9.81 3.29 8.93C4.13 6.85 5.6 5.72 7.8 5.68C9.22 5.65 10.63 5.68 12.05 5.68C13.53 5.68 15.01 5.68 16.49 5.68C16.77 9.74 14.34 14.54 10.77 18.26C10.4 18.65 9.75 18.89 9.09 19.12Z" />
                    <path d="M20.38000 5.7C20.60000 6.37 20.87000 7.07 21.00000 7.8C21.10000 8.37 21.00000 8.97 21.00000 9.67C20.81000 9.5 20.68000 9.39 20.56000 9.27C19.27000 8 17.56000 7.71 15.82000 7.8C14.02000 7.89 12.24000 8.13 10.52000 8.76C8.33000 9.57 6.47000 10.83 4.92000 12.5C3.85000 13.66 3.00000 14.96 2.63000 16.5C2.28000 17.98 2.38000 19.44 3.01000 20.85C3.47000 21.85 4.30000 22.5 5.38000 22.79C6.12000 22.98 6.86000 23.08 7.62000 23C9.35000 22.84 10.8500 22.1 12.2100 21.12C14.2600 19.64 16.0200 17.85 17.5000 15.81C18.6400 14.25 19.5200 12.57 19.9600 10.68C20.2000 9.68 20.3300 8.67 20.3800 7.66V5.7H20.38000Z" />
                  </svg>
                  Apple
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
