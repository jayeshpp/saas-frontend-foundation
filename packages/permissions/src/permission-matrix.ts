import type { Action } from "./actions";
import type { Role } from "./roles";

export type PermissionMatrix = Record<Role, ReadonlySet<Action>>;

export const PERMISSIONS: PermissionMatrix = {
  admin: new Set<Action>([
    "overview.read",
    "users.read",
    "users.manage",
    "tenant.read",
    "tenant.update",
    "billing.read",
    "billing.manage",
    "audit.read"
  ]),
  manager: new Set<Action>([
    "overview.read",
    "users.read",
    "users.manage",
    "tenant.read",
    "billing.read",
    "audit.read"
  ]),
  viewer: new Set<Action>(["overview.read", "users.read", "tenant.read", "billing.read", "audit.read"])
};

