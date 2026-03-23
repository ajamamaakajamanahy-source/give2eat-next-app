"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState<"sign-in" | "sign-up">("sign-in");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

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
    <div className="flex h-screen w-full items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-black/50 p-8 backdrop-blur shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {view === "sign-in" ? "Welcome back" : "Create an account"}
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            {view === "sign-in" 
              ? "Enter your details to sign in to your account" 
              : "Enter your details below to create your account"}
          </p>
        </div>

        <form onSubmit={handleAuth} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-300" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              className="rounded-lg border border-white/10 bg-black p-3 text-sm text-white placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-zinc-300" htmlFor="password">
                Password
              </label>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-lg border border-white/10 bg-black p-3 text-sm text-white focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-lg bg-white p-3 text-sm font-semibold text-black transition-colors hover:bg-zinc-200 disabled:opacity-50"
          >
            {loading 
              ? "Loading..." 
              : view === "sign-in" ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-zinc-400">
          {view === "sign-in" ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => {
              setView(view === "sign-in" ? "sign-up" : "sign-in");
              setError(null);
            }}
            className="font-medium text-white hover:underline focus:outline-none"
          >
            {view === "sign-in" ? "Sign up" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
