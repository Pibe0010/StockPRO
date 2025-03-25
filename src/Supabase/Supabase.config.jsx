import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_APP_SUPABAE_URL,
  import.meta.env.VITE_APP_SUPABAE_ANON_KEY
);
