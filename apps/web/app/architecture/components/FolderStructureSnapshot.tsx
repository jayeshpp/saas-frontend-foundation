"use client";

import * as React from "react";

const SNAPSHOT = `saas-frontend-foundation/
  apps/
    web/                    # Next.js (App Router) demo app
  packages/
    api-client/             # typed client + endpoint modules (mock data)
    auth/                   # mocked auth provider + AuthProvider/useAuth
    config/                 # shared tsconfig + eslint presets
    hooks/                  # shared hooks + minimal Zustand demo store
    permissions/            # roles, actions, matrix, can(), guards
    tenants/                # tenant resolution + config + theme tokens
    types/                  # shared branded ids + common API types
    ui/                     # tenant-agnostic components + theme adapter`;

export function FolderStructureSnapshot(): React.ReactElement {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="text-base font-semibold">Folder structure snapshot</div>
      <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        Packages isolate domain concerns; <span className="font-mono text-xs">apps/web</span>{" "}
        composes them.
      </div>

      <pre className="mt-4 overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-xs leading-relaxed text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-50">
        {SNAPSHOT}
      </pre>
    </div>
  );
}

