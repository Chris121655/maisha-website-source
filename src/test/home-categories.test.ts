import { describe, expect, it } from "vitest";

import { homeCategories, productsForStorefrontCategory } from "@/lib/maisha-home-categories";

const slugsFor = (categoryName: string) =>
  homeCategories.find((category) => category.name === categoryName)?.items.map((item) => item.slug);

describe("MAISHA home page categories", () => {
  it("shows the four categories in the order the PDF lays them out", () => {
    expect(homeCategories.map((category) => category.name)).toEqual([
      "Body Hygiene",
      "Surface cleaners & Disinfectants",
      "Laundry and Kitchen",
      "Car Wash",
    ]);
  });

  it("groups Body Hygiene as Bubble Bath, Shower Gel and Hand Soap", () => {
    expect(slugsFor("Body Hygiene")).toEqual(["bubble-bath", "shower-gel", "liquid-hand-soap", "hair-body-wash"]);
  });

  it("groups Laundry and Kitchen as dish liquid, washing powder, softener, bleach and air freshener", () => {
    expect(slugsFor("Laundry and Kitchen")).toEqual([
      "dish-washing-liquid",
      "laundry-washing-powder",
      "fabric-softener",
      "bleach",
      "air-fresheners",
      "fabric-stain-remover",
    ]);
  });

  it("groups Surface cleaners & Disinfectants as multipurpose, thick bleach, pine gel, tile cleaner and madubula", () => {
    expect(slugsFor("Surface cleaners & Disinfectants")).toEqual([
      "multipurpose-cleaner",
      "thick-bleach",
      "pine-gel",
      "tile-cleaner",
      "madubula-js-fluid",
      "handy-andy",
    ]);
  });

  it("groups Car Wash as dashboard polish, tyre shine, car shampoo and air freshener", () => {
    expect(slugsFor("Car Wash")).toEqual(["dashboard-polish", "tyre-shine", "car-shampoo", "air-fresheners"]);
  });
});

describe("Products page category filtering", () => {
  const products = [...new Set(homeCategories.flatMap(({ items }) => items.map(({ slug }) => slug)))].reverse().map((slug) => ({ slug, category: "legacy" }));

  it.each([
    ["Body Hygiene", ["bubble-bath", "shower-gel", "liquid-hand-soap", "hair-body-wash"]],
    ["Laundry and Kitchen", ["dish-washing-liquid", "laundry-washing-powder", "fabric-softener", "bleach", "air-fresheners", "fabric-stain-remover"]],
    ["Surface cleaners & Disinfectants", ["multipurpose-cleaner", "thick-bleach", "pine-gel", "tile-cleaner", "madubula-js-fluid", "handy-andy"]],
    ["Car Wash", ["dashboard-polish", "tyre-shine", "car-shampoo", "air-fresheners"]],
  ])("returns the exact requested products for %s regardless of legacy categories", (name, expected) => {
    expect(productsForStorefrontCategory(products, name as string).map(({ slug }) => slug)).toEqual(expected);
  });
});
