"use client";

import { cn } from "@saas/ui";
import * as React from "react";

import { getAppEnv } from "../lib/env";

export function EnvironmentBadge(): React.ReactElement {
  const env = getAppEnv();

  const label = env === "prod" ? "Prod" : env === "staging" ? "Staging" : "Local";
  const className =
    env === "prod"
      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
      : env === "staging"
        ? "bg-amber-500/15 text-amber-700 dark:text-amber-400"
        : "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400";

  return (
    <span className={cn("inline-flex rounded-full px-2 py-0.5 text-xs font-semibold", className)}>
      {label}
    </span>
  );
}

