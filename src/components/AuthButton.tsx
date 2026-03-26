"use client";

import React from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

export default function AuthButton({ session }: { session: any }) {
  const supabase = createClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    document.cookie = "sb-mock-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.refresh();
    setIsLoading(false);
  };

  if (session) {
    return (
      <motion.button
        onClick={handleSignOut}
        disabled={isLoading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-5 py-2 text-sm font-bold text-white/60 hover:text-emerald-400 transition-colors duration-300 rounded-full hover:bg-white/5"
      >
        Sign Out
      </motion.button>
    );
  }

  return (
    <motion.a
      href="/login"
      whileHover={{ scale: 1.05, y: -1 }}
      whileTap={{ scale: 0.95 }}
      className="px-6 py-2.5 text-xs font-black text-black uppercase tracking-wider bg-emerald-500 rounded-full hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-300"
    >
      Login / Sign Up
    </motion.a>
  );
}
