import type { FeatureFlagState } from "@saas/feature-flags";
import type { TenantConfig } from "@saas/tenants";
export type EntitledFeature = "crossTenantAudit" | "impersonation" | "billingManagement";

type Lock = { locked: true; reason: string } | { locked: false };

export function featureLock(tenant: TenantConfig, flags: FeatureFlagState, feature: EntitledFeature): Lock {
  // Feature flags come first: simulate kill-switches and staged rollouts.
  if (feature === "crossTenantAudit" && !flags.crossTenantAudit) {
    return { locked: true, reason: "Disabled via feature flag." };
  }
  if (feature === "impersonation" && !flags.impersonation) {
    return { locked: true, reason: "Disabled via feature flag." };
  }
  if (feature === "billingManagement" && !flags.planLocks) {
    // When planLocks are disabled, we allow billing management to demonstrate the RBAC surface only.
    return { locked: false };
  }

  // Plan-based entitlements: common enterprise signal.
  switch (feature) {
    case "crossTenantAudit":
      if (tenant.planTier !== "enterprise") {
        return { locked: true, reason: "Enterprise plan required for cross-tenant audit visibility." };
      }
      return { locked: false };
    case "impersonation":
      if (tenant.planTier === "free") {
        return { locked: true, reason: "Pro or Enterprise plan required for impersonation tools." };
      }
      return { locked: false };
    case "billingManagement":
      if (tenant.planTier !== "enterprise") {
        return { locked: true, reason: "Enterprise plan required to manage subscriptions." };
      }
      return { locked: false };
  }
}

