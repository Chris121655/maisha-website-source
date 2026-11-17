# MAISHA — standalone deployment guide

This export contains the latest category changes, all five pages, the original logos/favicon, 22 full image files plus the favicon, the public catalog, all server code, tests, configuration and lockfiles. No GitHub connection or hosting account was changed.

## 1. What you are deploying

React 19 + TanStack Start + Vite + Tailwind; Nitro packages server-side rendering and server functions for the selected host. It is **not a static SPA**. Uploading only static files breaks catalog reads and the API. The export defaults to a portable Node 22 server, rather than Lovable hosting.

There is no `index.html` in this framework: `src/routes/__root.tsx` generates the HTML document. Do not add an SPA index.html or fallback redirect.

`@lovable.dev/vite-tanstack-config` is a public npm build package, not a sync connection; it does not require a Lovable account. Framework versions remain pinned as in the project. Its deployment target is explicitly configured in `vite.config.ts`.

## 2. Environment variables — exact names

Copy `.env.example` to `.env` locally (PowerShell: `Copy-Item .env.example .env`; macOS/Linux: `cp .env.example .env`). Fill the values yourself; do not send credentials in chat.

| Name | Required? | Value/source | When used |
|---|---|---|---|
| `SUPABASE_URL` | Yes | HTTPS project API URL from **your own compatible backend provider's project API configuration** | Server catalog reads and API routes at runtime |
| `SUPABASE_PUBLISHABLE_KEY` | Yes | Same project's public/publishable (or legacy anon) API key | Server public read-only catalog access |
| `VITE_SUPABASE_URL` | Yes | Same public project API URL as `SUPABASE_URL` | Browser build-time configuration |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Yes | Same public/publishable key as above | Browser build-time configuration |
| `VITE_SUPABASE_PROJECT_ID` | No | Your new project's identifier, if needed for future tooling | Not read by current storefront |
| `NITRO_PRESET` | No | `node-server` (default), `vercel`, `netlify`, or `cloudflare-module` | Build time; select a hosting target |
| `PORT` | No | Hosting-assigned port, default 3000 | Node runtime |
| `HOST` | No | Usually `0.0.0.0` | Node runtime |

The `SUPABASE_*` names are compatibility names used by the supplied code. The replacement backend must offer the compatible Postgres Data API and public-key SDK contract; a plain Postgres connection string alone is not enough.

**Current Lovable Cloud credentials:** this download intentionally does not expose the managed project's address, private credentials, or internal environment file. Lovable Cloud does not provide its database password or service-role key for export. The complete schema and starter data are supplied so you can configure your own independent backend instead. No private/service-role key is required for this storefront.

`LOVABLE_API_KEY`, `LOVABLE_CRON_SECRET`, `SUPABASE_SERVICE_ROLE_KEY`, and `SUPABASE_DB_URL` are **not needed to run the storefront**. Generated integration utilities mention some of these, but are not called by any storefront workflow. `drizzle.config.ts` only needs `SUPABASE_DB_URL` if you deliberately use Drizzle schema tooling; running the SQL manually does not need it. Do not configure unused secrets. There are no payment, AI, or email-delivery API keys.

All `VITE_*` values are public and baked into the browser bundle: never put private credentials there. Set browser values before every production build; set the two server variables at runtime on your host. `.env` is excluded from Git and the ZIP; only the blank template is included.

## 3. Create the independent backend

1. Create your own Postgres backend project that supports the Data API and SDK used in `src/lib/maisha.functions.ts`.
2. Open that provider's SQL editor and run `supabase/migrations/20261117000000_products_catalog.sql` **once on a fresh database**. The same SQL is also in `drizzle/migrations/`; these are copies, not two migrations to run.
3. It creates `public.products`: `slug` text primary key; `name` text; `category` text constrained to `household`, `laundry`, `personal`, `auto`; `sort_order` integer; `prices` JSONB; nullable `featured` JSONB. Amounts are cents: 2500 = R25.
4. The script grants read access to `anon` and `authenticated`, enables row-level security, and creates a public SELECT-only policy. Visitor INSERT/UPDATE/DELETE remain denied. The named roles must exist (a compatible managed backend normally supplies them).
5. Confirm `select count(*) from public.products;` returns **19**. Confirm Dish Washing Liquid has 1 Litre at 2500 cents and Pine Gel has 500ml at 2000 cents.
6. Ensure the provider's Data API is enabled and exposes the `public` schema. Put its HTTPS API URL and public key in the four required environment variables.
7. No application auth accounts, OAuth providers, storage buckets, database triggers/functions, cron jobs, webhooks, or separately deployed edge functions need creating. Product images are ordinary local public files.

The 19 products and their prices are the bundled catalog, not an export of additional records from the original MongoDB deployment. If you have other production records, export and import them separately; they were not supplied with the source project.

The owner-defined four display categories are intentionally mapped by slug in `src/lib/maisha-home-categories.ts`; Air Fresheners appears in two groups without changing the database's legacy single category value.

## 4. Install, run, test and build

Use Node **22.12+**, preferably current Node 22 LTS, and npm.

```sh
npm ci                 # reproducible install from package-lock.json
# npm install also works if intentionally updating dependencies
npm run dev            # http://localhost:8080
npm test               # route, category, and price checks
npm run build          # default Node output: .output/
npm start              # serves production app on http://localhost:3000
```

