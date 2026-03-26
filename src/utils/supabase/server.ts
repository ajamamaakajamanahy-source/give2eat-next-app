import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim();
  const anonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "").trim();

  // Guard: @supabase/ssr crashes if URL or key is empty
  if (!url || !url.startsWith("https://") || !anonKey) {
    // Return a dummy object that won't crash but won't do anything
    return {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        getUser: async () => ({ data: { user: null }, error: null }),
        exchangeCodeForSession: async () => ({ data: { session: null }, error: null }),
      },
      from: () => ({
        select: () => ({ gte: () => ({ eq: () => ({ order: () => ({ data: [], error: null }) }) }) }),
        insert: async () => ({ error: { message: "Supabase not configured" } }),
      }),
    } as any;
  }

  return createServerClient(url, anonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch (error) {
          // The `set` method was called from a Server Component.
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: "", ...options });
        } catch (error) {
          // The `remove` method was called from a Server Component.
        }
      },
    },
  });
}
