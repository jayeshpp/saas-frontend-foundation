import * as React from "react";

import { cn } from "../lib/cn";

export type UsageMeterProps = {
  label: string;
  used: number;
  included: number;
  className?: string;
};

export function UsageMeter(props: UsageMeterProps): React.ReactElement {
  const pct = props.included <= 0 ? 0 : Math.min(100, Math.round((props.used / props.included) * 100));
  const danger = pct >= 90;

  return (
    <div className={cn("rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950", props.className)}>
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-medium">{props.label}</div>
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          {props.used}/{props.included}
        </div>
      </div>
      <div className="mt-3 h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-900">
        <div
          className={cn(
            "h-2 rounded-full",
            danger ? "bg-red-500" : "bg-[hsl(var(--brand-accent))]"
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">{pct}% used</div>
    </div>
  );
}

