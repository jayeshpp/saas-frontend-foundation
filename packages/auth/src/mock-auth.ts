import type { AuthUser } from "./auth-types";
import type { Role } from "@saas/permissions";
import type { TenantId, UserId } from "@saas/types";

const u = (id: string) => id as UserId;
const t = (id: string) => id as TenantId;

type SeedUser = Omit<AuthUser, "id" | "tenantId" | "role"> & {
  id: string;
  tenantId: string;
  role: Role;
};

const USERS: SeedUser[] = [
  {
    id: "user_1",
    tenantId: "tenant_acme",
    role: "admin",
    email: "admin@acme.example",
    displayName: "Ava (Acme Admin)"
  },
  {
    id: "user_2",
    tenantId: "tenant_acme",
    role: "manager",
    email: "manager@acme.example",
    displayName: "Mason (Acme Manager)"
  },
  {
    id: "user_3",
    tenantId: "tenant_acme",
    role: "viewer",
    email: "viewer@acme.example",
    displayName: "Vera (Acme Viewer)"
  },
  {
    id: "user_4",
    tenantId: "tenant_globex",
    role: "admin",
    email: "admin@globex.example",
    displayName: "Glen (Globex Admin)"
  },
  {
    id: "user_8",
    tenantId: "tenant_globex",
    role: "manager",
    email: "manager@globex.example",
    displayName: "Gia (Globex Manager)"
  },
  {
    id: "user_9",
    tenantId: "tenant_globex",
    role: "viewer",
    email: "viewer@globex.example",
    displayName: "Vince (Globex Viewer)"
  },
  {
    id: "user_10",
    tenantId: "tenant_globex",
    role: "admin",
    email: "ops@globex.example",
    displayName: "Owen (Globex Ops Admin)"
  },
  {
    id: "user_5",
    tenantId: "tenant_initech",
    role: "admin",
    email: "admin@initech.example",
    displayName: "Ivy (Initech Admin)"
  },
  {
    id: "user_6",
    tenantId: "tenant_initech",
    role: "manager",
    email: "manager@initech.example",
    displayName: "Miles (Initech Manager)"
  },
  {
    id: "user_7",
    tenantId: "tenant_initech",
    role: "viewer",
    email: "viewer@initech.example",
    displayName: "Vik (Initech Viewer)"
  }
];

export type MockAuthProvider = {
  listUsers(): AuthUser[];
  signIn(userId: UserId): AuthUser;
};

export const mockAuthProvider: MockAuthProvider = {
  listUsers() {
    return USERS.map((x) => ({
      id: u(x.id),
      tenantId: t(x.tenantId),
      role: x.role,
      email: x.email,
      displayName: x.displayName
    }));
  },
  signIn(userId) {
    const found = USERS.find((x) => x.id === userId);
    if (!found) throw new Error("Unknown user id.");
    return {
      id: u(found.id),
      tenantId: t(found.tenantId),
      role: found.role,
      email: found.email,
      displayName: found.displayName
    };
  }
};

