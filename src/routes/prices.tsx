import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { MaishaLayout } from "@/components/maisha/maisha-layout";
import { PriceList } from "@/components/maisha/product-sections";
import { productQueryOptions } from "@/lib/maisha-catalog";

export const Route = createFileRoute("/prices")({
  loader: ({ context }) => context.queryClient.ensureQueryData(productQueryOptions),
  errorComponent: ({ error }) => <p className="page-error" role="alert">{error instanceof Error ? error.message : "The product catalog is temporarily unavailable."}</p>,
  notFoundComponent: () => <p className="page-error">This page could not be found.</p>,
  head: () => ({ meta: [
    { title: "Prices | MAISHA Hygiene & Cleaning Products" },
    { name: "description", content: "Compare pack sizes and prices for the full MAISHA hygiene and cleaning products range." },
    { property: "og:title", content: "Prices | MAISHA Hygiene & Cleaning Products" },
    { property: "og:description", content: "Compare pack sizes and prices for the full MAISHA hygiene and cleaning products range." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: PricesPage,
});

function PricesPage() {
  const { data } = useSuspenseQuery(productQueryOptions);
  return <MaishaLayout><section className="page-intro page-intro-compact section"><div className="page-intro-copy"><p className="eyebrow">A clear price guide</p><h1>Sizes and prices</h1><p>Compare pack sizes and prices for the full MAISHA range.</p></div></section><PriceList products={data.products} /></MaishaLayout>;
}