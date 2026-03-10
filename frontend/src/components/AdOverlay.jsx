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
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl"
      >
        <div className="w-full max-w-md p-1 rounded-3xl bg-gradient-to-br from-white/10 to-transparent shadow-2xl">
          <div className="bg-[#0A0A0A] rounded-[22px] p-6 relative overflow-hidden border border-white/5">
            <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
              <X size={24} />
            </button>
            
            <div className="text-center space-y-8 py-8">
              <div>
                <h2 className="text-2xl font-serif font-bold text-white mb-2">
                  Unlock Location
                </h2>
                <p className="text-white/50 text-sm">Support the network by watching this short message.</p>
              </div>
              
              {!isPlaying && !isCompleted && (
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white/5 border border-white/10 rounded-2xl h-48 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-all group" 
                  onClick={handleStart}
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 ml-1" fill="currentColor" />
                    </div>
                    <span className="text-sm font-medium text-white/70 group-hover:text-white">Start Ad (5s)</span>
                  </div>
                </motion.div>
              )}

              {isPlaying && (
                <div className="bg-black rounded-2xl h-48 flex items-center justify-center relative overflow-hidden border border-white/10">
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <span className="text-6xl font-mono font-bold text-white tracking-widest">{timeLeft}</span>
                  </div>
                  {/* Progress Bar Background */}
                  <div className="absolute bottom-0 left-0 h-1 bg-green-500 shadow-[0_0_10px_#22c55e] transition-all duration-1000 ease-linear" style={{ width: `${((5 - timeLeft) / 5) * 100}%` }} />
                </div>
              )}

              {isCompleted && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl h-48 flex items-center justify-center flex-col animate-in zoom-in duration-300">
                  <CheckCircle className="w-16 h-16 text-green-400 mb-4 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
                  <p className="text-lg font-medium text-green-400">Thank You!</p>
                </div>
              )}

              <div className="flex justify-center pt-2">
                {isCompleted ? (
                  <Button onClick={handleComplete} size="lg" className="w-full rounded-full bg-white text-black hover:bg-white/90 font-bold h-12">
                    Reveal Address Now
                  </Button>
                ) : (
                  <p className="text-[10px] uppercase tracking-widest text-white/30">
                    Powered by Give2Eat Ad Network
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdOverlay;
