import type { Role } from "@saas/permissions";
import type { TenantId, UserId } from "@saas/types";

export type AuthUser = {
  id: UserId;
  tenantId: TenantId;
  role: Role;
  email: string;
  displayName: string;
};

export type AuthState =
  | { status: "anonymous"; user: null }
  | { status: "authenticated"; user: AuthUser };

