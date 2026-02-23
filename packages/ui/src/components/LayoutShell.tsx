import * as React from "react";

import { cn } from "../lib/cn";

export type NavItem = {
  href: string;
  label: string;
};

export type LinkRenderer = (props: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) => React.ReactNode;

export type Branding = {
  productName: string;
  logoText?: string;
};

export type LayoutShellProps = {
  branding: Branding;
  nav: readonly NavItem[];
  currentPath?: string;
  renderLink?: LinkRenderer;
  headerRight?: React.ReactNode;
  children: React.ReactNode;
};

export function LayoutShell(props: LayoutShellProps): React.ReactElement {
  const Link = props.renderLink ?? ((p) => <a href={p.href} className={p.className}>{p.children}</a>);
  const pathname = props.currentPath ?? "";

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-4 md:grid-cols-[220px_1fr]">
        <aside className="rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-center gap-2 px-2 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--brand-primary))] text-sm font-semibold text-white">
              {props.branding.logoText?.slice(0, 1) ?? props.branding.productName.slice(0, 1)}
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">{props.branding.logoText ?? props.branding.productName}</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">Dashboard</div>
            </div>
          </div>

          <nav className="mt-2 space-y-1">
            {props.nav.map((item) => {
              const active = pathname === item.href || (pathname?.startsWith(item.href + "/") ?? false);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50"
                      : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="space-y-4">
          <header className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950">
            <div>
              <div className="text-sm font-semibold">{props.branding.productName}</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                Multi-tenant + RBAC + white-label reference
              </div>
            </div>
            <div className="flex items-center gap-2">{props.headerRight}</div>
          </header>

          <div>{props.children}</div>
        </main>
      </div>
    </div>
  );
}

