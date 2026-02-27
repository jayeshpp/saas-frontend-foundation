"use client";

import type { UserId } from "@saas/types";

import { useAuth } from "@saas/auth";
import { featureLock } from "@saas/entitlements";
import { useFeatureFlags } from "@saas/feature-flags";
import { ROLE_LABEL } from "@saas/permissions";
import { Button, Modal } from "@saas/ui";
import * as React from "react";

import { loadOriginalUserId, setOriginalUserId } from "../lib/impersonation";
import { useTenant } from "../tenant-context";

export function ImpersonateUserButton(): React.ReactElement | null {
  const { tenant } = useTenant();
  const { flags } = useFeatureFlags();
  const { state, listMockUsers, signIn } = useAuth();

  const locked = featureLock(tenant, flags, "impersonation");

  const isAdmin = state.status === "authenticated" && state.user.role === "admin";

  const [open, setOpen] = React.useState(false);
  const [originalUserId, setOriginal] = React.useState<UserId | null>(() => loadOriginalUserId());

  React.useEffect(() => {
    setOriginal(loadOriginalUserId());
  }, []);

  const users = React.useMemo(() => {
    return listMockUsers().filter((u) => u.tenantId === tenant.id);
  }, [listMockUsers, tenant.id]);

  const isImpersonating = Boolean(originalUserId);

  // If you're impersonating, keep the control visible so you can always revert.
  if (!isAdmin && !isImpersonating) return null;

  return (
    <>
      <Button
        variant={isImpersonating ? "secondary" : "outline"}
        size="sm"
        disabled={!isImpersonating && locked.locked}
        title={
          isImpersonating
            ? "Impersonation active — open to revert"
            : locked.locked
              ? locked.reason
              : "Admin-only demo: switch identity quickly"
        }
        onClick={() => setOpen(true)}
      >
        {isImpersonating ? "Impersonating" : "Impersonate"}
      </Button>

      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Impersonate user (demo)"
        description="Admin-only tool to validate RBAC behavior across roles without separate sessions."
        footer={
          <>
            {isImpersonating && originalUserId ? (
              <Button
                variant="outline"
                onClick={() => {
                  signIn(originalUserId);
                  setOriginalUserId(null);
                  setOriginal(null);
                  setOpen(false);
                }}
              >
                Revert
              </Button>
            ) : null}
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Close
            </Button>
          </>
        }
      >
        <div className="space-y-2">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            Tenant scoped: {tenant.branding.name}
          </div>

          <div className="space-y-2">
            {!isAdmin ? (
              <div className="rounded-lg border border-dashed border-zinc-200 p-3 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
                You’re not currently an admin. Revert impersonation to regain access to impersonation tools.
              </div>
            ) : null}
            {users.map((u) => (
              <button
                key={u.id}
                type="button"
                disabled={!isAdmin || locked.locked}
                onClick={() => {
                  if (state.status === "authenticated" && !originalUserId) {
                    setOriginalUserId(state.user.id);
                    setOriginal(state.user.id);
                  }
                  signIn(u.id);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-lg border border-zinc-200 px-3 py-2 text-left hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-70 dark:border-zinc-800 dark:hover:bg-zinc-900"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{u.displayName}</div>
                  <div className="truncate text-xs text-zinc-500 dark:text-zinc-400">{u.email}</div>
                </div>
                <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  {ROLE_LABEL[u.role]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}

