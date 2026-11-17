import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { MaishaLayout } from "@/components/maisha/maisha-layout";
import { ProductsPageContent } from "@/components/maisha/product-sections";
import { productQueryOptions } from "@/lib/maisha-catalog";

export const Route = createFileRoute("/products")({
  loader: ({ context }) => context.queryClient.ensureQueryData(productQueryOptions),
  errorComponent: ({ error }) => <p className="page-error" role="alert">{error instanceof Error ? error.message : "The product catalog is temporarily unavailable."}</p>,
  notFoundComponent: () => <p className="page-error">This page could not be found.</p>,
  head: () => ({ meta: [
    { title: "Products | MAISHA Hygiene & Cleaning Products" },
    { name: "description", content: "Browse MAISHA Body Hygiene, Laundry and Kitchen, Surface cleaners & Disinfectants, and Car Wash products." },
    { property: "og:title", content: "Products | MAISHA Hygiene & Cleaning Products" },
    { property: "og:description", content: "Browse MAISHA Body Hygiene, Laundry and Kitchen, Surface cleaners & Disinfectants, and Car Wash products." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ProductsPage,
});

function ProductsPage() {
  const { data } = useSuspenseQuery(productQueryOptions);
  return <MaishaLayout><ProductsPageContent products={data.products} /></MaishaLayout>;
}