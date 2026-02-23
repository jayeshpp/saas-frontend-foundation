"use client";

import { ACTIONS, ACTION_LABEL, PERMISSIONS, ROLE_LABEL, ROLES } from "@saas/permissions";
import * as React from "react";

export function PermissionMatrixTable(): React.ReactElement {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="text-base font-semibold">Permission matrix (centralized RBAC)</div>
      <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        Authorization is defined once in <span className="font-mono text-xs">@saas/permissions</span>{" "}
        and consumed via <span className="font-mono text-xs">can()</span>,{" "}
        <span className="font-mono text-xs">guard()</span>, and{" "}
        <span className="font-mono text-xs">&lt;RequirePermission /&gt;</span>.
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-[720px] w-full text-left text-sm">
          <thead className="border-b border-zinc-200 text-xs uppercase tracking-wide text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
            <tr>
              <th className="px-3 py-2 font-medium">Action</th>
              {ROLES.map((r) => (
                <th key={r} className="px-3 py-2 font-medium">
                  {ROLE_LABEL[r]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {ACTIONS.map((a) => (
              <tr key={a} className="text-zinc-900 dark:text-zinc-50">
                <td className="px-3 py-2">
                  <div className="font-mono text-xs">{a}</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    {ACTION_LABEL[a] ?? a}
                  </div>
                </td>
                {ROLES.map((r) => {
                  const allowed = PERMISSIONS[r].has(a);
                  return (
                    <td key={r} className="px-3 py-2">
                      <span
                        className={
                          allowed
                            ? "inline-flex rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400"
                            : "inline-flex rounded-full bg-zinc-500/10 px-2 py-0.5 text-xs font-semibold text-zinc-500"
                        }
                      >
                        {allowed ? "Allowed" : "—"}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
        Enterprise note: your API must enforce these permissions server-side; the frontend is not a
        trust boundary.
      </div>
    </div>
  );
}

