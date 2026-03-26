"use client";

import React, { FormEvent, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

const LocationPicker = dynamic(() => import("@/components/LocationPicker"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] w-full bg-white/[0.02] animate-pulse rounded-2xl border border-white/5" />
  ),
});

type FoodType = "veg" | "non-veg";

export default function DonatePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const supabase = createClient();

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
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setError("You must be signed in to create a listing.");
        setLoading(false);
        return;
      }

      const { error: insertError } = await supabase.from("food_listings").insert({
        donor_id: user.id,
        food_name,
        food_type,
        quantity,
        description,
        photo_url: null,
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

  const inputClasses = (fieldName: string) =>
    `w-full rounded-xl border bg-white/[0.02] px-4 py-3 text-sm outline-none transition-all duration-300 backdrop-blur-sm ${
      focusedField === fieldName
        ? "border-emerald-500/50 bg-emerald-500/[0.03] shadow-[0_0_20px_rgba(16,185,129,0.1)]"
        : "border-white/10 hover:border-white/20"
    }`;

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-10 px-6 py-16">
      <ScrollReveal>
        <div className="space-y-3">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400/60"
          >
            Share Food
          </motion.span>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Donate Food</h1>
          <p className="text-base text-white/40 max-w-xl">
            Share surplus, freshly prepared food with nearby receivers. Listings
            will automatically expire based on your expiry time.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-8 rounded-[2rem] border border-white/[0.06] bg-white/[0.02] p-8 md:p-10 backdrop-blur-sm relative overflow-hidden"
          layout
        >
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/3 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-sky-500/3 blur-[80px] pointer-events-none" />

          <div className="grid gap-6 md:grid-cols-2 relative">
            <motion.div
              className="space-y-2"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Food Name *</label>
              <input
                name="food_name"
                type="text"
                className={inputClasses("food_name")}
                placeholder="e.g. Veg Biryani"
                required
                onFocus={() => setFocusedField("food_name")}
                onBlur={() => setFocusedField(null)}
              />
            </motion.div>
            <motion.div
              className="space-y-2"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Food Type *</label>
              <select
                name="food_type"
                className={inputClasses("food_type")}
                defaultValue="veg"
                onFocus={() => setFocusedField("food_type")}
                onBlur={() => setFocusedField(null)}
              >
                <option value="veg">Veg</option>
                <option value="non-veg">Non-Veg</option>
              </select>
            </motion.div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 relative">
            <motion.div
              className="space-y-2"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Quantity (plates or kg) *</label>
              <input
                name="quantity"
                type="number"
                min={1}
                step={1}
                className={inputClasses("quantity")}
                placeholder="e.g. 10"
                required
                onFocus={() => setFocusedField("quantity")}
                onBlur={() => setFocusedField(null)}
              />
            </motion.div>
            <motion.div
              className="space-y-3"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Pickup Location *</label>
              <LocationPicker onAddressSelect={(addr) => setLocation(addr)} />
              <input
                name="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={inputClasses("location")}
                placeholder="Address will appear here, or type manually"
                required
                onFocus={() => setFocusedField("location")}
                onBlur={() => setFocusedField(null)}
              />
            </motion.div>
          </div>

          <motion.div
            className="space-y-2"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Description</label>
            <textarea
              name="description"
              rows={3}
              className={inputClasses("description")}
              placeholder="Mention cuisine, spice level, allergens, packaging, etc."
              onFocus={() => setFocusedField("description")}
              onBlur={() => setFocusedField(null)}
            />
          </motion.div>

          <motion.div
            className="space-y-2"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Food Photo (optional)</label>
            <input
              name="photo"
              type="file"
              accept="image/*"
              className="w-full text-sm text-white/50 file:mr-4 file:rounded-full file:border-0 file:bg-emerald-500 file:px-5 file:py-2.5 file:text-sm file:font-bold file:text-black hover:file:bg-emerald-400 file:transition-colors file:shadow-lg file:shadow-emerald-500/20"
            />
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3 relative">
            {[
              { name: "pickup_start_time", label: "Pickup Start Time *" },
              { name: "pickup_end_time", label: "Pickup End Time *" },
              { name: "expiry_time", label: "Food Expiry Time *" },
            ].map((field) => (
              <motion.div
                key={field.name}
                className="space-y-2"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider">{field.label}</label>
                <input
                  name={field.name}
                  type="datetime-local"
                  className={inputClasses(field.name)}
                  required
                  onFocus={() => setFocusedField(field.name)}
                  onBlur={() => setFocusedField(null)}
                />
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm font-medium text-red-400 backdrop-blur-sm"
              >
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm font-medium text-emerald-400 backdrop-blur-sm"
              >
                {success}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.01, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-6 py-4 text-sm font-black text-black shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-400 hover:shadow-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
          >
            <span className="relative z-10">
              {loading ? "Publishing..." : "Publish Donation"}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </motion.form>
      </ScrollReveal>
    </div>
  );
}
