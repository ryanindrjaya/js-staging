const path = require("path");
const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")([]);
const withOptimizedImages = require("next-optimized-images");
const withFonts = require("next-fonts");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");

// next.js custom configuration goes here
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    NEXT_PUBLIC_URL: "https://strapi-js.keelola.web.id/api",
    // NEXT_PUBLIC_URL: "https://js-strapi.keelola.net/api",
    // NEXT_PUBLIC_URL: "http://localhost:1337/api",
    BACKEND_URL: "https://strapi-js.keelola.web.id/api",
    STAKEHOLDER_NAME: "APOTEK JAYA SEHAT",
    MAIN_COLOR: "#056A81",
    TAG_RED: "#F50",
    TAG_ORANGE: "#F4B042",
    TAG_GREEN: "#87D068",
  },
  webpack: (config, options) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@iso/assets": path.join(__dirname, "assets"),
      "@iso/components": path.join(__dirname, "components"),
      "@iso/config": path.join(__dirname, "config"),
      "@iso/containers": path.join(__dirname, "containers"),
      "@iso/redux": path.join(__dirname, "redux"),
      "@iso/lib": path.join(__dirname, "library"),
      "@iso/ui": path.join(__dirname, "UI"),
    };
    return config;
  },
  webpack5: false,
};

module.exports = withPlugins(
  [
    withTM,
    withOptimizedImages,
    withFonts,
    [
      withBundleAnalyzer,
      {
        analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
        analyzeBrowser: ["browser", "both"].includes(
          process.env.BUNDLE_ANALYZE
        ),
        bundleAnalyzerConfig: {
          server: {
            analyzerMode: "static",
            reportFilename: "../bundles/server.html",
          },
          browser: {
            analyzerMode: "static",
            reportFilename: "../bundles/client.html",
          },
        },
      },
    ],
  ],
  nextConfig
);
