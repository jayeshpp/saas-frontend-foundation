import type { TenantConfig } from "./tenant-types";

export type ThemeTokens = {
  // CSS variables used by the UI system. Values are raw HSL strings.
  primary: string;
  secondary: string;
  accent: string;
};

export function getTenantThemeTokens(tenant: TenantConfig): ThemeTokens {
  return {
    primary: tenant.theme.primary,
    secondary: tenant.theme.secondary,
    accent: tenant.theme.accent ?? tenant.theme.secondary
  };
}

