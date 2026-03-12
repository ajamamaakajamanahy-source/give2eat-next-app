import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Real Supabase Auth (will fail without valid keys)
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage(t('login.checkEmail'));
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
            <CardTitle className="text-4xl text-white font-serif mb-2">{t('login.welcomeBack')}</CardTitle>
            <CardDescription className="text-white/50">{t('login.enterEmail')}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <Input
                type="email"
                placeholder={t('login.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-14 text-lg bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-green-500/50 rounded-xl"
              />
              <Button type="submit" className="w-full h-14 text-lg rounded-full bg-white text-black hover:bg-gray-200 transition-all font-bold" disabled={loading}>
                {loading ? t('login.sendingMagicLink') : t('login.sendMagicLink')}
              </Button>
              {message && <p className="text-center text-sm text-green-400 mt-4">{message}</p>}
            
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-black px-2 text-white/30">{t('login.orContinueWith')}</span>
                </div>
              </div>

              <Button 
                type="button" 
                variant="outline" 
                className="w-full h-14 text-lg rounded-full border-white/20 text-white hover:bg-white/10"
                onClick={handleDemoLogin}
              >
                {t('login.demoLogin')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
