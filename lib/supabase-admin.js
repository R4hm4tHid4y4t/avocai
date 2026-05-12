// lib/supabase-admin.js
// Supabase client untuk server-side (bypass RLS)
// Gunakan HANYA di Server Components & Server Actions

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Secret key (service role) — bypass RLS, JANGAN expose ke client
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // fallback ke anon jika belum diset

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});