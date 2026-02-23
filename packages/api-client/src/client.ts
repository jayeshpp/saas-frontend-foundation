import type { ApiContext } from "./context";
import type { AuditApi } from "./endpoints/audit";
import type { BillingApi } from "./endpoints/billing";
import type { TenantsApi } from "./endpoints/tenants";
import type { UsersApi } from "./endpoints/users";

import { createAuditApi } from "./endpoints/audit";
import { createBillingApi } from "./endpoints/billing";
import { createTenantsApi } from "./endpoints/tenants";
import { createUsersApi } from "./endpoints/users";

export type ApiClient = {
  users: UsersApi;
  tenants: TenantsApi;
  billing: BillingApi;
  audit: AuditApi;
};

export function createApiClient(ctx: ApiContext): ApiClient {
  return {
    users: createUsersApi(ctx),
    tenants: createTenantsApi(ctx),
    billing: createBillingApi(ctx),
    audit: createAuditApi(ctx)
  };
}

