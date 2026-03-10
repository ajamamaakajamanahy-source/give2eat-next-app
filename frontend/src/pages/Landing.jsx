import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, MapPin, Heart } from 'lucide-react';

const Landing = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full py-24 md:py-32 lg:py-40 bg-gradient-to-b from-primary/5 to-transparent overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
        <div className="container px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 font-serif">
              Share Food, <span className="text-primary">Share Hope</span>.
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl font-sans mb-8">
              Give2Eat connects neighbors with excess food to those who need it. 
              Reduce waste, build community, and make a difference today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="rounded-full text-lg px-8 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
                Find Food Nearby <MapPin className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full text-lg px-8 border-primary text-primary hover:bg-primary/10">
                Donate Now <Heart className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="w-full py-20 bg-white/50 backdrop-blur-sm">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-serif">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Leaf className="h-10 w-10 text-secondary" />}
              title="Post Food"
              description="Donors snap a photo and post details in seconds."
            />
            <FeatureCard 
              icon={<MapPin className="h-10 w-10 text-primary" />}
              title="Find Nearby"
              description="Receivers locate food within 15km on our real-time map."
            />
            <FeatureCard 
              icon={<Heart className="h-10 w-10 text-accent" />}
              title="Collect & Rate"
              description="Pick up the food and leave a rating to build trust."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-20 bg-secondary/5">
        <div className="container px-4 md:px-6 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Stat number="10k+" label="Meals Shared" />
            <Stat number="5k+" label="Active Donors" />
            <Stat number="50k" label="kg Food Saved" />
            <Stat number="100%" label="Community Driven" />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <Card className="text-center hover:scale-105 transition-transform duration-300 border-none shadow-lg bg-white/80">
    <CardContent className="pt-6 flex flex-col items-center">
      <div className="mb-4 p-3 bg-muted rounded-full">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 font-serif">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const Stat = ({ number, label }) => (
  <div className="flex flex-col items-center">
    <h3 className="text-4xl font-bold text-primary font-serif">{number}</h3>
    <p className="text-muted-foreground font-medium">{label}</p>
  </div>
);

export default Landing;
