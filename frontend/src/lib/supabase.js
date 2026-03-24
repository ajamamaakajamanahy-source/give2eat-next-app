import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://placeholder-url.supabase.co'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'placeholder-key'

let supabase;
try {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
          persistSession: typeof window !== 'undefined' && typeof localStorage !== 'undefined',
          autoRefreshToken: true,
      }
  });
} catch (e) {
  console.warn('Supabase initialization failed:', e);
  // Create a mock client that won't crash the app
  supabase = {
    auth: {
      signInWithOtp: async () => ({ error: new Error('Supabase not configured') }),
      signOut: async () => ({ error: null }),
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
    from: () => ({
      select: () => ({ data: [], error: null }),
      insert: () => ({ data: null, error: new Error('Supabase not configured') }),
    }),
  };
}

export { supabase };
