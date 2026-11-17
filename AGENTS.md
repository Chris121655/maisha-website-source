# Standalone project architecture

## Application architecture

- Keep the storefront on TanStack Start and use the configured compatible backend for its public product catalog; the imported MongoDB server cannot run in the edge runtime.
- Keep public catalog reads in server functions, and preserve external HTTP catalog and health endpoints with read-only TanStack server routes.
- Keep the PDF-inspired home sections and styles isolated behind a home-only layout option so redesigns do not alter the other content pages.
- Use the shared storefront slug groupings for home cards and Products page filters/directories; this supports products belonging to multiple groups without changing catalog storage.
