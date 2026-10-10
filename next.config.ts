import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // The brochure PDF is read from disk at runtime by the download route
  outputFileTracingIncludes: {
    "/api/brochure/download": ["./private/**/*"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/home.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/1index1.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/Oldindex.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/Fulldump.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/Fulldump1.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/products.html",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/about.html",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/contact.html",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/sendmail.php",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
