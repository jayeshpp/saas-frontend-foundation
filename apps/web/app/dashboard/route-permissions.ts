import type { Action } from "@saas/permissions";

export type RoutePermissionRule = {
  pathPrefix: string;
  required: readonly Action[];
};

export const DASHBOARD_ROUTE_RULES: readonly RoutePermissionRule[] = [
  { pathPrefix: "/dashboard/overview", required: ["overview.read"] },
  { pathPrefix: "/dashboard/users", required: ["users.read"] },
  { pathPrefix: "/dashboard/tenant-settings", required: ["tenant.read"] },
  { pathPrefix: "/dashboard/billing", required: ["billing.read"] },
  { pathPrefix: "/dashboard/audit", required: ["audit.read"] }
];

export function requiredActionsForPath(pathname: string): readonly Action[] {
  const rule = DASHBOARD_ROUTE_RULES.find((r) => pathname.startsWith(r.pathPrefix));
  return rule?.required ?? ["overview.read"];
}

