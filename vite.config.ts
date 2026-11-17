import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Default to a portable Node server. Hosting CI can set NITRO_PRESET.
const preset = process.env.NITRO_PRESET || "node-server";

export default defineConfig({
  nitro: {
    preset,
    ...(preset === "node-server" || preset === "cloudflare-module" ? {
      output: { dir: ".output", serverDir: ".output/server", publicDir: ".output/public" },
    } : {}),
    cloudflare: { nodeCompat: true, deployConfig: true },
  },
  tanstackStart: { server: { entry: "server" } },
  vite: { server: { host: "0.0.0.0", port: 8080 } },
});
