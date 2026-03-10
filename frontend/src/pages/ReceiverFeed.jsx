import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, Lock, Unlock, Loader2 } from 'lucide-react';
import AdOverlay from '@/components/AdOverlay';
import Map from '@/components/Map';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

const ReceiverFeed = () => {
  const [view, setView] = useState('list');
  const [selectedFood, setSelectedFood] = useState(null);
  const [showAd, setShowAd] = useState(false);
  const [unlockedIds, setUnlockedIds] = useState([]);

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
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 max-w-5xl mx-auto h-[calc(100vh-80px)]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif font-bold">Nearby Food</h1>
        <div className="bg-muted p-1 rounded-full flex gap-1">
          <Button 
            variant={view === 'list' ? 'default' : 'ghost'} 
            onClick={() => setView('list')} 
            size="sm" 
            className="rounded-full px-6"
          >
            List
          </Button>
          <Button 
            variant={view === 'map' ? 'default' : 'ghost'} 
            onClick={() => setView('map')} 
            size="sm" 
            className="rounded-full px-6"
          >
            Map
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* List View */}
        <div className={`col-span-1 lg:col-span-1 space-y-4 overflow-y-auto pb-20 ${view === 'map' ? 'hidden lg:block' : ''}`}>
          {foods?.map((food) => {
             const isUnlocked = unlockedIds.includes(food._id);
             return (
              <Card key={food._id} className="hover:shadow-md transition-shadow cursor-pointer border-none bg-white/80">
                <div className="flex gap-4 p-4">
                  <div className="w-24 h-24 rounded-lg bg-gray-200 overflow-hidden">
                    {food.image_url ? (
                      <img src={food.image_url} alt={food.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                        No Img
                      </div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold font-serif text-lg leading-tight">{food.title}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin size={12} /> {food.address || 'Nearby'}
                      </p>
                    </div>
                    {!isUnlocked ? (
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        className="w-full mt-2 rounded-full text-xs h-8 gap-2 bg-secondary/10 hover:bg-secondary/20 text-secondary-foreground"
                        onClick={() => handleUnlockClick(food)}
                      >
                        <Lock size={12} /> Watch Ad to Unlock
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        className="w-full mt-2 rounded-full text-xs h-8 gap-2 bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Unlock size={12} /> Location Revealed
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Map View */}
        <div className={`col-span-1 lg:col-span-2 h-[500px] lg:h-auto rounded-2xl overflow-hidden shadow-inner border border-border/50 ${view === 'list' ? 'hidden lg:block' : ''}`}>
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