`npm start` reads `.env` if present. With hosting-provided runtime variables it needs no `.env`. `bun.lock` is also included; if using Bun, the export's package name changed, so allow `bun install` to refresh the workspace name. Prefer npm ci for this export.

**Publish output:** `.output/server/index.mjs` is the Node entry, `.output/public` contains assets. Deploy **the whole `.output/` directory**, not `.output/public` alone. The host must keep the Node server running; use its service manager/restart policy. `npm run preview` is a development convenience, not the production startup command.

## 5. Hosting choices

### A. Node service / VPS / Docker — default and locally verified

- Build command: `npm ci && npm run build`.
- Start command: `npm start` when deploying the source, or `node .output/server/index.mjs` when deploying only the built output.
- Set the four required variables on the host; the browser two must also exist during build.
- Listen on the host's `PORT`, bind `HOST=0.0.0.0`.
- Forward your HTTPS reverse proxy to that process without rewriting routes to index.html.
- `Dockerfile` and `.dockerignore` are included. Supply `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` as Docker build arguments; supply `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` as runtime environment variables. Do not bake `.env` into the image.

### B. Vercel

- Import your manually created GitHub repository into Vercel; this does not connect it to Lovable.
- Set `NITRO_PRESET=vercel` plus all four required variables in project environment settings before building.
- Included `vercel.json`: npm ci install and npm run build; Nitro selects the native Vercel output. Nitro generates `.vercel/output` containing the actual functions and routing manifest; deploy that full generated output through Vercel.
- No SPA rewrites needed.

### C. Netlify

- Import your own repository into Netlify and set the four required environment variables for both build and runtime.
- Included `netlify.toml` selects `netlify`, Node 22, npm run build and `dist` assets.
- Nitro generates Netlify functions and routing files as part of the build. Deploy the full framework build through Netlify, not a manual upload of the assets folder.
- No `/* /index.html 200` rule: it would bypass server routes.

### D. Cloudflare Workers

Select `cloudflare-module` for the build (`NITRO_PRESET=cloudflare-module` in CI or your shell, not a Lovable environment). Node compatibility and deploy-config generation are enabled in `vite.config.ts`.

```sh
npm run build
npx wrangler login
npx wrangler deploy --config .output/server/wrangler.json
```

Set the two server variables under the deployed Worker's settings; set the browser variables during the build. Nitro generates the Worker entry and asset bindings. Do not upload just `.output/public` to static Pages.

Host-specific live deployment is not performed by this export. Node production startup and all four hosting builds were tested locally; live deployments still require verification in your own hosting account.

## 6. Server source and preserved URLs

- `src/server.ts`: SSR server entry/error handling.
- `src/start.ts`: request middleware, CSRF protection, and generated session-header middleware. All catalog reads remain public; no sign-in is required.
- `src/lib/maisha.functions.ts`: `getCatalogProducts` server function used by page loaders.
- `src/routes/api.products.ts`: GET `/api/products`; catalog JSON with optional legacy category filter.
- `src/routes/api.health.ts`: GET `/api/health`; verifies database access.
- `src/routes/api.index.ts`: existing `/api` response.
- `src/routes/index.tsx`, `products.tsx`, `prices.tsx`, `about.tsx`, `contact.tsx`: all existing content URLs preserved.

These deploy **with the web app**, not as separate backend edge functions. Do not deploy the old Express/MongoDB server.

External services used without credentials: Google Fonts for DM Sans; WhatsApp ordering links to the original number; `tel:` and `mailto:` links. No assets depend on Lovable's preview URL; all original photos and logos are under `public/images/` and their asset pointers use `/images/...`.

## 7. GitHub without Lovable sync

Create an empty repository in your own GitHub account. Extract this ZIP, open the `maisha-storefront` folder in VS Code, and use your usual Git workflow or VS Code's Source Control → Publish to GitHub. This ZIP has no `.git` directory, no Git remote, and no automatic sync setup. Keep `.env` untracked; commit `.env.example`, source, SQL and lockfiles. A hosting provider's optional GitHub integration is independent of Lovable.

## 8. Deployment checklist

- [ ] Extract ZIP and install Node 22.12+.
- [ ] Create independent compatible backend; run SQL once; confirm 19 rows.
- [ ] Create local `.env`; fill four required URL/public-key values.
- [ ] `npm ci`, `npm test`, `npm run dev`; check all five pages.
- [ ] Set hosting preset and build-time browser settings.
- [ ] `npm run build`; deploy server and assets together.
- [ ] Set server URL/public key in hosting runtime settings.
- [ ] `/api/health` returns `{"status":"ok","database":"connected"}`.
- [ ] `/api/products` returns 19 products; `/prices` shows all prices.
- [ ] Refresh `/products`, `/prices`, `/about`, `/contact` directly; check category filters and WhatsApp links.
- [ ] Add original MongoDB records only if there are records beyond the starter catalog.
- [ ] Connect your domain to your chosen host and verify HTTPS.

## Verification and dependency notes

Fresh install, 16 tests, Node build and production startup passed. All five pages, health/catalog APIs, 19 price cards, a category filter, logos and local images were checked against the existing catalog for validation only; the independent backend must still be created by you. No live host or new database was provisioned.

The current dependency audit reports 6 advisories (2 high, 4 moderate). They are not silently fixed in an export of your existing project; review `npm audit` before public deployment. No secrets are included.

If npm 10 fails to regenerate a lockfile with an `edgesOut` error, use npm 11 (`npx npm@11 ci` or `npx npm@11 install`). The included package-lock was generated with npm 11.
