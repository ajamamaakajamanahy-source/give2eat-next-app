import { createBrowserClient } from "@supabase/ssr";

let client: ReturnType<typeof createBrowserClient> | undefined;

export function createClient() {
  if (client) return client;

  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim();
  const anonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "").trim();

  // Guard: @supabase/ssr crashes if URL or key is empty
  if (!url || !url.startsWith("https://") || !anonKey) {
    // Return a safe dummy client that won't crash
    return {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        getUser: async () => ({ data: { user: null }, error: null }),
        signInWithPassword: async () => ({ error: { message: "Supabase not configured" } }),
        signUp: async () => ({ error: { message: "Supabase not configured" } }),
        signOut: async () => ({ error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
      from: () => ({
        select: () => ({ gte: () => ({ eq: () => ({ order: () => ({ data: [], error: null }) }) }) }),
        insert: async () => ({ error: { message: "Supabase not configured" } }),
      }),
    } as any;
  }

  client = createBrowserClient(url, anonKey);
  return client;
}
