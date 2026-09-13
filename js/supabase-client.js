/* Supabase project connection. The "publishable"/anon key is safe to ship in
   client code by design (it only works within the Row Level Security rules
   defined on the project) — it is NOT a secret admin key. */
(function (global) {
  "use strict";
  var SUPABASE_URL = "https://mlnyrbshfyarpyjujpfm.supabase.co";
  var SUPABASE_ANON_KEY = "sb_publishable_2KJSsIazLWhIhVo8aMSXcw_Tcr4WEHZ";

  if (!global.supabase || !global.supabase.createClient) {
    console.error("Koach: Supabase library failed to load — check the CDN script tag.");
    return;
  }
  global.sb = global.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
})(window);
