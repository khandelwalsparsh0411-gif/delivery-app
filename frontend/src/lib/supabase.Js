import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 
"https://yjpnhcuzmkbmkjeilxuj.supabase.co";
const supabaseKey = 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqcG5oY3V6bWtibWtqZWlseHVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5MDUwMjEsImV4cCI6MjA5NDQ4MTAyMX0.RVlJG4GPbOZAZVAqAVwKlxBjowEG9FiPcMM_o62eh38";
export const supabase = createClient(supabaseUrl, supabaseKey)
