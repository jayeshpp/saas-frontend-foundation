import type { Metadata } from "next";

import { DEFAULT_TENANT_SLUG, TENANT_HEADER, getTenantBySlug } from "@saas/tenants";
import { Analytics } from "@vercel/analytics/react";
import { headers } from "next/headers";

import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "SaaS Frontend Foundation",
  description: "Multi-tenant + RBAC + white-label reference implementation"
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const h = await headers();
  const slug = h.get(TENANT_HEADER) ?? DEFAULT_TENANT_SLUG;
  const tenant = getTenantBySlug(slug) ?? getTenantBySlug(DEFAULT_TENANT_SLUG);
  if (!tenant) {
    throw new Error("Default tenant missing.");
  }

  return (
    <html lang="en">
      <body>
        <Providers tenant={tenant}>{props.children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}

