import type { ApiContext } from "../context";
import type { ApiUser } from "../models";
import type { PaginatedRequest, PaginatedResponse } from "@saas/types";

import { mockDb } from "../mock-db";
import { paginate } from "../pagination";

export type UsersApi = {
  list(req: PaginatedRequest): Promise<PaginatedResponse<ApiUser>>;
};

export function createUsersApi(ctx: ApiContext): UsersApi {
  return {
    async list(req) {
      const items = mockDb.users.filter((u) => u.tenantId === ctx.tenantId);
      // Simulate network latency for realistic loading states.
      await new Promise((r) => setTimeout(r, 250));
      return paginate(items, req);
    }
  };
}

