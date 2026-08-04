// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/tanstack/vite";

// GitHub Pages serves the site under the repository name (e.g. /repo-name/).
// The workflow sets BASE_PATH; locally we default to "/".
const base = process.env["BASE_PATH"] || "/";

export default defineConfig({
  tanstackStart: {
    // Generate a static site (no SSR runtime) so GitHub Pages can serve it.
    static: true,
    prerender: {
      enabled: true,
      autoStaticPathsDiscovery: true,
      crawlLinks: true,
    },
  },
  // Disable Nitro; static output does not need a server runtime.
  nitro: false,
  vite: {
    base,
    plugins: [mcpPlugin()],
  },
});
