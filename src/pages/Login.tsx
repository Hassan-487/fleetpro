import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Truck, AlertCircle } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const success = login(email, password);
    
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password. Try admin@demo.com / admin123');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-secondary p-12 flex-col justify-between">
        <div className="flex items-center gap-3">
          <Truck className="h-10 w-10 text-primary" />
          <span className="text-2xl font-bold text-secondary-foreground">FleetPro</span>
        </div>
        
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-secondary-foreground leading-tight">
            Manage Your Fleet<br />
            with Confidence
          </h1>
          <p className="text-lg text-secondary-foreground/70 max-w-md">
            Real-time tracking, driver management, and intelligent alerts — 
            all in one powerful dashboard.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-lg font-bold text-primary">24</span>
            </div>
            <div>
              <p className="font-medium text-secondary-foreground">Active Vehicles</p>
              <p className="text-sm text-secondary-foreground/60">Across all locations</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-success/20 flex items-center justify-center">
              <span className="text-lg font-bold text-success">98%</span>
            </div>
            <div>
              <p className="font-medium text-secondary-foreground">Fleet Uptime</p>
              <p className="text-sm text-secondary-foreground/60">Industry-leading reliability</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <Truck className="h-10 w-10 text-primary" />
            <span className="text-2xl font-bold text-foreground">FleetPro</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">Welcome back</h2>
            <p className="text-muted-foreground">
              Enter your credentials to access your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center gap-2 p-4 bg-destructive/10 text-destructive rounded-lg">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@demo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12"
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
                className="h-12"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-base font-medium"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <div className="text-center space-y-2 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Demo Credentials
            </p>
            <p className="text-sm font-mono bg-muted px-3 py-2 rounded">
              admin@demo.com / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
