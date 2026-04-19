import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable React Strict Mode to prevent double-firing of useEffect in
  // development, which causes scroll-driven entrance animations to re-run
  // and produce a visual "load twice" glitch.
  reactStrictMode: false,
};

export default nextConfig;
