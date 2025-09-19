import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: '/home/jichen/code/jomety/home'
  },
	allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
};

export default nextConfig;
