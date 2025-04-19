
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://xghujeuskbyznfwgpyci.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhnaHVqZXVza2J5em5md2dweWNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5OTA1NDYsImV4cCI6MjA2MDU2NjU0Nn0.6yFfmN7yQ6_dloRFlvk0o9GFpJF08JwfybhUDnLvSD8";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});
