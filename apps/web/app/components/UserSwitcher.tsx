"use client";

import { useAuth } from "@saas/auth";
import { ROLE_LABEL } from "@saas/permissions";
import { Button, Modal } from "@saas/ui";
import * as React from "react";


export function UserSwitcher(): React.ReactElement {
  const { state, signIn, signOut, listMockUsers } = useAuth();
  const [open, setOpen] = React.useState(false);
  const users = React.useMemo(() => listMockUsers(), [listMockUsers]);

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        {state.status === "authenticated" ? `User: ${state.user.displayName}` : "Sign in"}
      </Button>

      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Mock authentication"
        description="Select a seeded user to simulate auth + RBAC behavior."
        footer={
          <div className="flex w-full items-center justify-between">
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              Auth is local-only and persisted in localStorage.
            </div>
            <div className="flex gap-2">
              {state.status === "authenticated" ? (
                <Button
                  variant="ghost"
                  onClick={() => {
                    signOut();
                    setOpen(false);
                  }}
                >
                  Sign out
                </Button>
              ) : null}
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        }
      >
        <div className="space-y-2">
          {users.map((u) => (
            <button
              key={u.id}
              type="button"
              onClick={() => {
                signIn(u.id);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between rounded-lg border border-zinc-200 px-3 py-2 text-left hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
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
      </Modal>
    </>
  );
}

