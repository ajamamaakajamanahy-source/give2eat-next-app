import { createClient as createSupabaseClient } from "@/utils/supabase/client";

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").trim();
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "").trim();

export const isSupabaseConfigured = 
  !!supabaseUrl && 
  supabaseUrl.startsWith("https://") && 
  !supabaseUrl.includes("your-project-url") &&
  !!supabaseAnonKey && 
  supabaseAnonKey !== "your-anon-key";

export const isDemoMode = !isSupabaseConfigured;

// Backward compatibility wrapper
export const supabase = isSupabaseConfigured ? createSupabaseClient() : (null as any);
