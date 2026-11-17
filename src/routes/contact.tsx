import { createFileRoute } from "@tanstack/react-router";

import { ContactOptions } from "@/components/maisha/store-sections";
import { MaishaLayout } from "@/components/maisha/maisha-layout";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact | MAISHA Hygiene & Cleaning Products" },
    { name: "description", content: "Contact MAISHA by phone, email, or WhatsApp with product questions and orders." },
    { property: "og:title", content: "Contact | MAISHA Hygiene & Cleaning Products" },
    { property: "og:description", content: "Contact MAISHA by phone, email, or WhatsApp with product questions and orders." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ContactPage,
});

function ContactPage() {
  return <MaishaLayout><ContactOptions /></MaishaLayout>;
}