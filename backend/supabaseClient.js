const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use Service Role Key for Admin Access

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
