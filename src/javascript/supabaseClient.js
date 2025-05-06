// supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// Vite exposes env vars as import.meta.env.VITE_*
const SUPABASE_URL   = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
