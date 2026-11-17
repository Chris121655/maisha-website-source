export type ProductCategory = "household" | "laundry" | "personal" | "auto";

export type ProductPrice = {
  size: string;
  amountCents: number;
};

export type FeaturedProduct = {
  size: string;
  imageIndex: number;
};

export type CatalogProduct = {
  slug: string;
  name: string;
  category: ProductCategory;
  sortOrder: number;
  prices: ProductPrice[];
  featured: FeaturedProduct | null;
};

export type ProductCategoryFilter = ProductCategory | "all";

export const productCategories: Array<{ category: ProductCategory; name: string }> = [
  { category: "household", name: "Home Care" },
  { category: "laundry", name: "Laundry Care" },
  { category: "personal", name: "Personal Care" },
  { category: "auto", name: "Automotive Care" },
];

export const reasons = [
  { number: "01", title: "Value for money", text: "High quality for the best price." },
  { number: "02", title: "On-time delivery", text: "We deliver on time, all the time." },
  { number: "03", title: "Local business support", text: "Our base chemicals are sourced locally." },
];

export function formatPrice(amountCents: number, compact = false): string {
  const amount = `R${(amountCents / 100).toFixed(2)}`;
  return compact ? amount.replace(/\.00$/, "") : amount;
}