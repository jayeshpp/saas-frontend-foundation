"use client";



import { useAuth } from "@saas/auth";
import { can } from "@saas/permissions";
import { Button, UsageMeter } from "@saas/ui";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";

import { useApiClient } from "../../lib/use-api-client";
import { useTenant } from "../../tenant-context";

export default function BillingPage(): React.ReactElement {
  const api = useApiClient();
  const { tenant } = useTenant();
  const { state } = useAuth();
  const subject = state.status === "authenticated" ? { role: state.user.role } : null;
  const canManage = subject ? can(subject, "billing.manage") : false;

  const summary = useQuery({
    queryKey: ["billing", tenant.id],
    queryFn: () => api.billing.getSummary()
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="text-base font-semibold">Billing</div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            Billing data is tenant-scoped; sensitive actions are RBAC-gated.
          </div>
        </div>
        <Button variant={canManage ? "primary" : "outline"} disabled={!canManage} title="Requires billing.manage">
          Manage subscription
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-sm font-medium">Plan</div>
          <div className="mt-2 text-2xl font-semibold">
            {summary.isLoading ? "Loading…" : summary.data?.planName ?? "—"}
          </div>
          <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Renewal:{" "}
            <span className="font-medium">
              {summary.data ? new Date(summary.data.renewalDate).toLocaleDateString() : "—"}
            </span>
          </div>
        </div>

        <UsageMeter
          label="Seats"
          used={summary.data?.seatsUsed ?? 0}
          included={summary.data?.seatsIncluded ?? 0}
        />
      </div>
    </div>
  );
}

