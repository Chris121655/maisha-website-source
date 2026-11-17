import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";
import type { CatalogProduct, ProductCategory } from "@/lib/maisha-data";

type ProductRow = {
  slug: string;
  name: string;
  category: ProductCategory;
  sort_order: number;
  prices: CatalogProduct["prices"];
  featured: CatalogProduct["featured"];
};

function createPublicCatalogClient() {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) throw new Error("The product catalog is unavailable.");

  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}

export const getCatalogProducts = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await createPublicCatalogClient()
    .from("products")
    .select("slug, name, category, sort_order, prices, featured")
    .order("sort_order", { ascending: true });

  if (error) throw new Error("The product catalog is temporarily unavailable.");

  const products = (data as ProductRow[]).map((row) => ({
    slug: row.slug,
    name: row.name,
    category: row.category,
    sortOrder: row.sort_order,
    prices: row.prices,
    featured: row.featured,
  }));

  return { products };
});
