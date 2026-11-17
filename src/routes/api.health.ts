import { createClient } from "@supabase/supabase-js";
import { createFileRoute } from "@tanstack/react-router";

import type { Database } from "@/integrations/supabase/types";

export const Route = createFileRoute("/api/health")({
  server: { handlers: { GET: async () => {
    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) return Response.json({ status: "unavailable", database: "disconnected" }, { status: 503 });
    const client = createClient<Database>(url, key, { auth: { persistSession: false, autoRefreshToken: false }, global: { fetch: (input, init) => {
      const headers = new Headers(init?.headers);
      if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
      headers.set("apikey", key);
      return fetch(input, { ...init, headers });
    } } });
    const { error } = await client.from("products").select("slug", { count: "exact", head: true });
    return Response.json({ status: error ? "unavailable" : "ok", database: error ? "disconnected" : "connected" }, { status: error ? 503 : 200 });
  } } },
});