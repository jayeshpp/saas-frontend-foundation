"use client";
import { featureLock } from "@saas/entitlements";
import { useFeatureFlags } from "@saas/feature-flags";
import { Button, Modal } from "@saas/ui";
import * as React from "react";

import { useTenant } from "../tenant-context";

type Row = {
  key: "crossTenantAudit" | "impersonation" | "planLocks";
  title: string;
  description: string;
  gatedByPlanFeature?: "crossTenantAudit" | "impersonation" | "billingManagement";
};

const ROWS: readonly Row[] = [
  {
    key: "crossTenantAudit",
    title: "Cross-tenant audit visibility",
    description: "Enables admin-only audit filtering across tenants (ops / internal tooling demo).",
    gatedByPlanFeature: "crossTenantAudit"
  },
  {
    key: "impersonation",
    title: "Impersonation tools",
    description: "Enables admin-only impersonation to validate RBAC behavior quickly.",
    gatedByPlanFeature: "impersonation"
  },
  {
    key: "planLocks",
    title: "Plan-based feature locks",
    description: "Simulates plan entitlements by disabling certain controls on lower tiers."
  }
];

export function FeatureFlagsButton(): React.ReactElement {
  const { tenant } = useTenant();
  const { flags, setFlag, reset } = useFeatureFlags();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        Flags
      </Button>

      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Feature flags (demo)"
        description="Toggle runtime flags to simulate staged rollouts and kill-switches."
        footer={
          <>
            <Button
              variant="ghost"
              onClick={() => {
                reset();
              }}
            >
              Reset
            </Button>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Close
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          {ROWS.map((row) => {
            const locked =
              row.gatedByPlanFeature ? featureLock(tenant, flags, row.gatedByPlanFeature) : null;

            const disabled = locked?.locked ?? false;
            const checked = flags[row.key];

            return (
              <div
                key={row.key}
                className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                      {row.title}
                    </div>
                    <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                      {row.description}
                    </div>
                    {locked?.locked ? (
                      <div className="mt-2 text-xs text-amber-700 dark:text-amber-400">
                        {locked.reason}
                      </div>
                    ) : null}
                  </div>

                  <label className="inline-flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-[hsl(var(--brand-primary))]"
                      checked={checked}
                      disabled={disabled}
                      onChange={(e) => setFlag(row.key, e.target.checked)}
                    />
                    <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      {checked ? "On" : "Off"}
                    </span>
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
}

