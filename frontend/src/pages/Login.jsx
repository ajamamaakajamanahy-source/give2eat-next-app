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
    <div className="flex items-center justify-center min-h-[80vh] px-4 relative z-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-white/10 bg-black/60 backdrop-blur-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl text-white font-serif mb-2">Welcome Back</CardTitle>
            <CardDescription className="text-white/50">Enter your email to sign in or create an account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <Input
                type="email"
                placeholder="hello@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-14 text-lg bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-green-500/50 rounded-xl"
              />
              <Button type="submit" className="w-full h-14 text-lg rounded-full bg-white text-black hover:bg-gray-200 transition-all font-bold" disabled={loading}>
                {loading ? 'Sending Magic Link...' : 'Send Magic Link'}
              </Button>
              {message && <p className="text-center text-sm text-green-400 mt-4">{message}</p>}
            
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-black px-2 text-white/30">Or continue with</span>
                </div>
              </div>

              <Button 
                type="button" 
                variant="outline" 
                className="w-full h-14 text-lg rounded-full border-white/20 text-white hover:bg-white/10"
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
