import { createClient } from "@supabase/supabase-js";
import { createFileRoute } from "@tanstack/react-router";

import type { Database } from "@/integrations/supabase/types";

function getPublicClient() {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) throw new Error("The product catalog is unavailable.");
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => {
      const headers = new Headers(init?.headers);
      if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
      headers.set("apikey", key);
      return fetch(input, { ...init, headers });
    } },
  });
}

export const Route = createFileRoute("/api/products")({
  server: { handlers: { GET: async () => {
    try {
      const { data, error } = await getPublicClient().from("products").select("slug, name, category, sort_order, prices, featured").order("sort_order");
      if (error) throw error;
      const products = data.map((row) => ({ slug: row.slug, name: row.name, category: row.category, sortOrder: row.sort_order, prices: row.prices, featured: row.featured }));
      return Response.json({ products }, { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } });
    } catch {
      return Response.json({ error: "The product catalog is temporarily unavailable." }, { status: 503, headers: { "Cache-Control": "no-store" } });
    }
  } } },
});