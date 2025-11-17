import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://hmrfbkmshmawgbvempac.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtcmZia21zaG1hd2didmVtcGFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNDAwNzIsImV4cCI6MjA3MzkxNjA3Mn0.9aimxRNX3vKw4xxvlT8gajd3A5LP132RUxHmrmEV5Bw";
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

export { supabase as s };
