import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname, ".."),
  },
  images: {
    qualities: [75, 85, 90, 95, 100],
  },
};

export default nextConfig;
