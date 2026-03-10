import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdOverlay = ({ isOpen, onClose, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let timer;
    if (isOpen && isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsCompleted(true);
      setIsPlaying(false);
    }
    return () => clearInterval(timer);
  }, [isOpen, isPlaying, timeLeft]);

  const handleStart = () => {
    setIsPlaying(true);
  };

  const handleComplete = () => {
    onComplete();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      >
        <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-2xl relative overflow-hidden">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
          
          <div className="text-center space-y-6 py-8">
            <h2 className="text-2xl font-serif font-bold text-gray-900">
              Watch to Unlock Location
            </h2>
            
            {!isPlaying && !isCompleted && (
              <div className="bg-gray-100 rounded-xl h-48 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors" onClick={handleStart}>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">Click to watch ad (5s)</span>
                </div>
              </div>
            )}

            {isPlaying && (
              <div className="bg-gray-900 rounded-xl h-48 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-mono font-bold text-white">{timeLeft}s</span>
                </div>
                <div className="absolute bottom-0 left-0 h-1 bg-primary transition-all duration-1000 ease-linear" style={{ width: `${(timeLeft / 5) * 100}%` }} />
              </div>
            )}

            {isCompleted && (
              <div className="bg-green-50 rounded-xl h-48 flex items-center justify-center flex-col animate-in zoom-in duration-300">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <p className="text-lg font-medium text-green-700">Ad Completed!</p>
              </div>
            )}

            <div className="flex justify-center pt-4">
              {isCompleted ? (
                <Button onClick={handleComplete} size="lg" className="w-full rounded-full bg-green-600 hover:bg-green-700">
                  Reveal Location
                </Button>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Watching helps keep Give2Eat free for everyone.
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdOverlay;
