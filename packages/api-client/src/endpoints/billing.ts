import type { ApiContext } from "../context";
import type { BillingSummary } from "../models";

import { mockDb } from "../mock-db";

export type BillingApi = {
  getSummary(): Promise<BillingSummary>;
};

export function createBillingApi(ctx: ApiContext): BillingApi {
  return {
    async getSummary() {
      await new Promise((r) => setTimeout(r, 200));
      const summary = mockDb.billing.find((b) => b.tenantId === ctx.tenantId);
      if (!summary) {
        return {
          tenantId: ctx.tenantId,
          planName: "Unknown",
          seatsUsed: 0,
          seatsIncluded: 0,
          renewalDate: mockDb.now()
        };
      }
      return summary;
    }
  };
}

