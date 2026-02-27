import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@saas/api-client",
    "@saas/auth",
    "@saas/entitlements",
    "@saas/feature-flags",
    "@saas/hooks",
    "@saas/permissions",
    "@saas/tenants",
    "@saas/types",
    "@saas/ui"
  ]
};

export default nextConfig;

