// Dependencies.
import {ViteMinifyPlugin} from "vite-plugin-minify";
import {VitePWA} from "vite-plugin-pwa";
import {defineConfig} from "vite";

/** @type {import('vite').UserConfig} */
export default defineConfig({
  base: "/cacybernetic/",
  server: {
    port: 5100
  },
  build: {
    target: [
      "firefox78",
      "chrome87",
      "safari14",
      "es2020",
      "edge88"
    ]
  },
  plugins: [
    ViteMinifyPlugin ({}),
    VitePWA ({
      registerType: "autoUpdate",
      injectRegister: "auto",
      devOptions: {
        enabled: true
      },
      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: [
          "**/*.{js,css,html,ico,png,svg,json,txt}"
        ]
      },
      manifest: {
        description: "The official website of Console Art Cybernetic.",
        orientation: "portrait-primary",
        name: "Console Art Cybernetic",
        short_name: "Ca Cybernetic",
        id: "consoleartcybernetic",
        start_url: "./index.html",
        background_color: "white",
        display: "standalone",
        theme_color: "white",
        lang: "en",
        display_override: [
          "fullscreen",
          "minimal-ui"
        ],
        categories: [
          "graphics & design",
          "development",
          "graphics",
          "design"
        ],
        screenshots: [
          {
            src: "./assets/render/render_1.png",
            type: "image/png",
            sizes: "1366x768"
          },
          {
            src: "./assets/render/render_2.png",
            type: "image/png",
            sizes: "1366x768"
          },
          {
            src: "./assets/render/render_3.png",
            type: "image/png",
            sizes: "1366x768"
          },
          {
            src: "./assets/render/render_4.png",
            type: "image/png",
            sizes: "1366x768"
          }
        ],
        icons: [
          {
            src: "./assets/logos/icon-16.png",
            type: "image/png",
            sizes: "16x14"
          },
          {
            src: "./assets/logos/icon-20.png",
            type: "image/png",
            sizes: "20x18"
          },
          {
            src: "./assets/logos/icon-29.png",
            type: "image/png",
            sizes: "29x26"
          },
          {
            src: "./assets/logos/icon-32.png",
            type: "image/png",
            sizes: "32x29"
          },
          {
            src: "./assets/logos/icon-36.png",
            type: "image/png",
            sizes: "36x33"
          },
          {
            src: "./assets/logos/icon-40.png",
            type: "image/png",
            sizes: "40x36"
          },
          {
            src: "./assets/logos/icon-48.png",
            type: "image/png",
            sizes: "48x44"
          },
          {
            src: "./assets/logos/icon-50.png",
            type: "image/png",
            sizes: "50x46"
          },
          {
            src: "./assets/logos/icon-55.png",
            type: "image/png",
            sizes: "55x50"
          },
          {
            src: "./assets/logos/icon-57.png",
            type: "image/png",
            sizes: "57x52"
          },
          {
            src: "./assets/logos/icon-58.png",
            type: "image/png",
            sizes: "58x53"
          },
          {
            src: "./assets/logos/icon-60.png",
            type: "image/png",
            sizes: "60x55"
          },
          {
            src: "./assets/logos/icon-64.png",
            type: "image/png",
            sizes: "64x59"
          },
          {
            src: "./assets/logos/icon-72.png",
            type: "image/png",
            sizes: "72x66"
          },
          {
            src: "./assets/logos/icon-76.png",
            type: "image/png",
            sizes: "76x70"
          },
          {
            src: "./assets/logos/icon-80.png",
            type: "image/png",
            sizes: "80x73"
          },
          {
            src: "./assets/logos/icon-87.png",
            type: "image/png",
            sizes: "87x80"
          },
          {
            src: "./assets/logos/icon-88.png",
            type: "image/png",
            sizes: "88x81"
          },
          {
            src: "./assets/logos/icon-96.png",
            type: "image/png",
            sizes: "96x88"
          },
          {
            src: "./assets/logos/icon-100.png",
            type: "image/png",
            sizes: "100x92"
          },
          {
            src: "./assets/logos/icon-114.png",
            type: "image/png",
            sizes: "114x105"
          },
          {
            src: "./assets/logos/icon-120.png",
            type: "image/png",
            sizes: "120x110"
          },
          {
            src: "./assets/logos/icon-128.png",
            type: "image/png",
            sizes: "128x118"
          },
          {
            src: "./assets/logos/icon-144.png",
            type: "image/png",
            sizes: "144x144"
          },
          {
            src: "./assets/logos/icon-167.png",
            type: "image/png",
            sizes: "167x153"
          },
          {
            src: "./assets/logos/icon-172.png",
            type: "image/png",
            sizes: "172x158"
          },
          {
            src: "./assets/logos/icon-180.png",
            type: "image/png",
            sizes: "180x165"
          },
          {
            src: "./assets/logos/icon-192.png",
            type: "image/png",
            sizes: "192x177"
          },
          {
            src: "./assets/logos/icon-196.png",
            type: "image/png",
            sizes: "196x180"
          },
          {
            src: "./assets/logos/icon-256.png",
            type: "image/png",
            sizes: "256x236"
          },
          {
            src: "./assets/logos/icon-512.png",
            "purpose": "maskable",
            type: "image/png",
            sizes: "512x512"
          },
          {
            src: "./assets/logos/icon-1024.png",
            sizes: "1024x944",
            type: "image/png"
          }
        ]
      }
    })
  ]
});
