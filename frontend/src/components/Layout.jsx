import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UtensilsCrossed, Menu } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

const Navbar = () => {
  const { t } = useLanguage();
  
  const navItems = [
    { key: 'feed', path: '/feed', label: t('nav.feed') },
    { key: 'donate', path: '/donate', label: t('nav.donate') },
    { key: 'impact', path: '/impact', label: t('nav.impact') },
  ];

  return (
    <nav className="fixed w-full z-50 top-0 left-0 border-b border-white/5 bg-background/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="p-2.5 bg-gradient-to-br from-green-400 to-green-600 rounded-xl text-black shadow-[0_0_15px_rgba(74,222,128,0.3)] group-hover:shadow-[0_0_25px_rgba(74,222,128,0.5)] transition-all duration-300">
                <UtensilsCrossed size={22} strokeWidth={2.5} />
              </div>
              <span className="font-serif font-bold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                Give2Eat
              </span>
            </Link>
            
            {/* Language Switcher - Near Home Button */}
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link 
                key={item.key}
                to={item.path} 
                className="text-sm font-medium text-muted-foreground hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}
            
            <div className="h-6 w-px bg-white/10 mx-2"></div>

            <Link to="/login">
              <Button variant="ghost" className="text-sm hover:bg-white/5 rounded-full px-6">{t('nav.login')}</Button>
            </Link>
            <Link to="/signup">
              <Button className="rounded-full bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.2)] px-8 font-bold transition-transform active:scale-95">
                {t('nav.joinNow')}
              </Button>
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <Button variant="ghost" size="icon"><Menu /></Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Layout = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-sans selection:bg-green-500/30 overflow-x-hidden dark">
      {/* Cinematic Noise Overlay */}
      <div className="fixed inset-0 z-[60] pointer-events-none opacity-[0.03] mix-blend-overlay" 
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
      
      {/* Ambient Background Glows */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse delay-700"></div>

      <Navbar />
      
      <main className="flex-grow pt-20 z-10 relative">
        <Outlet />
      </main>
      
      <footer className="border-t border-white/5 bg-black/50 backdrop-blur-lg py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center text-muted-foreground text-sm">
          <p>{t('footer.copyright')}</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
