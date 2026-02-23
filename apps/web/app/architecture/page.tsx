"use client";

import { Button, LayoutShell } from "@saas/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { TenantSwitcher } from "../components/TenantSwitcher";
import { UserSwitcher } from "../components/UserSwitcher";
import { useTenant } from "../tenant-context";

import { FolderStructureSnapshot } from "./components/FolderStructureSnapshot";
import { PermissionMatrixTable } from "./components/PermissionMatrixTable";
import { TenantResolutionDiagram } from "./components/TenantResolutionDiagram";

export default function ArchitecturePage(): React.ReactElement {
  const pathname = usePathname() ?? "/architecture";
  const { tenant } = useTenant();

  return (
    <LayoutShell
      branding={{
        productName: tenant.branding.name,
        ...(tenant.branding.logo.kind === "text" ? { logoText: tenant.branding.logo.value } : {})
      }}
      currentPath={pathname}
      renderLink={({ href, className, children }) => (
        <Link href={href} className={className}>
          {children}
        </Link>
      )}
      nav={[
        { href: "/dashboard/overview", label: "Dashboard" },
        { href: "/architecture", label: "Architecture" }
      ]}
      headerRight={
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/dashboard/overview">
            <Button variant="outline" size="sm">
              Back to dashboard
            </Button>
          </Link>
          <TenantSwitcher />
          <UserSwitcher />
        </div>
      }
    >
      <div className="space-y-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-lg font-semibold">Architecture</div>
          <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            This page makes the system auditable: how tenants are resolved, how permissions are
            centralized, and why these boundaries matter when onboarding enterprise clients.
          </div>
        </div>

        <TenantResolutionDiagram />
        <PermissionMatrixTable />
        <FolderStructureSnapshot />

        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-base font-semibold">Why this matters for enterprise onboarding</div>
          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
            {[
              {
                title: "Predictable tenant isolation",
                body:
                  "Centralized resolution prevents accidental cross-tenant state, mis-themed UIs, and data leakage risks."
              },
              {
                title: "Auditable authorization",
                body:
                  "A single permission matrix makes security reviews faster and reduces “role check drift” across product surfaces."
              },
              {
                title: "White-label without forks",
                body:
                  "Theme tokens applied via CSS variables allow per-tenant branding changes without maintaining separate component trees."
              },
              {
                title: "Onboarding velocity",
                body:
                  "Clear package boundaries let new engineers ship safely: tenant logic, RBAC, UI, and API conventions are discoverable."
              }
            ].map((x) => (
              <div key={x.title} className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
                <div className="text-sm font-semibold">{x.title}</div>
                <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{x.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayoutShell>
  );
}

