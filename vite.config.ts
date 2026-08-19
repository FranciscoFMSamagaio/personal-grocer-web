// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/tanstack/vite";
import netlify from "@netlify/vite-plugin-tanstack-start";

const isGitHubPages = process.env["GITHUB_PAGES"] === "true";
const base = isGitHubPages ? process.env["BASE_PATH"] || "/" : "/";

export default defineConfig({
  ...(isGitHubPages
    ? {
        tanstackStart: {
          static: true,
          prerender: {
            enabled: true,
            autoStaticPathsDiscovery: true,
            crawlLinks: true,
          },
        },
      }
    : {}),
  nitro: false as const,
  vite: {
    base,
    plugins: [mcpPlugin(), ...(isGitHubPages ? [] : [netlify()])],
  },
});
