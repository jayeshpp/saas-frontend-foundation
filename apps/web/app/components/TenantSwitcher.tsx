"use client";

import { Button, Modal } from "@saas/ui";
import * as React from "react";


import { useTenant } from "../tenant-context";

export function TenantSwitcher(): React.ReactElement {
  const { tenant, availableTenants, setTenantSlug } = useTenant();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        Tenant: {tenant.branding.name}
      </Button>

      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Switch tenant (demo mode)"
        description="Updates the tenant cookie and refreshes to re-resolve tenant context."
        footer={
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Close
          </Button>
        }
      >
        <div className="space-y-2">
          {availableTenants.map((t) => (
            <button
              key={t.slug}
              type="button"
              onClick={() => {
                setTenantSlug(t.slug);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between rounded-lg border border-zinc-200 px-3 py-2 text-left hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
            >
              <div>
                <div className="text-sm font-medium">{t.branding.name}</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                  slug: {t.slug} · plan: {t.planTier}
                </div>
              </div>
              {t.slug === tenant.slug ? (
                <span className="rounded-full bg-[hsl(var(--brand-primary))] px-2 py-0.5 text-xs font-semibold text-white">
                  Active
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </Modal>
    </>
  );
}

