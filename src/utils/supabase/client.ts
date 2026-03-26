import { createBrowserClient } from "@supabase/ssr";

let client: ReturnType<typeof createBrowserClient> | undefined;

export function createClient() {
  if (client) return client;

  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim();
  const anonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "").trim();

  // Basic validation to prevent malformed URL errors
  if (!url.startsWith("https://")) {
    console.warn("NEXT_PUBLIC_SUPABASE_URL should start with https://");
  }

  client = createBrowserClient(url, anonKey);
  
  return client;
}
