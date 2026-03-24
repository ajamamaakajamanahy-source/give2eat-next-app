"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { isDemoMode } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState<"sign-in" | "sign-up">("sign-in");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const isDemo = !supabaseUrl || supabaseUrl.includes("your-project-url");

  useEffect(() => {
    router.replace("/find");
    if (isDemoMode) {
        // Auto-grant and redirect in Demo Mode
        document.cookie = "sb-mock-auth-token=true; path=/; max-age=3600";
        router.refresh();
    }
  }, [router]);

  const supabase = supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Mock Authentication for Demo Mode
    if (!supabase) {
      setTimeout(() => {
        // Set a mock cookie that matches the pattern in layout.tsx
        document.cookie = "sb-mock-auth-token=true; path=/; max-age=3600";
        router.push("/dashboard/donor");
        router.refresh();
        setLoading(false);
      }, 1000);
      return;
    }

    const authOpts = { email, password };

    try {
      if (view === "sign-up") {
        const { error } = await supabase.auth.signUp({
          ...authOpts,
          options: {
            emailRedirectTo: `${location.origin}/auth/callback`,
          },
        });
        if (error) throw error;
        alert("Check your email for the confirmation link.");
        router.refresh();
      } else {
        const { error } = await supabase.auth.signInWithPassword(authOpts);
        if (error) throw error;
        router.push("/dashboard/donor");
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <div className="animate-pulse text-emerald-500 font-bold uppercase tracking-widest text-xs">
        Redirecting...
      </div>
    </div>
  );
}
