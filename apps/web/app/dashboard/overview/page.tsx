"use client";

import { UsageMeter } from "@saas/ui";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";



import { useApiClient } from "../../lib/use-api-client";
import { useTenant } from "../../tenant-context";

export default function OverviewPage(): React.ReactElement {
  const api = useApiClient();
  const { tenant } = useTenant();

  const billing = useQuery({
    queryKey: ["billing", tenant.id],
    queryFn: () => api.billing.getSummary()
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Tenant
          </div>
          <div className="mt-1 text-lg font-semibold">{tenant.branding.name}</div>
          <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Plan: {tenant.planTier}</div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Theme tokens
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {[
              { label: "Primary", v: tenant.theme.primary },
              { label: "Secondary", v: tenant.theme.secondary },
              { label: "Accent", v: tenant.theme.accent ?? tenant.theme.secondary }
            ].map((x) => (
              <div key={x.label} className="rounded-lg border border-zinc-200 p-2 dark:border-zinc-800">
                <div className="text-[11px] text-zinc-500 dark:text-zinc-400">{x.label}</div>
                <div className="mt-1 h-6 rounded-md" style={{ background: `hsl(${x.v})` }} />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            API client (typed)
          </div>
          <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Data is fetched via `@saas/api-client` and cached via TanStack Query.
          </div>
          <div className="mt-3 text-sm">
            Billing status:{" "}
            <span className="font-medium">
              {billing.isLoading ? "Loading…" : billing.data?.planName ?? "—"}
            </span>
          </div>
        </div>
      </div>

      <UsageMeter
        label="Seats"
        used={billing.data?.seatsUsed ?? 0}
        included={billing.data?.seatsIncluded ?? 0}
      />
    </div>
  );
}

