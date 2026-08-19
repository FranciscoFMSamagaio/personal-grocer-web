import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import netlify from "@netlify/vite-plugin-tanstack-start";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

const isGitHubPages = process.env["GITHUB_PAGES"] === "true";
const base = isGitHubPages ? process.env["BASE_PATH"] || "/" : "/";

export default defineConfig({
  base,
  plugins: [
    tanstackStart(
      isGitHubPages
        ? {
            static: true,
            prerender: {
              enabled: true,
              autoStaticPathsDiscovery: true,
              crawlLinks: true,
            },
          }
        : undefined,
    ),
    ...(isGitHubPages ? [] : [netlify()]),
    viteReact(),
    tailwindcss(),
    tsConfigPaths(),
  ],
});
