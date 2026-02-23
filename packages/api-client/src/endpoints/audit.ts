import type { ApiContext } from "../context";
import type { AuditEvent } from "../models";
import type { PaginatedRequest, PaginatedResponse } from "@saas/types";

import { mockDb } from "../mock-db";
import { paginate } from "../pagination";

export type AuditApi = {
  list(req: PaginatedRequest): Promise<PaginatedResponse<AuditEvent>>;
};

export function createAuditApi(ctx: ApiContext): AuditApi {
  return {
    async list(req) {
      await new Promise((r) => setTimeout(r, 200));
      const items = mockDb.audit
        .filter((e) => e.tenantId === ctx.tenantId)
        .slice()
        .reverse();
      return paginate(items, req);
    }
  };
}

