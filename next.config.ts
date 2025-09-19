import type { NextConfig } from "next";
import path from "path/win32";

const nextConfig: NextConfig = {
	/* config options here */
	turbopack: {
    root: __dirname,
  },
	allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
};

export default nextConfig;
