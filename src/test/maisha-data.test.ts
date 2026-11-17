import { describe, expect, it } from "vitest";

import { formatPrice } from "@/lib/maisha-data";

describe("MAISHA catalog prices", () => {
  it("formats the bundled R25 price in the full price list", () => {
    expect(formatPrice(2500)).toBe("R25.00");
  });

  it("keeps the featured product price compact", () => {
    expect(formatPrice(2500, true)).toBe("R25");
  });
});