import { queryOptions } from "@tanstack/react-query";

import { getCatalogProducts } from "@/lib/maisha.functions";

export const productQueryOptions = queryOptions({
  queryKey: ["maisha", "products"],
  queryFn: () => getCatalogProducts(),
  staleTime: 60_000,
});