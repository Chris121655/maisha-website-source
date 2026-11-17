import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/")({
  server: { handlers: { GET: async () => Response.json({ error: "API route not found." }, { status: 404 }) } },
});