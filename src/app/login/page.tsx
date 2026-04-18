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

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
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

          <div className="mt-6 flex items-center justify-between">
            <div className="w-full h-px bg-white/10"></div>
            <span className="px-4 text-xs font-bold text-white/30 uppercase tracking-wider">
              Or continue with
            </span>
            <div className="w-full h-px bg-white/10"></div>
          </div>

          <motion.button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-white/[0.02] p-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-white/[0.05] disabled:opacity-50"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google
          </motion.button>

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
