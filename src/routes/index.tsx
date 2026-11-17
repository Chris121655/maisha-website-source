import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

import maishaHero from "@/assets/lifestyle/maisha-product-lineup.jpg.asset.json";
import { MaishaLayout } from "@/components/maisha/maisha-layout";
import { HomeAboutUs, HomeCategories, HomeFeaturedProducts, HomeWhyUs } from "@/components/maisha/home-sections";
import { Button } from "@/components/ui/button";
import { productQueryOptions } from "@/lib/maisha-catalog";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(productQueryOptions),
  errorComponent: ({ error }) => <p className="page-error" role="alert">{error instanceof Error ? error.message : "The product catalog is temporarily unavailable."}</p>,
  notFoundComponent: () => <p className="page-error">This page could not be found.</p>,
  head: () => ({
    meta: [
      { title: "MAISHA | Everyday hygiene, at the right price" },
      { name: "description", content: "Explore MAISHA hygiene and cleaning products for homes, businesses, hospitals, and schools." },
      { property: "og:title", content: "MAISHA | Everyday hygiene, at the right price" },
      { property: "og:description", content: "Explore MAISHA hygiene and cleaning products for homes, businesses, hospitals, and schools." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { data } = useSuspenseQuery(productQueryOptions);

  return (
    <div className="maisha-home"><MaishaLayout homeNavigation>
      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow">Hygiene and cleaning products</p>
            <h1>We provide you with quality products, at the right price, always...</h1>
            <p className="hero-description">Our products undergo rigorous testing to ensure safe use in homes, businesses, hospitals and schools.</p>
          <div className="hero-actions">
            <Button asChild className="home-hero-button"><Link to="/prices">View products and prices</Link></Button>
            <Button asChild variant="outline" className="home-hero-button"><Link to="/contact">Contact us to order</Link></Button>
          </div>
        </div>
        <div className="hero-image"><img src={maishaHero.url} alt="MAISHA household, laundry, and car care products" /></div>
      </section>
      <HomeCategories />
      <HomeFeaturedProducts products={data.products} />
      <HomeWhyUs />
      <HomeAboutUs />
    </MaishaLayout></div>
  );
}
