import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapPin, Image as ImageIcon, Clock, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const DonorDashboard = () => {
  const [posts, setPosts] = useState([]); // Mock posts for UI
  const [isPosting, setIsPosting] = useState(false);

  // Mock form state
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [qty, setQty] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      title,
      description: desc,
      quantity: qty,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=500', // Placeholder
      status: 'active',
      pickupTime: '2h',
    };
    setPosts([newPost, ...posts]);
    setIsPosting(false);
    setTitle('');
    setDesc('');
    setQty('');
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
                  <Input placeholder="Food Title (e.g., 5 Pasta Boxes)" value={title} onChange={e => setTitle(e.target.value)} required />
                  <Input placeholder="Quantity (e.g., 2kg)" value={qty} onChange={e => setQty(e.target.value)} required />
                </div>
                <Input placeholder="Description (ingredients, allergens...)" value={desc} onChange={e => setDesc(e.target.value)} />
                
                <div className="flex gap-4">
                  <Button type="button" variant="outline" className="flex-1 gap-2">
                    <ImageIcon size={16} /> Add Photo
                  </Button>
                  <Button type="button" variant="outline" className="flex-1 gap-2">
                    <MapPin size={16} /> Set Location
                  </Button>
                  <Button type="button" variant="outline" className="flex-1 gap-2">
                    <Clock size={16} /> Pickup Time
                  </Button>
                </div>

                <Button type="submit" className="w-full rounded-full bg-primary hover:bg-primary/90">Post Donation</Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.length === 0 ? (
          <div className="col-span-full text-center py-20 text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-muted-foreground/20">
            <p>No active donations yet. Start sharing!</p>
          </div>
        ) : (
          posts.map(post => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-48 bg-gray-200 relative">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  {post.status}
                </span>
              </div>
              <CardContent className="p-4">
                <h3 className="font-serif font-bold text-lg mb-1">{post.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{post.description}</p>
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="flex items-center gap-1 text-primary"><Clock size={14} /> {post.pickupTime}</span>
                  <span className="bg-secondary/10 text-secondary px-2 py-1 rounded text-xs">{post.quantity}</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default DonorDashboard;
