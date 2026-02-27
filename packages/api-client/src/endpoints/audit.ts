import type { ApiContext } from "../context";
import type { AuditEvent } from "../models";
import type { PaginatedRequest, PaginatedResponse } from "@saas/types";
import type { TenantId } from "@saas/types";

import { mockDb } from "../mock-db";
import { paginate } from "../pagination";

export type AuditListScope =
  | { scope: "current" }
  | { scope: "tenant"; tenantId: TenantId }
  | { scope: "all" };

export type AuditApi = {
  list(req: PaginatedRequest, scope?: AuditListScope): Promise<PaginatedResponse<AuditEvent>>;
};

export function createAuditApi(ctx: ApiContext): AuditApi {
  return {
    async list(req, scope = { scope: "current" }) {
      await new Promise((r) => setTimeout(r, 200));
      const tenantId =
        scope.scope === "tenant" ? scope.tenantId : scope.scope === "current" ? ctx.tenantId : null;

      const items = mockDb.audit
        .filter((e) => (tenantId ? e.tenantId === tenantId : true))
        .slice()
        .reverse();
      return paginate(items, req);
    }
  };
}

