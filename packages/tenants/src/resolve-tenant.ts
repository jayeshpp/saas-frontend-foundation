import type { TenantContext, TenantResolutionMode } from "./tenant-types";

import { DEFAULT_TENANT_SLUG, getTenantBySlug } from "./tenant-config";

export const TENANT_HEADER = "x-tenant" as const;
export const TENANT_COOKIE = "tenant" as const;

type ResolveTenantInput = {
  host?: string | null;
  url?: string | null;
  headers?: Record<string, string | undefined>;
  cookieTenant?: string | null;
};

function safeLower(s: string): string {
  return s.trim().toLowerCase();
}

function parseHostname(host: string): string {
  const withoutPort = host.split(":")[0] ?? host;
  return safeLower(withoutPort);
}

function parseSubdomain(hostname: string): string | null {
  // Convention: <tenant>.example.com
  // Local dev: <tenant>.localhost
  const parts = hostname.split(".").filter(Boolean);
  if (parts.length < 2) return null;
  const sub = parts[0];
  if (!sub) return null;
  if (sub === "www" || sub === "app") return null;
  return sub;
}

function parseQueryTenant(url: string): string | null {
  try {
    const u = new URL(url);
    const t = u.searchParams.get("tenant");
    return t ? safeLower(t) : null;
  } catch {
    return null;
  }
}

function resolveSlug(input: ResolveTenantInput): { slug: string; mode: TenantResolutionMode } {
  const headerTenant = input.headers?.[TENANT_HEADER];
  if (headerTenant) return { slug: safeLower(headerTenant), mode: "header" };

  if (input.cookieTenant) return { slug: safeLower(input.cookieTenant), mode: "cookie" };

  if (input.host) {
    const hostname = parseHostname(input.host);
    const sub = parseSubdomain(hostname);
    if (sub) return { slug: sub, mode: "subdomain" };
  }

  if (input.url) {
    const q = parseQueryTenant(input.url);
    if (q) return { slug: q, mode: "demo-fallback" };
  }

  return { slug: DEFAULT_TENANT_SLUG, mode: "demo-fallback" };
}

export function resolveTenant(input: ResolveTenantInput): TenantContext {
  const { slug, mode } = resolveSlug(input);
  const tenant = getTenantBySlug(slug) ?? getTenantBySlug(DEFAULT_TENANT_SLUG);
  if (!tenant) {
    // This should be impossible given DEFAULT_TENANT_SLUG is present.
    throw new Error("Tenant config missing for default tenant.");
  }

  return { tenantId: tenant.id, tenant, mode };
}

