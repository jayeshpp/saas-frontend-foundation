"use client";

import { Button } from "@saas/ui";
import * as React from "react";


import { UserSwitcher } from "../../components/UserSwitcher";

export function SignInPanel(): React.ReactElement {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="text-base font-semibold">Sign in to continue</div>
      <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        This dashboard simulates authenticated, role-aware access. Pick a seeded user.
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <UserSwitcher />
        <Button variant="outline" onClick={() => window.location.assign("/dashboard/overview")}>
          Refresh
        </Button>
      </div>
    </div>
  );
}

