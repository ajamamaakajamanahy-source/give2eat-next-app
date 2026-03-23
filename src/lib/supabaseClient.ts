import { createClient } from "@supabase/supabase-js";

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").trim();
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "").trim();

// Harden check to catch placeholders like "your-project-url"
export const isSupabaseConfigured = 
  !!supabaseUrl && 
  supabaseUrl.startsWith("https://") && 
  !supabaseUrl.includes("your-project-url") &&
  !!supabaseAnonKey && 
  supabaseAnonKey !== "your-anon-key";

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (null as any);
