import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SECRET ? process.env.SUPABASE_SECRET : ''
)

export default supabase