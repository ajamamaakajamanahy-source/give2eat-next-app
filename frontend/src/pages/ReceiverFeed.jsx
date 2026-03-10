import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock, Lock, Unlock } from 'lucide-react';
import AdOverlay from '@/components/AdOverlay';
import Map from '@/components/Map';
import { motion } from 'framer-motion';

// Mock Data
const MOCK_FOODS = [
  { id: 1, title: 'Fresh Sourdough Bread', distance: '0.5km', image: 'https://images.unsplash.com/photo-1585476644321-b976214b2e60?auto=format&fit=crop&q=80&w=500', lat: 40.7128, lng: -74.0060, locked: true },
  { id: 2, title: 'Vegetable Soup (5 Liters)', distance: '1.2km', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=500', lat: 40.7200, lng: -74.0100, locked: true },
  { id: 3, title: 'Assorted Pastries', distance: '2.5km', image: 'https://images.unsplash.com/photo-1612203985729-70726954388c?auto=format&fit=crop&q=80&w=500', lat: 40.7300, lng: -73.9900, locked: true },
];

const ReceiverFeed = () => {
  const [view, setView] = useState('list'); // 'list' or 'map'
  const [foods, setFoods] = useState(MOCK_FOODS);
  const [selectedFood, setSelectedFood] = useState(null);
  const [showAd, setShowAd] = useState(false);

  const handleUnlockClick = (food) => {
    setSelectedFood(food);
    setShowAd(true);
  };

  const handleAdComplete = () => {
    if (selectedFood) {
      setFoods(foods.map(f => f.id === selectedFood.id ? { ...f, locked: false } : f));
      // In a real app, verify with backend here
    }
    setShowAd(false);
    setSelectedFood(null);
  };

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
          {foods.map((food) => (
            <Card key={food.id} className="hover:shadow-md transition-shadow cursor-pointer border-none bg-white/80">
              <div className="flex gap-4 p-4">
                <img src={food.image} alt={food.title} className="w-24 h-24 rounded-lg object-cover bg-gray-200" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold font-serif text-lg leading-tight">{food.title}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin size={12} /> {food.distance} away
                    </p>
                  </div>
                  {food.locked ? (
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
          ))}
        </div>

        {/* Map View */}
        <div className={`col-span-1 lg:col-span-2 h-[500px] lg:h-auto rounded-2xl overflow-hidden shadow-inner border border-border/50 ${view === 'list' ? 'hidden lg:block' : ''}`}>
          <Map 
            markers={foods.map(f => ({
              id: f.id, 
              position: { lat: f.lat, lng: f.lng }, 
              title: f.title,
              description: f.distance
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
