// Vite dependencies.
import {ViteMinifyPlugin} from "vite-plugin-minify";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import {VitePWA} from "vite-plugin-pwa";
import {defineConfig} from "vite";

// https://vitejs.dev/config.
export default defineConfig({
  assetsInclude: ["**/*.md"],
	server: {port: 5200},
	base: '/',
	build: {
    target: ["firefox78", "chrome87", "safari14", "es2020", "edge88"],
    outDir: "./production",
    emptyOutDir: false
  },
  plugins: [
    react(),
    tsconfigPaths(),
    ViteMinifyPlugin({}),
    VitePWA({
      showMaximumFileSizeToCacheInBytesWarning: false,
      devOptions: {enabled: true},
      registerType: "autoUpdate",
      injectRegister: "auto",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,jpg,jpeg,svg,json,txt}"],
        maximumFileSizeToCacheInBytes: 6291456,
        cleanupOutdatedCaches: true
      },
      manifest: {
        description: "The official website of Console Art Cybernetic organization.",
        orientation: "portrait-primary",
        name: "Console Art Cybernetic",
        short_name: "CA Cybernetic",
        id: "consoleartcybernetic",
        background_color: "white",
        start_url: "./index.html",
        display: "standalone",
        theme_color: "white",
        lang: "en",
        categories: [
          "console art cybernetic",
          "desktop development",
          "mobile development",
          "game development",
          "web development",
          "ai development",
          "organization",
          "console art",
          "reach goals",
          "cybernetic",
          "entreprise",
          "technology",
          "console",
          "clients",
          "startup",
          "company",
          "art"
        ],
        screenshots: [
          {
            src: "/assets/render/render_1.webp",
            form_factor: "wide",
            sizes: "1920x1080",
            type: "image/webp"
          },
          {
            src: "/assets/render/render_2.webp",
            form_factor: "wide",
            sizes: "1920x1080",
            type: "image/webp"
          },
          {
            src: "/assets/render/render_3.webp",
            form_factor: "wide",
            sizes: "1920x1080",
            type: "image/webp"
          },
          {
            src: "/assets/render/render_4.webp",
            sizes: "1920x1080",
            type: "image/webp"
          }
        ],
        icons: [
          {
            src: "/assets/logos/logo-16.webp",
            type: "image/webp",
            sizes: "16x16"
          },
          {
            src: "/assets/logos/logo-32.webp",
            type: "image/webp",
            sizes: "32x32"
          },
          {
            src: "/assets/logos/logo-48.webp",
            type: "image/webp",
            sizes: "48x48"
          },
          {
            src: "/assets/logos/logo-64.webp",
            type: "image/webp",
            sizes: "64x64"
          },
          {
            src: "/assets/logos/logo-72.webp",
            type: "image/webp",
            sizes: "72x72"
          },
          {
            src: "/assets/logos/logo-96.webp",
            type: "image/webp",
            sizes: "96x96"
          },
          {
            src: "/assets/logos/logo-128.webp",
            type: "image/webp",
            sizes: "128x128"
          },
          {
            src: "/assets/logos/logo-144.webp",
            type: "image/webp",
            sizes: "144x144"
          },
          {
            src: "/assets/logos/logo-192.webp",
            type: "image/webp",
            sizes: "192x192"
          },
          {
            src: "/assets/logos/logo-256.webp",
            type: "image/webp",
            sizes: "256x256"
          },
          {
            src: "/assets/logos/logo-512.webp",
            type: "image/webp",
            sizes: "512x512"
          }
        ]
      }
    })
  ]
});
