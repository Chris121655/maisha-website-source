import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { formatPrice, type CatalogProduct } from "@/lib/maisha-data";
import { homeCategories } from "@/lib/maisha-home-categories";
import dishImage from "@/assets/lifestyle/maisha-dishwashing-liquid.jpg.asset.json";
import pineImage from "@/assets/lifestyle/maisha-pine-gel.jpg.asset.json";
import softenerImage from "@/assets/lifestyle/maisha-fabric-softener.jpg.asset.json";
import tyreImage from "@/assets/lifestyle/maisha-tyre-shine.jpg.asset.json";
import showerImage from "@/assets/lifestyle/maisha-shower-gel.jpg.asset.json";
import cleanerImage from "@/assets/lifestyle/maisha-multipurpose-cleaner.jpg.asset.json";
import carImage from "@/assets/lifestyle/maisha-car-shampoo.jpg.asset.json";

const categoryImages: Record<string, string> = {
  "Body Hygiene": showerImage.url,
  "Surface cleaners & Disinfectants": cleanerImage.url,
  "Laundry and Kitchen": softenerImage.url,
  "Car Wash": carImage.url,
};

const featured = [
  { slug: "dish-washing-liquid", size: "1 Litre", image: dishImage.url },
  { slug: "pine-gel", size: "500ml", image: pineImage.url },
  { slug: "fabric-softener", size: "1 Litre", image: softenerImage.url },
  { slug: "tyre-shine", size: "500ml", image: tyreImage.url },
];

export function HomeCategories() {
  return (
    <section className="home-categories section" aria-labelledby="home-categories-title">
      <h2 id="home-categories-title">Shop by category</h2>
      <div className="home-category-grid">
        {homeCategories.map(({ name, items }) => (
          <article className="home-category-card" key={name}>
            <Link to="/products" className="home-category-media" aria-label={`Browse ${name} products`}>
              <img src={categoryImages[name]} alt={`MAISHA ${name} products`} loading="lazy" />
              <span className="home-category-label">{name}<ArrowUpRight aria-hidden="true" /></span>
            </Link>
            <ul className="home-category-items">
              {items.map(({ name: itemName, slug }) => (
                <li key={slug}><Link to="/prices" hash={slug}>{itemName}</Link></li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export function HomeFeaturedProducts({ products }: { products: CatalogProduct[] }) {
  return (
    <section className="home-featured section" id="featured-products" aria-labelledby="home-featured-title">
      <h2 id="home-featured-title">Featured products</h2>
      <div className="product-grid">
        {featured.flatMap(({ slug, size, image }) => {
          const product = products.find((item) => item.slug === slug);
          const price = product?.prices.find((item) => item.size === size);
          if (!product || !price) return [];
          return [
            <Link to="/prices" hash={slug} className="product-card" key={slug} aria-label={`${product.name}, ${size}, ${formatPrice(price.amountCents, true)} — view sizes and prices`}>
              <div className="product-image"><img src={image} alt={`MAISHA ${product.name}`} loading="lazy" /></div>
              <div className="product-info"><h3>{product.name}</h3><p>{size}</p><strong>{formatPrice(price.amountCents, true)}</strong></div>
            </Link>,
          ];
        })}
      </div>
    </section>
  );
}

export function HomeWhyUs() {
  const points = [
    { title: "Value for money", text: "High quality for the best price" },
    { title: "On-time delivery", text: "We deliver on time, all the time" },
    { title: "Local business support", text: "All our base chemicals are sourced locally" },
  ];
  return (
    <section className="home-why section" id="why-us" aria-labelledby="home-why-title">
      <h2 id="home-why-title">Why customers choose us</h2>
      <div className="reason-grid">
        {points.map(({ title, text }, index) => <article key={title}><span>{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}
      </div>
    </section>
  );
}

export function HomeAboutUs() {
  return (
    <section className="home-about section" id="about-us" aria-labelledby="home-about-title">
      <div className="about-copy">
        <h2 id="home-about-title">About us</h2>
        <p>At <strong>Maisha</strong>, we believe that every home, business, and community deserves access to quality hygiene and cleaning products without having to pay premium prices.</p>
        <p>Based in <strong>KuGompo City (formerly East London)</strong>, our company was founded on a simple but powerful principle: cleanliness and hygiene should be accessible to everyone. Having experienced firsthand the realities of South Africa&apos;s diverse socio-economic landscape, our founders recognized the unfair challenges many families and businesses face in accessing effective, high-quality cleaning products.</p>
        <p>This insight inspired the creation of a brand committed to bridging that gap by providing <strong>affordable, reliable, and high-quality hygiene and cleaning solutions</strong> that meet everyday needs.</p>
        <p>Today, we are proud to serve households, businesses, and communities with products that combine quality, value, and dependability. Our mission is to help create cleaner, healthier environments while making hygiene more accessible for all.</p>
        <p className="about-promise">Because everyone deserves a clean and healthy space to live and work.</p>
      </div>
    </section>
  );
}
