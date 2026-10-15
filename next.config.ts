import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85, 90, 95, 100],
  },
  async redirects() {
    return [
      { source: "/marketplace", destination: "/hire", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
