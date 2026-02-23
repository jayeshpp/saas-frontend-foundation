export const ACTIONS = [
  "overview.read",
  "users.read",
  "users.manage",
  "tenant.read",
  "tenant.update",
  "billing.read",
  "billing.manage",
  "audit.read"
] as const;

export type Action = (typeof ACTIONS)[number];

export const ACTION_LABEL: Record<Action, string> = {
  "overview.read": "View overview",
  "users.read": "View users",
  "users.manage": "Manage users",
  "tenant.read": "View tenant settings",
  "tenant.update": "Update tenant settings",
  "billing.read": "View billing",
  "billing.manage": "Manage billing",
  "audit.read": "View audit log"
};

