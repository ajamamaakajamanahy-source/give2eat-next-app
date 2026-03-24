"use client";

import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthButton({ session }: { session: any }) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    if (supabase) {
      await supabase.auth.signOut();
    }
    // Manually clear mock cookie regardless of Supabase config
    document.cookie = "sb-mock-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.refresh();
    setIsLoading(false);
  };

  if (session) {
    return (
      <button
        onClick={handleSignOut}
        disabled={isLoading}
        className="hover:text-white transition-colors"
      >
        Sign Out
      </button>
    );
  }

  return null;
}
