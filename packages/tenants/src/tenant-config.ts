import type { TenantConfig } from "./tenant-types";
import type { TenantId } from "@saas/types";

const t = (id: string) => id as TenantId;

/**
 * In a real system this typically comes from:
 * - edge-cached config service
 * - signed tenant config token
 * - or a DB-backed API
 *
 * For this reference, we keep it static and strongly typed.
 */
export const TENANTS: Record<string, TenantConfig> = {
  acme: {
    id: t("tenant_acme"),
    slug: "acme",
    branding: {
      name: "Acme Logistics",
      logo: { kind: "text", value: "Acme" }
    },
    theme: {
      primary: "222 84% 56%",
      secondary: "270 80% 60%",
      accent: "160 84% 39%"
    },
    planTier: "enterprise"
  },
  globex: {
    id: t("tenant_globex"),
    slug: "globex",
    branding: {
      name: "Globex Manufacturing",
      logo: { kind: "text", value: "Globex" }
    },
    theme: {
      primary: "12 88% 55%",
      secondary: "210 90% 45%",
      accent: "46 92% 55%"
    },
    planTier: "pro"
  },
  initech: {
    id: t("tenant_initech"),
    slug: "initech",
    branding: {
      name: "Initech",
      logo: { kind: "text", value: "Initech" }
    },
    theme: {
      primary: "145 70% 35%",
      secondary: "200 90% 45%",
      accent: "330 85% 62%"
    },
    planTier: "free"
  }
};

export const DEFAULT_TENANT_SLUG = "acme" as const;

export function getTenantBySlug(slug: string): TenantConfig | undefined {
  return TENANTS[slug];
}

export function listTenants(): TenantConfig[] {
  return Object.values(TENANTS);
}

