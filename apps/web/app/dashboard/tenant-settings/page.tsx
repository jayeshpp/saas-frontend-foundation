"use client";


import { useAuth } from "@saas/auth";
import { can } from "@saas/permissions";
import { Button, Modal } from "@saas/ui";
import * as React from "react";

import { useTenant } from "../../tenant-context";

export default function TenantSettingsPage(): React.ReactElement {
  const { tenant } = useTenant();
  const { state } = useAuth();
  const subject = state.status === "authenticated" ? { role: state.user.role } : null;
  const canUpdate = subject ? can(subject, "tenant.update") : false;

  const [open, setOpen] = React.useState(false);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="text-base font-semibold">Tenant Settings</div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            Tenant configuration is resolved centrally and injected into the shell.
          </div>
        </div>
        <Button variant={canUpdate ? "primary" : "outline"} disabled={!canUpdate} onClick={() => setOpen(true)}>
          Update settings
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-sm font-medium">Branding</div>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-zinc-500 dark:text-zinc-400">Name</dt>
              <dd className="font-medium">{tenant.branding.name}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-zinc-500 dark:text-zinc-400">Slug</dt>
              <dd className="font-mono text-xs">{tenant.slug}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-zinc-500 dark:text-zinc-400">Plan tier</dt>
              <dd className="font-medium">{tenant.planTier}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-sm font-medium">Theme tokens (white-label)</div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { label: "Primary", v: tenant.theme.primary },
              { label: "Secondary", v: tenant.theme.secondary },
              { label: "Accent", v: tenant.theme.accent ?? tenant.theme.secondary }
            ].map((x) => (
              <div key={x.label} className="rounded-lg border border-zinc-200 p-2 dark:border-zinc-800">
                <div className="text-[11px] text-zinc-500 dark:text-zinc-400">{x.label}</div>
                <div className="mt-1 h-6 rounded-md" style={{ background: `hsl(${x.v})` }} />
                <div className="mt-1 font-mono text-[10px] text-zinc-500 dark:text-zinc-400">{x.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Update tenant settings"
        description={canUpdate ? "Allowed for tenant.update." : "You do not have tenant.update."}
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button disabled={!canUpdate} onClick={() => setOpen(false)}>
              Save changes
            </Button>
          </>
        }
      >
        <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
          <div>
            This reference keeps tenant config static (edge-cached configuration is an enterprise concern
            discussed in `Architecture.md`).
          </div>
          <div>It still demonstrates: centralized config → injected theme tokens → UI stays tenant-agnostic.</div>
        </div>
      </Modal>
    </div>
  );
}

