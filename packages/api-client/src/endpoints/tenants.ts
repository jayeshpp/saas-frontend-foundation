import type { ApiContext } from "../context";
import type { TenantId } from "@saas/types";

export type TenantApiModel = {
  id: TenantId;
  status: "active";
};

export type TenantsApi = {
  getCurrent(): Promise<TenantApiModel>;
};

export function createTenantsApi(ctx: ApiContext): TenantsApi {
  return {
    async getCurrent() {
      await new Promise((r) => setTimeout(r, 120));
      return { id: ctx.tenantId, status: "active" };
    }
  };
}

