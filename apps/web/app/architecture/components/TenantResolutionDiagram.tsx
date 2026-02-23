"use client";

import * as React from "react";

type Node = {
  title: string;
  detail: string;
};

function Box(props: Node) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 text-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="font-semibold text-zinc-900 dark:text-zinc-50">{props.title}</div>
      <div className="mt-1 text-zinc-600 dark:text-zinc-400">{props.detail}</div>
    </div>
  );
}

function Arrow() {
  return <div className="flex items-center justify-center text-zinc-400">↓</div>;
}

export function TenantResolutionDiagram(): React.ReactElement {
  const nodes: readonly Node[] = [
    {
      title: "Request enters Edge / Middleware",
      detail: "Next.js middleware runs before rendering, close to the edge."
    },
    {
      title: "Resolve tenant",
      detail:
        "Priority: x-tenant header → tenant cookie → subdomain → ?tenant= fallback (demo)."
    },
    {
      title: "Inject tenant context",
      detail: "Middleware sets x-tenant (slug) + x-tenant-mode headers for server components."
    },
    {
      title: "App Router layout reads tenant",
      detail:
        "Root layout reads x-tenant, selects TenantConfig, and composes providers (tenant/auth/query)."
    },
    {
      title: "Theme boundary applies tokens",
      detail:
        "UI stays tenant-agnostic; ThemeProvider maps tokens to CSS variables (white-label)."
    }
  ];

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="text-base font-semibold">Tenant resolution flow</div>
      <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        A deterministic, centralized resolution pipeline prevents tenant logic from leaking into UI
        components.
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3">
        {nodes.map((n, idx) => (
          <React.Fragment key={n.title}>
            <Box title={n.title} detail={n.detail} />
            {idx < nodes.length - 1 ? <Arrow /> : null}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

