"use client";

import React, { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-white/[0.02] animate-pulse rounded-[2.5rem] border border-white/5" />
  ),
});

type Listing = {
  id: string;
  food_name: string;
  quantity: number;
  location: string;
  pickup_start_time: string;
  pickup_end_time: string;
  expiry_time: string;
  status: string;
  donor_rating: number | null;
  coords?: [number, number];
};

const MOCK_LISTINGS: Listing[] = [
  {
    id: "mock-1",
    food_name: "Fresh Garden Salad",
    quantity: 5,
    location: "Kochi, Kerala",
    pickup_start_time: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
    pickup_end_time: new Date(Date.now() + 1000 * 60 * 60 * 4).toISOString(),
    expiry_time: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString(),
    status: "active",
    donor_rating: 4.8,
    coords: [10.0152, 76.3419],
  },
  {
    id: "mock-2",
    food_name: "Vegetable Biryani",
    quantity: 8,
    location: "Ernakulam",
    pickup_start_time: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    pickup_end_time: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
    expiry_time: new Date(Date.now() + 1000 * 60 * 60 * 6).toISOString(),
    status: "active",
    donor_rating: 4.5,
    coords: [9.9816, 76.2999],
  },
  {
    id: "mock-3",
    food_name: "Fresh Fruit Basket",
    quantity: 3,
    location: "Aluva",
    pickup_start_time: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
    pickup_end_time: new Date(Date.now() + 1000 * 60 * 60 * 5).toISOString(),
    expiry_time: new Date(Date.now() + 1000 * 60 * 60 * 12).toISOString(),
    status: "active",
    donor_rating: 5.0,
    coords: [10.1076, 76.3511],
  },
];

export default function FindFoodPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeListingId, setActiveListingId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "map">("map");

  useEffect(() => {
    async function loadListings() {
      if (!isSupabaseConfigured) {
        setListings(MOCK_LISTINGS);
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      const nowIso = new Date().toISOString();

      try {
        const { data, error } = await supabase
          .from("food_listings")
          .select(
            "id, food_name, quantity, location, pickup_start_time, pickup_end_time, expiry_time, status"
          )
          .gte("expiry_time", nowIso)
          .eq("status", "active")
          .order("pickup_start_time", { ascending: true });

        if (error) {
          setError(error.message);
          setListings(MOCK_LISTINGS);
        } else {
          setListings(
            (data || []).map((row: any) => ({ ...row, donor_rating: null }))
          );
        }
      } catch (err) {
        setError("Failed to fetch listings. Reverting to Demo Mode.");
        setListings(MOCK_LISTINGS);
      }
      setLoading(false);
    }
    loadListings();
  }, []);

  return (
    <div className="mx-auto max-w-[1400px] px-4 md:px-6 py-4 md:py-8 flex flex-col gap-4 md:gap-6 h-[calc(100vh-70px)] md:h-[calc(100vh-80px)] overflow-hidden">
      <AnimatePresence>
        {!isSupabaseConfigured && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="shrink-0 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] px-5 py-3 text-[10px] md:text-xs text-emerald-300 font-black uppercase tracking-[0.2em] backdrop-blur-sm"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
            Demo Mode: Simulated Environment
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="shrink-0 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Food Discovery
          </h1>
          <p className="text-xs md:text-sm text-white/30">
            Real-time local donation nodes.
          </p>
        </div>

        <div className="flex items-center gap-3 self-center md:self-auto">
          <div className="flex bg-white/[0.03] border border-white/[0.06] rounded-full p-1 shadow-inner backdrop-blur-sm">
            {(["map", "list"] as const).map((mode) => (
              <motion.button
                key={mode}
                onClick={() => setViewMode(mode)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-full transition-all duration-300 ${
                  viewMode === mode
                    ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                    : "text-white/30 hover:text-white/50"
                }`}
              >
                {mode}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="flex-1 flex gap-8 overflow-hidden relative">
        {/* Listings Sidebar */}
        <div
          className={`flex-1 lg:flex-none lg:w-[380px] flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar transition-all duration-500 ${
            viewMode === "list" || "hidden lg:flex"
          }`}
        >
          {loading && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="h-40 w-full bg-white/[0.02] animate-pulse rounded-[2rem] border border-white/5"
                />
              ))}
            </div>
          )}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-400 bg-red-400/5 border border-red-400/10 p-6 rounded-[2rem] backdrop-blur-sm"
            >
              {error}
            </motion.p>
          )}

          <div className="grid gap-4 pb-8">
            <AnimatePresence mode="popLayout">
              {listings.map((listing, i) => (
                <motion.div
                  key={listing.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ListingCard
                    listing={listing}
                    isActive={activeListingId === listing.id}
                    onClick={() => {
                      setActiveListingId(listing.id);
                      if (window.innerWidth < 1024) setViewMode("map");
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
            {!loading && !error && listings.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white/[0.02] rounded-[2.5rem] border border-dashed border-white/[0.06]"
              >
                <p className="text-sm text-white/30 font-medium whitespace-pre-wrap">
                  No active nodes in this sector.{"\n"}Check back soon.
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Map Explorer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`flex-1 relative transition-all duration-500 rounded-[2.5rem] overflow-hidden border border-white/[0.04] ${
            viewMode === "map" || "hidden lg:block"
          }`}
        >
          <MapComponent
            listings={listings}
            activeId={activeListingId || undefined}
          />
        </motion.div>
      </div>
    </div>
  );
}

function ListingCard({
  listing,
  isActive,
  onClick,
}: {
  listing: Listing;
  isActive: boolean;
  onClick: () => void;
}) {
  const expiry = new Date(listing.expiry_time);
  const now = new Date();
  const timeLeftMs = Math.max(0, expiry.getTime() - now.getTime());
  const hoursLeft = Math.floor(timeLeftMs / (1000 * 60 * 60));
  const minutesLeft = Math.floor(
    (timeLeftMs % (1000 * 60 * 60)) / (1000 * 60)
  );

  return (
    <motion.article
      id={listing.id}
      onClick={onClick}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      className={`group flex flex-col justify-between rounded-[2.5rem] border transition-all duration-300 cursor-pointer p-6 ${
        isActive
          ? "bg-emerald-500/[0.06] border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.08)]"
          : "bg-white/[0.02] border-white/[0.06] hover:border-emerald-500/20 hover:bg-white/[0.04]"
      }`}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold group-hover:text-emerald-400 transition-colors duration-300">
            {listing.food_name}
          </h2>
          {isActive && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_rgba(16,185,129,1)]"
            />
          )}
        </div>

        <div className="space-y-2.5">
          <p className="text-sm text-white/40 flex items-center gap-2.5 group-hover:text-white/60 transition-colors duration-300">
            <svg
              className="w-4 h-4 text-emerald-500/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="truncate">{listing.location}</span>
          </p>
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.1em] text-white/20">
            <span className="bg-white/[0.03] px-2.5 py-1 rounded-lg border border-white/[0.04]">
              Qty: {listing.quantity}
            </span>
            <span>ID: {listing.id.slice(0, 8)}</span>
          </div>
        </div>

        <div
          className={`flex items-center justify-between pt-4 border-t transition-colors duration-300 ${
            isActive ? "border-emerald-500/15" : "border-white/[0.04]"
          }`}
        >
          <p
            className={`text-[10px] font-black uppercase tracking-widest ${
              hoursLeft === 0 ? "text-rose-400" : "text-emerald-400"
            }`}
          >
            {hoursLeft}h {minutesLeft}m left
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
              isActive
                ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                : "bg-white/[0.04] text-white hover:bg-emerald-500 hover:text-black"
            }`}
          >
            Request
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
