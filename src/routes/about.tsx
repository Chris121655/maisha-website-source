import { createFileRoute } from "@tanstack/react-router";

import { AboutStory, WhyChooseMaisha } from "@/components/maisha/store-sections";
import { MaishaLayout } from "@/components/maisha/maisha-layout";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About | MAISHA Hygiene & Cleaning Products" },
    { name: "description", content: "Learn about MAISHA's mission to make quality hygiene and cleaning products accessible." },
    { property: "og:title", content: "About | MAISHA Hygiene & Cleaning Products" },
    { property: "og:description", content: "Learn about MAISHA's mission to make quality hygiene and cleaning products accessible." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: AboutPage,
});

function AboutPage() {
  return <MaishaLayout><section className="page-intro page-intro-compact section"><div className="page-intro-copy"><p className="eyebrow">Our story</p><h1>About MAISHA</h1><p>Quality hygiene and cleaning products should be accessible to every home, business, and community.</p></div></section><WhyChooseMaisha /><AboutStory /></MaishaLayout>;
}