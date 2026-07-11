import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate('/admin/dashboard');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(username, password);
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, hsl(var(--secondary) / 0.1) 0%, transparent 50%)',
        }} />
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md relative glass-card border-white/10 animate-fade-in">
        <CardHeader className="space-y-6 text-center pb-8">
          {/* Logo/Brand */}
          <div className="flex justify-center">
            <img
              src="/uploads/logo.png"
              alt="NJ Creative Firm"
              className="h-24 w-auto object-contain"
            />
          </div>
          
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Admin Portal
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Sign in to access the NJ Creative dashboard
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pb-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-11 bg-input/50 border-border/50 focus:border-secondary focus:ring-secondary/20"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 bg-input/50 border-border/50 focus:border-secondary focus:ring-secondary/20"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-foreground font-semibold shadow-lg hover:shadow-glow transition-all duration-300 hover:-translate-y-0.5" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
