import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://wgszvwktwjvzeazpoxte.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indnc3p2d2t0d2p2emVhenBveHRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEyNTIyMDUsImV4cCI6MjA0NjgyODIwNX0.NnXzQkcwzFFSTWVpZ8NIvUcJxlSkKnvhsiV6q0rawE0')