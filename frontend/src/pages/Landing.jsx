import React, { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, MapPin, Heart, ShieldCheck, Zap } from 'lucide-react';
import Hero3D from '@/components/Hero3D'; // We'll assume this is created as planned

const Landing = () => {
  return (
    <div className="relative w-full overflow-hidden">
      
      {/* 1. IMMERSIVE HERO SECTION */}
      <section className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden">
        {/* 3D Background Layer */}
        <Suspense fallback={null}>
            <Hero3D />
        </Suspense>

        {/* Hero Content Layer */}
        <div className="relative z-10 container px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-mono tracking-widest uppercase text-white/70">Live Network Active</span>
            </div>

            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 font-serif bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50 drop-shadow-2xl">
              Future of <br/> Food Sharing
            </h1>
            
            <p className="mx-auto max-w-[600px] text-white/60 md:text-xl font-light mb-10 leading-relaxed">
              Connect surplus with need in a decentralized, high-speed network. 
              Zero waste. Zero friction. 100% Impact.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button size="lg" className="h-14 rounded-full text-lg px-10 bg-white text-black hover:bg-white/90 shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all hover:scale-105 border-0">
                Start Exploring
              </Button>
              <Button variant="outline" size="lg" className="h-14 rounded-full text-lg px-10 border-white/20 bg-black/20 backdrop-blur-md hover:bg-white/10 text-white transition-all hover:scale-105">
                Join Network <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll to Explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>
        </motion.div>
      </section>


      {/* 2. BENTO GRID 'HOW IT WORKS' */}
      <section className="w-full py-32 bg-black relative z-20">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold font-serif mb-6">System Architecture</h2>
            <p className="text-xl text-muted-foreground max-w-2xl">A three-step protocol to redistribute resources efficiently.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Card 1: Large Span */}
            <BentoCard 
              className="md:col-span-2 bg-gradient-to-br from-green-900/20 to-black border-green-500/20"
              icon={<Zap className="w-8 h-8 text-green-400" />}
              title="Instant Broadcast"
              desc="Donors post food in <10s. Our geo-algorithm instantly notifies the nearest receivers."
            />
            
            {/* Card 2: Vertical */}
            <BentoCard 
              className="md:row-span-2 bg-gradient-to-br from-indigo-900/20 to-black border-indigo-500/20"
              icon={<MapPin className="w-8 h-8 text-indigo-400" />}
              title="Live Tracking"
              desc="Real-time map overlay with distance calculation and verified pickup zones. Watch the network pulse in real-time."
            />

            {/* Card 3: Standard */}
            <BentoCard 
              className="bg-zinc-900/50"
              icon={<ShieldCheck className="w-8 h-8 text-white" />}
              title="Trust Protocol"
              desc="Community verification and rating system ensures safety."
            />

            {/* Card 4: Standard */}
            <BentoCard 
              className="bg-zinc-900/50"
              icon={<Leaf className="w-8 h-8 text-white" />}
              title="Zero Waste"
              desc="Analytics dashboard to track your environmental impact."
            />
          </div>
        </div>
      </section>

      {/* 3. PARALLAX STATS SECTION */}
      <section className="w-full py-40 relative bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-fixed opacity-10 grayscale mix-blend-overlay"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <Stat number="10k+" label="Meals Redistributed" delay={0} />
            <Stat number="500+" label="Active Nodes" delay={0.2} />
            <Stat number="50t" label="Carbon Offset" delay={0.4} />
            <Stat number="24/7" label="Network Uptime" delay={0.6} />
          </div>
        </div>
      </section>

    </div>
  );
};

const BentoCard = ({ className, icon, title, desc }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className={`p-8 rounded-3xl border border-white/10 backdrop-blur-sm flex flex-col justify-between overflow-hidden relative group ${className}`}
  >
    <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
      <ArrowRight className="-rotate-45 w-6 h-6" />
    </div>
    
    <div className="p-3 bg-white/5 w-fit rounded-2xl mb-4 backdrop-blur-md border border-white/5">
      {icon}
    </div>
    
    <div>
      <h3 className="text-2xl font-bold font-serif mb-3 text-white">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

const Stat = ({ number, label, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8 }}
    className="flex flex-col items-center"
  >
    <h3 className="text-5xl md:text-7xl font-bold text-white mb-2 font-serif tracking-tight">{number}</h3>
    <p className="text-sm font-mono uppercase tracking-widest text-white/50">{label}</p>
  </motion.div>
);

export default Landing;
