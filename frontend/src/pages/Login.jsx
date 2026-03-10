import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Real Supabase Auth (will fail without valid keys)
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Check your email for the magic link!');
    }
    setLoading(false);
  };

  const handleDemoLogin = () => {
    // Set a demo token in localStorage for testing
    localStorage.setItem('demo_token', 'demo-token-123');
    navigate('/donate');
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-white/20 bg-white/80 backdrop-blur-md">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-primary font-serif">Welcome Back</CardTitle>
            <CardDescription>Enter your email to sign in or create an account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="email"
                placeholder="hello@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 text-lg"
              />
              <Button type="submit" className="w-full h-12 text-lg rounded-full" disabled={loading}>
                {loading ? 'Sending Magic Link...' : 'Send Magic Link'}
              </Button>
              {message && <p className="text-center text-sm text-muted-foreground mt-4">{message}</p>}
            
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <Button 
                type="button" 
                variant="outline" 
                className="w-full h-12 text-lg rounded-full border-primary text-primary hover:bg-primary/10"
                onClick={handleDemoLogin}
              >
                Demo Login (Skip Auth)
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
