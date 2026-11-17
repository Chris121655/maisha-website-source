import { useState } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { formatPrice, type CatalogProduct } from "@/lib/maisha-data";
import { homeCategories, productsForStorefrontCategory } from "@/lib/maisha-home-categories";
import airFreshenersImage from "@/assets/lifestyle/maisha-air-fresheners.jpg.asset.json";
import bleachImage from "@/assets/lifestyle/maisha-bleach.jpg.asset.json";
import bubbleBathImage from "@/assets/lifestyle/maisha-bubble-bath.jpg.asset.json";
import carShampooImage from "@/assets/lifestyle/maisha-car-shampoo.jpg.asset.json";
import dashboardPolishImage from "@/assets/lifestyle/maisha-dashboard-polish.jpg.asset.json";
import dishImage from "@/assets/lifestyle/maisha-dishwashing-liquid.jpg.asset.json";
import softenerImage from "@/assets/lifestyle/maisha-fabric-softener.jpg.asset.json";
import madubulaImage from "@/assets/lifestyle/maisha-madubula.jpg.asset.json";
import multipurposeImage from "@/assets/lifestyle/maisha-multipurpose-cleaner.jpg.asset.json";
import pineImage from "@/assets/lifestyle/maisha-pine-gel.jpg.asset.json";
import showerGelImage from "@/assets/lifestyle/maisha-shower-gel.jpg.asset.json";
import stainRemoverImage from "@/assets/lifestyle/maisha-stain-remover.jpg.asset.json";
import thickBleachImage from "@/assets/lifestyle/maisha-thick-bleach.jpg.asset.json";
import tileCleanerImage from "@/assets/lifestyle/maisha-tile-cleaner.jpg.asset.json";
import tyreImage from "@/assets/lifestyle/maisha-tyre-shine.jpg.asset.json";

const featuredProducts = [
  { slug: "dish-washing-liquid", image: dishImage.url, alt: "MAISHA dishwashing liquid" },
  { slug: "pine-gel", image: pineImage.url, alt: "MAISHA Pine Gel" },
  { slug: "fabric-softener", image: softenerImage.url, alt: "MAISHA fabric softener" },
  { slug: "tyre-shine", image: tyreImage.url, alt: "MAISHA Tyre Shine" },
];

const productPhotos = [
  { slug: "air-fresheners", image: airFreshenersImage.url },
  { slug: "bleach", image: bleachImage.url },
  { slug: "bubble-bath", image: bubbleBathImage.url },
  { slug: "car-shampoo", image: carShampooImage.url },
  { slug: "dashboard-polish", image: dashboardPolishImage.url },
  { slug: "dish-washing-liquid", image: dishImage.url },
  { slug: "fabric-softener", image: softenerImage.url },
  { slug: "madubula-js-fluid", image: madubulaImage.url },
  { slug: "multipurpose-cleaner", image: multipurposeImage.url },
  { slug: "pine-gel", image: pineImage.url },
  { slug: "shower-gel", image: showerGelImage.url },
  { slug: "fabric-stain-remover", image: stainRemoverImage.url },
  { slug: "thick-bleach", image: thickBleachImage.url },
  { slug: "tile-cleaner", image: tileCleanerImage.url },
  { slug: "tyre-shine", image: tyreImage.url },
];

