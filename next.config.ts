import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	turbopack: {
    root: __dirname,
  },
	allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
};

export default nextConfig;
