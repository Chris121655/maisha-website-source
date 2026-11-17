# MAISHA storefront

Latest standalone export, including the final Home and Products category groupings.

Read **DEPLOY.md** for environment settings, database setup, local commands, hosting targets, and the deployment checklist.

```sh
npm ci
# Copy .env.example to .env and fill in your own backend configuration.
npm run dev
npm test
npm run build
npm start
```

Node 22.12+ required. This is a full-stack TanStack Start app, not a static site.
No Lovable account, hosting, GitHub sync, or private Lovable API key is required to run it.
