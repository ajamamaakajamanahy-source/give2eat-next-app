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
    pickup_time: new Date().toISOString(), // Simplified for MVP
    address: '123 Main St', // Placeholder
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
    <div className="container px-4 py-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-foreground">Donor Dashboard</h1>
        <Button onClick={() => setIsPosting(!isPosting)} className="rounded-full shadow-lg gap-2">
          <Plus size={18} /> New Donation
        </Button>
      </div>

      {isPosting && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="border-primary/20 bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Post New Food</CardTitle>
              <CardDescription>Share your excess food with neighbors.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Input 
                    placeholder="Food Title (e.g., 5 Pasta Boxes)" 
                    value={formData.title} 
                    onChange={e => setFormData({...formData, title: e.target.value})} 
                    required 
                  />
                  <Input 
                    placeholder="Quantity (e.g., 2kg)" 
                    value={formData.quantity} 
                    onChange={e => setFormData({...formData, quantity: e.target.value})} 
                    required 
                  />
                </div>
                <Input 
                  placeholder="Description (ingredients, allergens...)" 
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                />
                
                <div className="flex gap-4">
                  <Button type="button" variant="outline" className="flex-1 gap-2">
                    <ImageIcon size={16} /> Add Photo
                  </Button>
                  <Button type="button" variant="outline" className="flex-1 gap-2">
                    <MapPin size={16} /> Set Location
                  </Button>
                </div>

                <Button type="submit" className="w-full rounded-full bg-primary hover:bg-primary/90" disabled={createPostMutation.isPending}>
                  {createPostMutation.isPending ? <Loader2 className="animate-spin" /> : 'Post Donation'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* List of active donations would go here, fetched via useQuery */}
      <div className="text-center py-20 text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-muted-foreground/20">
        <p>Your active donations will appear here.</p>
      </div>
    </div>
  );
};

export default DonorDashboard;
