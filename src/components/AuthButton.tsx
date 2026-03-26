"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthButton({ session }: { session: any }) {
  const supabase = createClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    // Manually clear any lingering cookies
    document.cookie = "sb-mock-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.refresh();
    setIsLoading(false);
  };

  if (session) {
    return (
      <button
        onClick={handleSignOut}
        disabled={isLoading}
        className="hover:text-emerald-400 transition-colors"
      >
        Sign Out
      </button>
    );
  }

  return (
    <a href="/login" className="px-5 py-2 text-sm font-bold text-black uppercase tracking-wider bg-emerald-500 rounded-full hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all">
      Login / Sign Up
    </a>
  );
}
