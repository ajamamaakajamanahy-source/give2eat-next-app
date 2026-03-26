"use client";

import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState<"sign-in" | "sign-up">("sign-in");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const router = useRouter();
  const supabase = createClient();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (view === "sign-up") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${location.origin}/auth/callback`,
          },
        });
        if (error) throw error;
        alert("Check your email for the confirmation link.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/");
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = (fieldName: string) =>
    `rounded-xl border bg-white/[0.02] p-4 text-sm text-white placeholder-white/20 transition-all duration-300 backdrop-blur-sm outline-none ${
      focusedField === fieldName
        ? "border-emerald-500/50 bg-emerald-500/[0.03] shadow-[0_0_25px_rgba(16,185,129,0.1)]"
        : "border-white/[0.08] hover:border-white/15"
    }`;

  return (
    <div className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center p-4 relative">
      {/* Ambient effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-sky-500/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full max-w-sm relative"
      >
        <div className="rounded-[2rem] border border-white/[0.06] bg-white/[0.02] p-8 md:p-10 backdrop-blur-sm shadow-2xl relative overflow-hidden">
          {/* Card glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/5 blur-[60px] rounded-full" />
          
          <div className="mb-10 text-center relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", damping: 15 }}
              className="w-16 h-16 mx-auto mb-6 relative"
            >
              <Image
                src="/logo.png"
                alt="Give2Eat Logo"
                width={64}
                height={64}
                className="object-contain"
                priority
              />
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-2xl font-bold tracking-tight">
                  {view === "sign-in" ? "Welcome back" : "Create an account"}
                </h1>
                <p className="mt-2 text-sm text-white/30">
                  {view === "sign-in"
                    ? "Enter your details to sign in"
                    : "Enter your details to get started"}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <form onSubmit={handleAuth} className="flex flex-col gap-5">
            <motion.div
              className="flex flex-col gap-2"
              whileHover={{ y: -1 }}
              transition={{ duration: 0.2 }}
            >
              <label
                className="text-xs font-bold text-white/40 uppercase tracking-wider"
                htmlFor="email"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className={inputClasses("email")}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
              />
            </motion.div>

            <motion.div
              className="flex flex-col gap-2"
              whileHover={{ y: -1 }}
              transition={{ duration: 0.2 }}
            >
              <label
                className="text-xs font-bold text-white/40 uppercase tracking-wider"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={inputClasses("password")}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
              />
            </motion.div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="rounded-xl border border-red-500/15 bg-red-500/[0.06] p-3 text-sm text-red-400 backdrop-blur-sm"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="mt-3 w-full rounded-full bg-emerald-500 p-4 text-sm font-black text-black shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-400 hover:shadow-emerald-500/40 disabled:opacity-50 relative overflow-hidden group"
            >
              <span className="relative z-10">
                {loading
                  ? "Loading..."
                  : view === "sign-in"
                  ? "Sign In"
                  : "Sign Up"}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </form>

          <div className="mt-8 text-center text-sm text-white/30">
            {view === "sign-in"
              ? "Don't have an account? "
              : "Already have an account? "}
            <motion.button
              onClick={() => {
                setView(view === "sign-in" ? "sign-up" : "sign-in");
                setError(null);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-bold text-emerald-400 hover:text-emerald-300 transition-colors duration-300"
            >
              {view === "sign-in" ? "Sign up" : "Sign in"}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
