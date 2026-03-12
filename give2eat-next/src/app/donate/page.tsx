"use client";

import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type FoodType = "veg" | "non-veg";

export default function DonatePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const food_name = String(formData.get("food_name") || "").trim();
    const food_type = String(formData.get("food_type") || "veg") as FoodType;
    const quantity = Number(formData.get("quantity") || 0);
    const description = String(formData.get("description") || "").trim();
    const location = String(formData.get("location") || "").trim();
    const pickup_start_time = String(formData.get("pickup_start_time") || "");
    const pickup_end_time = String(formData.get("pickup_end_time") || "");
    const expiry_time = String(formData.get("expiry_time") || "");

    const start = new Date(pickup_start_time);
    const end = new Date(pickup_end_time);
    const expiry = new Date(expiry_time);
    const now = new Date();

    if (!food_name || !location || !pickup_start_time || !pickup_end_time || !expiry_time) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }
    if (Number.isNaN(quantity) || quantity <= 0) {
      setError("Quantity must be a positive number.");
      setLoading(false);
      return;
    }
    if (!(start < end)) {
      setError("Pickup start time must be before pickup end time.");
      setLoading(false);
      return;
    }
    if (!(end < expiry)) {
      setError("Pickup time must be before food expiry.");
      setLoading(false);
      return;
    }
    if (expiry <= now) {
      setError("Food cannot be listed if expiry time is in the past.");
      setLoading(false);
      return;
    }

    try {
      const { error: insertError } = await supabase.from("food_listings").insert({
        donor_id: null, // TODO: replace with authenticated user id
        food_name,
        food_type,
        quantity,
        description,
        photo_url: null, // TODO: upload to Supabase Storage
        location,
        pickup_start_time: start.toISOString(),
        pickup_end_time: end.toISOString(),
        expiry_time: expiry.toISOString(),
        status: "active",
      });

      if (insertError) {
        throw insertError;
      }

      form.reset();
      setSuccess("Food listing created successfully.");
    } catch (err: any) {
      console.error(err);
      setError("Failed to create listing. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Donate Food</h1>
        <p className="mt-2 text-sm text-white/70">
          Share surplus, freshly prepared food with nearby receivers. Listings
          will automatically expire based on your expiry time.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Food Name *</label>
            <input
              name="food_name"
              type="text"
              className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm outline-none ring-0 focus:border-emerald-400"
              placeholder="e.g. Veg Biryani"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Food Type *</label>
            <select
              name="food_type"
              className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm outline-none focus:border-emerald-400"
              defaultValue="veg"
            >
              <option value="veg">Veg</option>
              <option value="non-veg">Non-Veg</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Quantity (plates or kg) *
            </label>
            <input
              name="quantity"
              type="number"
              min={1}
              step={1}
              className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm outline-none focus:border-emerald-400"
              placeholder="e.g. 10"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Location *</label>
            <input
              name="location"
              type="text"
              className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm outline-none focus:border-emerald-400"
              placeholder="e.g. Koramangala, Bengaluru"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea
            name="description"
            rows={3}
            className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm outline-none focus:border-emerald-400"
            placeholder="Mention cuisine, spice level, allergens, packaging, etc."
          />
        </div>

        {/* TODO: integrate Supabase Storage for photo uploads */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Food Photo (optional)</label>
          <input
            name="photo"
            type="file"
            accept="image/*"
            className="w-full text-sm text-white/70 file:mr-4 file:rounded-full file:border-0 file:bg-emerald-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black hover:file:bg-emerald-400"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">Pickup Start Time *</label>
            <input
              name="pickup_start_time"
              type="datetime-local"
              className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm outline-none focus:border-emerald-400"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Pickup End Time *</label>
            <input
              name="pickup_end_time"
              type="datetime-local"
              className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm outline-none focus:border-emerald-400"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Food Expiry Time *</label>
            <input
              name="expiry_time"
              type="datetime-local"
              className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm outline-none focus:border-emerald-400"
              required
            />
          </div>
        </div>

        {error && (
          <p className="text-sm font-medium text-red-400">
            {error}
          </p>
        )}
        {success && (
          <p className="text-sm font-medium text-emerald-400">
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-emerald-500/60"
        >
          {loading ? "Publishing..." : "Publish Donation"}
        </button>
      </form>
    </div>
  );
}

