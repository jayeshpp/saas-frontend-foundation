"use client";


import type { Action } from "@saas/permissions";

import { ACTION_LABEL } from "@saas/permissions";
import { Button } from "@saas/ui";
import * as React from "react";

import { UserSwitcher } from "../../components/UserSwitcher";

export function ForbiddenPanel(props: { missing: readonly Action[] }): React.ReactElement {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="text-base font-semibold">Access restricted</div>
      <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        Your current role doesn’t have permission to view this page.
      </div>

      <div className="mt-4">
        <div className="text-sm font-medium">Missing permissions</div>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
          {props.missing.map((a) => (
            <li key={a}>{ACTION_LABEL[a] ?? a}</li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <UserSwitcher />
        <Button variant="outline" onClick={() => window.location.assign("/dashboard/overview")}>
          Go to overview
        </Button>
      </div>
    </div>
  );
}

