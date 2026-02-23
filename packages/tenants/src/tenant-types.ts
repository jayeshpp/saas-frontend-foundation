import type { PlanTier, TenantId } from "@saas/types";

export type TenantBranding = {
  name: string;
  logo: {
    kind: "text" | "url";
    value: string;
  };
};

export type TenantThemeConfig = {
  primary: string; // HSL string: "222 84% 56%"
  secondary: string; // HSL string
  accent?: string; // optional HSL string
};

export type TenantConfig = {
  id: TenantId;
  slug: string; // used for subdomain + demo switching
  branding: TenantBranding;
  theme: TenantThemeConfig;
  planTier: PlanTier;
};

export type TenantResolutionMode = "subdomain" | "header" | "cookie" | "demo-fallback";

export type TenantContext = {
  tenantId: TenantId;
  tenant: TenantConfig;
  mode: TenantResolutionMode;
};

