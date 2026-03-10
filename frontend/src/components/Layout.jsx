import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UtensilsCrossed } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 top-0 left-0 border-b border-white/20 bg-white/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-full text-white">
              <UtensilsCrossed size={20} />
            </div>
            <span className="font-serif font-bold text-xl tracking-tight text-foreground">Give2Eat</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/feed" className="text-sm font-medium hover:text-primary transition-colors">Find Food</Link>
            <Link to="/donate" className="text-sm font-medium hover:text-primary transition-colors">Donate Food</Link>
            <Link to="/login">
              <Button variant="outline" size="sm" className="rounded-full">Log In</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="rounded-full shadow-lg hover:shadow-primary/25">Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-muted/30 py-12 mt-auto border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-muted-foreground font-sans">
          &copy; {new Date().getFullYear()} Give2Eat. Connecting communities, one meal at a time.
        </p>
      </div>
    </footer>
  );
};

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans selection:bg-primary/20">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40" 
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
      <Navbar />
      <main className="flex-grow pt-20 z-10 relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
