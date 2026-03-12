import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, Lock, Unlock, Loader2, List, Map as MapIcon, Image as LucideImage } from 'lucide-react';
import AdOverlay from '@/components/AdOverlay';
import Map from '@/components/Map';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const ReceiverFeed = () => {
  const [view, setView] = useState('list');
  const [selectedFood, setSelectedFood] = useState(null);
  const [showAd, setShowAd] = useState(false);
  const [unlockedIds, setUnlockedIds] = useState([]);
  const { t } = useLanguage();

  // Fetch food posts
  const { data: foods, isLoading } = useQuery({
    queryKey: ['food'],
    queryFn: async () => {
      const res = await api.get('/food/');
      return res.data;
    }
  });

  const handleUnlockClick = (food) => {
    setSelectedFood(food);
    setShowAd(true);
  };

  const handleAdComplete = () => {
    if (selectedFood) {
      setUnlockedIds([...unlockedIds, selectedFood._id]);
    }
    setShowAd(false);
    setSelectedFood(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <Loader2 className="w-8 h-8 animate-spin text-green-500" />
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 max-w-7xl mx-auto h-[calc(100vh-80px)] relative z-20">
      <div className="flex justify-between items-center mb-8">
        <div>
           <h1 className="text-4xl font-serif font-bold text-white mb-2">{t('receiver.title')}</h1>
           <p className="text-white/50">{t('receiver.subtitle')}</p>
        </div>
        
        <div className="bg-white/10 p-1.5 rounded-full flex gap-1 border border-white/5 backdrop-blur-md">
          <Button 
            variant="ghost"
            onClick={() => setView('list')} 
            size="sm" 
            className={`rounded-full px-6 transition-all ${view === 'list' ? 'bg-white text-black shadow-lg' : 'text-white/70 hover:text-white'}`}
          >
            <List size={16} className="mr-2" /> {t('receiver.list')}
          </Button>
          <Button 
            variant="ghost"
            onClick={() => setView('map')} 
            size="sm" 
            className={`rounded-full px-6 transition-all ${view === 'map' ? 'bg-white text-black shadow-lg' : 'text-white/70 hover:text-white'}`}
          >
            <MapIcon size={16} className="mr-2" /> {t('receiver.map')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
        {/* List View */}
        <AnimatePresence mode="wait">
        <div className={`col-span-1 lg:col-span-1 space-y-4 overflow-y-auto pb-32 pr-2 custom-scrollbar ${view === 'map' ? 'hidden lg:block' : ''}`}>
          {foods?.map((food, i) => {
             const isUnlocked = unlockedIds.includes(food._id);
             return (
              <motion.div
                key={food._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="hover:border-white/30 transition-all cursor-pointer border-white/10 bg-black/40 backdrop-blur-md group">
                    <div className="flex gap-4 p-4">
                    <div className="w-24 h-24 rounded-xl bg-white/5 overflow-hidden border border-white/5 group-hover:scale-105 transition-transform duration-500">
                        {food.image_url ? (
                        <img src={food.image_url} alt={food.title} className="w-full h-full object-cover" />
                        ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent text-white/20">
                            <LucideImage size={24} />
                        </div>
                        )}
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                        <div>
                        <h3 className="font-bold font-serif text-lg leading-tight text-white mb-1 group-hover:text-green-400 transition-colors">{food.title}</h3>
                        <p className="text-sm text-white/50 flex items-center gap-1 font-mono">
                            <MapPin size={12} /> {food.address || t('receiver.unknownLocation')}
                        </p>
                        </div>
                        {!isUnlocked ? (
                        <Button 
                            size="sm" 
                            className="w-full mt-3 rounded-full text-xs h-9 gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/5"
                            onClick={() => handleUnlockClick(food)}
                        >
                            <Lock size={12} /> {t('receiver.unlockLocation')}
                        </Button>
                        ) : (
                        <Button 
                            size="sm" 
                            className="w-full mt-3 rounded-full text-xs h-9 gap-2 bg-green-500/20 text-green-400 border border-green-500/30 cursor-default hover:bg-green-500/20"
                        >
                            <Unlock size={12} /> {t('receiver.revealed')}
                        </Button>
                        )}
                    </div>
                    </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
        </AnimatePresence>

        {/* Map View */}
        <div className={`col-span-1 lg:col-span-2 h-[600px] lg:h-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative ${view === 'list' ? 'hidden lg:block' : ''}`}>
          <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none mix-blend-overlay"></div>
          <Map 
            markers={foods?.map(f => ({
              id: f._id, 
              position: { lat: f.latitude, lng: f.longitude }, 
              title: f.title,
              description: f.description
            }))} 
          />
        </div>
      </div>

      <AdOverlay 
        isOpen={showAd} 
        onClose={() => setShowAd(false)} 
        onComplete={handleAdComplete} 
      />
    </div>
  );
};

export default ReceiverFeed;
