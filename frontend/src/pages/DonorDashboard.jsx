import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapPin, Image as ImageIcon, Clock, Plus, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from 'sonner';

const DonorDashboard = () => {
  const [isPosting, setIsPosting] = useState(false);
  const queryClient = useQueryClient();

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    quantity: '',
    pickup_time: new Date().toISOString(), 
    address: '123 Main St', 
    latitude: 40.7128,
    longitude: -74.0060,
  });

  const createPostMutation = useMutation({
    mutationFn: (newPost) => api.post('/food/', newPost),
    onSuccess: () => {
      toast.success('Food posted successfully!');
      setIsPosting(false);
      setFormData({ ...formData, title: '', description: '', quantity: '' });
      queryClient.invalidateQueries({ queryKey: ['food'] });
    },
    onError: (error) => {
      toast.error('Failed to post food');
      console.error(error);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPostMutation.mutate(formData);
  };

  return (
    <div className="container px-4 py-12 max-w-4xl mx-auto relative z-20">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-white tracking-tight">Donor Dashboard</h1>
        <Button onClick={() => setIsPosting(!isPosting)} className="rounded-full h-12 px-6 bg-gradient-to-r from-green-400 to-green-600 text-black font-bold shadow-[0_0_20px_rgba(74,222,128,0.3)] hover:shadow-[0_0_30px_rgba(74,222,128,0.5)] transition-all">
          <Plus size={20} className="mr-2" /> New Donation
        </Button>
      </div>

      {isPosting && (
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.98 }} 
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="mb-12"
        >
          <Card className="border-white/10 bg-black/60 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Post New Food</CardTitle>
              <CardDescription className="text-white/50">Share your excess food with neighbors.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Input 
                    className="bg-white/5 border-white/10 text-white rounded-xl h-12"
                    placeholder="Food Title (e.g., 5 Pasta Boxes)" 
                    value={formData.title} 
                    onChange={e => setFormData({...formData, title: e.target.value})} 
                    required 
                  />
                  <Input 
                    className="bg-white/5 border-white/10 text-white rounded-xl h-12"
                    placeholder="Quantity (e.g., 2kg)" 
                    value={formData.quantity} 
                    onChange={e => setFormData({...formData, quantity: e.target.value})} 
                    required 
                  />
                </div>
                <Input 
                  className="bg-white/5 border-white/10 text-white rounded-xl h-12"
                  placeholder="Description (ingredients, allergens...)" 
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                />
                
                <div className="flex gap-4">
                  <Button type="button" variant="outline" className="flex-1 gap-2 border-white/10 text-white hover:bg-white/5 h-12 rounded-xl">
                    <ImageIcon size={18} /> Add Photo
                  </Button>
                  <Button type="button" variant="outline" className="flex-1 gap-2 border-white/10 text-white hover:bg-white/5 h-12 rounded-xl">
                    <MapPin size={18} /> Set Location
                  </Button>
                </div>

                <Button type="submit" className="w-full rounded-xl h-14 bg-white text-black font-bold hover:bg-gray-200 transition-all text-lg" disabled={createPostMutation.isPending}>
                  {createPostMutation.isPending ? <Loader2 className="animate-spin" /> : 'Post Donation'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Empty State */}
      <div className="text-center py-32 text-white/30 bg-white/5 rounded-3xl border border-dashed border-white/10 backdrop-blur-sm">
        <p className="font-mono text-sm tracking-widest uppercase">No active donations</p>
      </div>
    </div>
  );
};

export default DonorDashboard;
