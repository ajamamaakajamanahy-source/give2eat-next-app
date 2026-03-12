import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, MapPin, Heart, ShieldCheck, Zap } from 'lucide-react';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useLanguage } from '@/contexts/LanguageContext';

const Landing = () => {
  const { t } = useLanguage();

  return (
    <div className="relative w-full overflow-hidden">

      {/* 1. IMMERSIVE HERO SECTION */}
      <section className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-zinc-900 to-black">
        {/* Static background instead of 3D Canvas for compatibility */}
        <ErrorBoundary fallback={null}>
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.4),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(59,130,246,0.3),_transparent_55%)]" />
        </ErrorBoundary>

        {/* Hero Content Layer */}
        <div className="relative z-10 container px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-mono tracking-widest uppercase text-white/70">{t('landing.badge')}</span>
            </div>

            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 font-serif bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50 drop-shadow-2xl">
              {t('landing.heroTitle1')} <br/> {t('landing.heroTitle2')}
            </h1>
            
            <p className="mx-auto max-w-[600px] text-white/60 md:text-xl font-light mb-10 leading-relaxed">
              {t('landing.heroDesc')}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button size="lg" className="h-14 rounded-full text-lg px-10 bg-white text-black hover:bg-white/90 shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all hover:scale-105 border-0">
                {t('landing.startExploring')}
              </Button>
              <Button variant="outline" size="lg" className="h-14 rounded-full text-lg px-10 border-white/20 bg-black/20 backdrop-blur-md hover:bg-white/10 text-white transition-all hover:scale-105">
                {t('landing.joinNetwork')} <ArrowRight className="ml-2 h-5 w-5" />
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
          <span className="text-[10px] uppercase tracking-[0.2em]">{t('landing.scrollToExplore')}</span>
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
            <h2 className="text-4xl md:text-6xl font-bold font-serif mb-6">{t('landing.systemTitle')}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl">{t('landing.systemDesc')}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Card 1: Large Span */}
            <BentoCard 
              className="md:col-span-2 bg-gradient-to-br from-green-900/20 to-black border-green-500/20"
              icon={<Zap className="w-8 h-8 text-green-400" />}
              title={t('landing.instantBroadcast')}
              desc={t('landing.instantBroadcastDesc')}
            />
            
            {/* Card 2: Vertical */}
            <BentoCard 
              className="md:row-span-2 bg-gradient-to-br from-indigo-900/20 to-black border-indigo-500/20"
              icon={<MapPin className="w-8 h-8 text-indigo-400" />}
              title={t('landing.liveTracking')}
              desc={t('landing.liveTrackingDesc')}
            />

            {/* Card 3: Standard */}
            <BentoCard 
              className="bg-zinc-900/50"
              icon={<ShieldCheck className="w-8 h-8 text-white" />}
              title={t('landing.trustProtocol')}
              desc={t('landing.trustProtocolDesc')}
            />

            {/* Card 4: Standard */}
            <BentoCard 
              className="bg-zinc-900/50"
              icon={<Leaf className="w-8 h-8 text-white" />}
              title={t('landing.zeroWaste')}
              desc={t('landing.zeroWasteDesc')}
            />
          </div>
        </div>
      </section>

      {/* 3. PARALLAX STATS SECTION */}
      <section className="w-full py-40 relative bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-fixed opacity-10 grayscale mix-blend-overlay"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <Stat number="10k+" label={t('landing.mealsRedistributed')} delay={0} />
            <Stat number="500+" label={t('landing.activeNodes')} delay={0.2} />
            <Stat number="50t" label={t('landing.carbonOffset')} delay={0.4} />
            <Stat number="24/7" label={t('landing.networkUptime')} delay={0.6} />
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
