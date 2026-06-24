import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://imitebaejlmvvzjczafg.supabase.co/rest/v1/"; // 👈 tu Project URL
const supabaseKey = "sb_publishable_CKTP5AbuQU0QTKyS_c268w_aj33-KI1"; // 👈 tu Publishable key

export const supabase = createClient(supabaseUrl, supabaseKey);
