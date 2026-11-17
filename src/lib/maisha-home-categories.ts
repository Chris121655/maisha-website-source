export type HomeCategoryItem = {
  /** Name shown on the card; matches the product name in the price list. */
  name: string;
  /** Catalog slug, used to deep-link to that product's price row. */
  slug: string;
};

export type HomeCategory = {
  name: string;
  items: HomeCategoryItem[];
};

/**
 * The four storefront categories as the owner specified them.
 * Air Fresheners belongs to both Laundry and Kitchen and Car Wash, so the
 * grouping lives here rather than in the catalog's single-value category column.
 */
export const homeCategories: HomeCategory[] = [
  {
    name: "Body Hygiene",
    items: [
      { name: "Bubble Bath", slug: "bubble-bath" },
      { name: "Shower Gel", slug: "shower-gel" },
      { name: "Liquid Hand Soap", slug: "liquid-hand-soap" },
      { name: "Hair & Body Wash", slug: "hair-body-wash" },
    ],
  },
  {
    name: "Surface cleaners & Disinfectants",
    items: [
      { name: "Multipurpose Cleaner", slug: "multipurpose-cleaner" },
      { name: "Thick Bleach", slug: "thick-bleach" },
      { name: "Pine Gel", slug: "pine-gel" },
      { name: "Tile Cleaner", slug: "tile-cleaner" },
      { name: "Madubula J's Fluid", slug: "madubula-js-fluid" },
      { name: "Handy Andy", slug: "handy-andy" },
    ],
  },
  {
    name: "Laundry and Kitchen",
    items: [
      { name: "Dish Washing Liquid", slug: "dish-washing-liquid" },
      { name: "Laundry Washing Powder", slug: "laundry-washing-powder" },
      { name: "Fabric Softener", slug: "fabric-softener" },
      { name: "Bleach", slug: "bleach" },
      { name: "Air Fresheners", slug: "air-fresheners" },
      { name: "Fabric Stain Remover", slug: "fabric-stain-remover" },
    ],
  },
  {
    name: "Car Wash",
    items: [
      { name: "Dashboard Polish", slug: "dashboard-polish" },
      { name: "Tyre Shine", slug: "tyre-shine" },
      { name: "Car Shampoo", slug: "car-shampoo" },
      { name: "Air Fresheners", slug: "air-fresheners" },
    ],
  },
];

/** Select by the owner's shared grouping, not the legacy database category. */
export function productsForStorefrontCategory<T extends { slug: string }>(products: T[], categoryName: string): T[] {
  const category = homeCategories.find((entry) => entry.name === categoryName);
  if (!category) return [];
  return category.items.flatMap(({ slug }) => {
    const product = products.find((entry) => entry.slug === slug);
    return product ? [product] : [];
  });
}
