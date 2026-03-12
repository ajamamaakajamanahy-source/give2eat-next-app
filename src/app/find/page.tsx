"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

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
};

export default function FindFoodPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadListings() {
      setLoading(true);
      setError(null);
      const nowIso = new Date().toISOString();

      const { data, error } = await supabase
        .from("food_listings")
        .select(
          "id, food_name, quantity, location, pickup_start_time, pickup_end_time, expiry_time, status"
        )
        .gte("expiry_time", nowIso)
        .eq("status", "active")
        .order("pickup_start_time", { ascending: true });

      if (error) {
        console.error("Supabase error loading listings:", error);
        // Show a helpful message if the table is missing or RLS blocks access
        const message =
          (error as any)?.message ||
          "Failed to load food listings from Supabase.";
        setError(message);
      } else {
        const withRating = (data || []).map((row: any) => ({
          ...row,
          donor_rating: null,
        }));
        setListings(withRating);
      }
      setLoading(false);
    }

    loadListings();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Find Food</h1>
          <p className="mt-2 text-sm text-white/70">
            Browse active food donations near you. Listings expire automatically
            when their pickup or expiry windows close.
          </p>
        </div>
      </div>

      {loading && (
        <p className="text-sm text-white/70">Loading listings…</p>
      )}
      {error && (
        <p className="text-sm font-medium text-red-400">{error}</p>
      )}

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
        {!loading && !error && listings.length === 0 && (
          <p className="text-sm text-white/60">
            No active listings right now. Check back soon.
          </p>
        )}
      </div>
    </div>
  );
}

function ListingCard({ listing }: { listing: Listing }) {
  const now = new Date();
  const pickupEnd = new Date(listing.pickup_end_time);
  const expiry = new Date(listing.expiry_time);
  const expired = now >= expiry || now >= pickupEnd;

  const timeLeftMs = Math.max(0, expiry.getTime() - now.getTime());
  const hoursLeft = Math.floor(timeLeftMs / (1000 * 60 * 60));
  const minutesLeft = Math.floor(
    (timeLeftMs - hoursLeft * 60 * 60 * 1000) / (1000 * 60)
  );

  const statusLabel = expired
    ? "Expired – Not Available"
    : "Available";

  return (
    <article className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-4 text-sm backdrop-blur">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">{listing.food_name}</h2>
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
            {statusLabel}
          </span>
        </div>
        <p className="text-white/70">
          Quantity: <span className="font-medium">{listing.quantity}</span>
        </p>
        <p className="text-white/70">
          Pickup:{" "}
          <span className="font-mono text-xs">
            {new Date(listing.pickup_start_time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            –{" "}
            {new Date(listing.pickup_end_time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </p>
        <p className="text-white/70">
          Location: <span className="font-medium">{listing.location}</span>
        </p>
        <p className="text-xs text-white/60">
          Expiry in:{" "}
          {expired ? "Expired" : `${hoursLeft}h ${minutesLeft}m`}
        </p>
      </div>

      <button
        type="button"
        disabled={expired}
        className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold text-black shadow-md shadow-sky-500/40 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-white/50"
      >
        {expired ? "Expired – Not Available" : "Request Food"}
      </button>
    </article>
  );
}

