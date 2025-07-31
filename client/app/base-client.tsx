//import {createClient} from '@supabase/supabase-js'

//const BASE_URL = "http://localhost:3001"
//const BASE_ANON_KEY = ""

//export const base = createClient(BASE_URL, BASE_ANON_KEY);

const API_BASE_URL = import.meta.env.VITE_API_URL; // For Production, replace with new url
export default API_BASE_URL;