export function FeaturedProducts({ products }: { products: CatalogProduct[] }) {
  const featured = featuredProducts.flatMap((item) => {
    const product = products.find((entry) => entry.slug === item.slug);
    if (!product?.featured) return [];
    const price = product.prices.find((entry) => entry.size === product.featured?.size);
    return price ? [{ ...item, product, price }] : [];
  });

  return (
    <section className="products section" aria-labelledby="featured-products-title">
      <div className="section-heading"><div><p className="eyebrow">MAISHA essentials</p><h2 id="featured-products-title">Featured products</h2></div><Link className="text-link" to="/prices">Compare all prices <ArrowUpRight aria-hidden="true" /></Link></div>
      <div className="product-grid">
        {featured.map(({ product, image, alt, price }) => (
          <article className="product-card" key={product.slug}>
            <div className="product-image"><img src={image} alt={alt} loading="lazy" /></div>
            <div className="product-info"><h3>{product.name}</h3><p>{product.featured?.size}</p><strong>{formatPrice(price.amountCents, true)}</strong>
              <a className="product-order-link" href={`https://wa.me/27688386199?text=${encodeURIComponent(`Hi, I’d like to order ${product.name} (${product.featured?.size}).`)}`} target="_blank" rel="noopener noreferrer" aria-label={`Order ${product.name} on WhatsApp`}><MessageCircle aria-hidden="true" />WhatsApp order</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProductPhotoGallery({ products }: { products: CatalogProduct[] }) {
  const photographed = productPhotos.flatMap(({ slug, image }) => {
    const product = products.find((entry) => entry.slug === slug);
    return product ? [{ product, image }] : [];
  });

  return (
    <section className="product-photo-range section" aria-labelledby="product-photo-range-title">
      <div className="section-heading"><div><p className="eyebrow">MAISHA range</p><h2 id="product-photo-range-title">The products, up close</h2></div></div>
      <div className="product-grid">
        {photographed.map(({ product, image }) => (
          <Link className="product-card" to="/prices" hash={product.slug} key={product.slug} aria-label={`${product.name} sizes and prices`}>
            <div className="product-image"><img src={image} alt={`MAISHA ${product.name}`} loading="lazy" /></div>
            <div className="product-info"><h3>{product.name}</h3><span className="text-link">Sizes and prices <ArrowUpRight aria-hidden="true" /></span></div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function CategoryFilter({ selected, onChange }: { selected: string; onChange: (category: string) => void }) {
  const categories = [{ category: "all", name: "All products" }, ...homeCategories.map(({ name }) => ({ category: name, name }))];
  return (
    <section className="categories section" aria-labelledby="categories-title">
      <div className="section-heading"><div><p className="eyebrow">Find it faster</p><h2 id="categories-title">Shop by category</h2></div><Link className="text-link" to="/prices">See full price list <ArrowUpRight aria-hidden="true" /></Link></div>
      <div className="category-grid" role="group" aria-label="Filter products by category">
        {categories.map(({ category, name }) => <Button className="h-auto min-h-14 whitespace-normal break-words py-3" type="button" variant={selected === category ? "default" : "outline"} aria-pressed={selected === category} key={category} onClick={() => onChange(category)}>{name}</Button>)}
      </div>
    </section>
  );
}

export function ProductDirectory({ products }: { products: CatalogProduct[] }) {
  const groups = homeCategories.map(({ name }) => ({ category: name, name, products: productsForStorefrontCategory(products, name) })).filter((group) => group.products.length > 0);
  return (
    <section className="product-directory section" aria-labelledby="product-directory-title">
      <div className="section-heading"><div><p className="eyebrow">The complete range</p><h2 id="product-directory-title">Browse by category</h2></div></div>
      <div className="product-directory-grid">
        {groups.map((group) => <article className="product-directory-card" key={group.category}><h3>{group.name}</h3><ul>{group.products.map((product) => <li key={product.slug}><Link to="/prices" hash={product.slug}><span>{product.name}</span><ArrowUpRight aria-hidden="true" /></Link></li>)}</ul></article>)}
      </div>
    </section>
  );
}

export function PriceList({ products, variant = "full" }: { products: CatalogProduct[]; variant?: "full" | "category" }) {
  return (
    <section className="price-list section" id="price-list" aria-labelledby="price-list-title">
      <div className="section-heading price-list-heading">
        <div><p className="eyebrow">{variant === "full" ? "The full range" : "Category results"}</p><h2 id="price-list-title">{variant === "full" ? "Product prices" : "Products and prices"}</h2></div>
        <p>Compare sizes and prices at a glance. All prices are in ZAR.</p>
      </div>
      {products.length > 0 ? <div className="price-grid">{products.map((product) => <article className="price-card" id={product.slug} key={product.slug}><h3>{product.name}</h3><dl>{product.prices.map((price) => <div className="price-row" key={price.size}><dt>{price.size}</dt><dd>{formatPrice(price.amountCents)}</dd></div>)}</dl></article>)}</div> : <p className="catalog-status">There are no products listed in this category yet.</p>}
      <div className="price-bottom"><p className="price-note">Prices may change without notice. Specials are available while stocks last.</p><a className="text-link" href="https://wa.me/27688386199" target="_blank" rel="noopener noreferrer">Need help choosing a size? <ArrowUpRight aria-hidden="true" /></a></div>
    </section>
  );
}

export function ProductsPageContent({ products }: { products: CatalogProduct[] }) {
  const [selected, setSelected] = useState("all");
  const visible = selected === "all" ? products : productsForStorefrontCategory(products, selected);
  const selectedName = selected;

  return <>
    <section className="page-intro section"><div className="page-intro-copy"><p className="eyebrow">MAISHA range</p><h1>Products for everyday spaces</h1><p>Explore our featured products, then browse the complete range by category.</p><Link className="text-link" to="/prices">Compare sizes and prices <ArrowUpRight aria-hidden="true" /></Link></div></section>
    <CategoryFilter selected={selected} onChange={setSelected} />
    {selected === "all" ? <><ProductPhotoGallery products={products} /><ProductDirectory products={products} /></> : <PriceList products={visible} variant="category" />}
    {selected !== "all" && <p className="visually-hidden" aria-live="polite">Showing {visible.length} {selectedName.toLowerCase()} products.</p>}
  </>;
}