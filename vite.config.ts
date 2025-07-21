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
            src: "./assets/render/render_1.png",
            form_factor: "wide",
            sizes: "1920x1080",
            type: "image/png"
          },
          {
            src: "./assets/render/render_2.png",
            form_factor: "wide",
            sizes: "1920x1080",
            type: "image/png"
          },
          {
            src: "./assets/render/render_3.png",
            form_factor: "wide",
            sizes: "1920x1080",
            type: "image/png"
          },
          {
            src: "./assets/render/render_4.png",
            sizes: "1920x1080",
            type: "image/png"
          }
        ],
        icons: [
          {
            src: "./assets/logos/logo-16.png",
            type: "image/png",
            sizes: "16x16"
          },
          {
            src: "./assets/logos/logo-32.png",
            type: "image/png",
            sizes: "32x32"
          },
          {
            src: "./assets/logos/logo-48.png",
            type: "image/png",
            sizes: "48x48"
          },
          {
            src: "./assets/logos/logo-64.png",
            type: "image/png",
            sizes: "64x64"
          },
          {
            src: "./assets/logos/logo-72.png",
            type: "image/png",
            sizes: "72x72"
          },
          {
            src: "./assets/logos/logo-96.png",
            type: "image/png",
            sizes: "96x96"
          },
          {
            src: "./assets/logos/logo-128.png",
            type: "image/png",
            sizes: "128x128"
          },
          {
            src: "./assets/logos/logo-144.png",
            type: "image/png",
            sizes: "144x144"
          },
          {
            src: "./assets/logos/logo-192.png",
            type: "image/png",
            sizes: "192x192"
          },
          {
            src: "./assets/logos/logo-256.png",
            type: "image/png",
            sizes: "256x256"
          },
          {
            src: "./assets/logos/logo-512.png",
            type: "image/png",
            sizes: "512x512"
          }
        ]
      }
    })
  ]
});
