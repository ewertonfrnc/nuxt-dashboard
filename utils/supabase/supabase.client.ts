import { createClient } from "@supabase/supabase-js";
const {
  public: { supabaseKey },
} = useRuntimeConfig();

const supabaseUrl = "https://xkichgxdmzcpwbhyiujd.supabase.co";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
