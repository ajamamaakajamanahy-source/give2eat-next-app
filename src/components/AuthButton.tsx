"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthButton({ session }: { session: any }) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
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

  return (
    <a href="/login" className="px-4 py-2 font-medium text-black bg-white rounded-lg hover:bg-zinc-200 transition-colors">
      Login / Sign Up
    </a>
  );
}
