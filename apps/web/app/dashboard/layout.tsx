"use client";


import type { Action } from "@saas/permissions";

import { useAuth } from "@saas/auth";
import { can, guard } from "@saas/permissions";
import { Button } from "@saas/ui";
import { LayoutShell } from "@saas/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { EnvironmentBadge } from "../components/EnvironmentBadge";
import { FeatureFlagsButton } from "../components/FeatureFlagsButton";
import { ImpersonateUserButton } from "../components/ImpersonateUserButton";
import { TenantSwitcher } from "../components/TenantSwitcher";
import { UserSwitcher } from "../components/UserSwitcher";
import { useTenant } from "../tenant-context";

import { ForbiddenPanel } from "./components/ForbiddenPanel";
import { SignInPanel } from "./components/SignInPanel";
import { requiredActionsForPath } from "./route-permissions";

type NavRule = { href: string; label: string; action: Action };

const NAV: readonly NavRule[] = [
  { href: "/dashboard/overview", label: "Overview", action: "overview.read" },
  { href: "/dashboard/users", label: "User Management", action: "users.read" },
  { href: "/dashboard/tenant-settings", label: "Tenant Settings", action: "tenant.read" },
  { href: "/dashboard/billing", label: "Billing", action: "billing.read" },
  { href: "/dashboard/audit", label: "Audit Log", action: "audit.read" }
];

export default function DashboardLayout(props: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/dashboard/overview";
  const { tenant } = useTenant();
  const { state } = useAuth();

  const nav = React.useMemo(() => {
    if (state.status !== "authenticated") return NAV.map(({ href, label }) => ({ href, label }));
    const subject = { role: state.user.role };
    return NAV.filter((n) => can(subject, n.action)).map(({ href, label }) => ({ href, label }));
  }, [state]);

  const content = React.useMemo(() => {
    if (state.status !== "authenticated") return <SignInPanel />;
    const required = requiredActionsForPath(pathname);
    const result = guard({ role: state.user.role }, required);
    if (!result.ok) return <ForbiddenPanel missing={result.missing} />;
    return props.children;
  }, [pathname, props.children, state]);

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
      nav={nav}
      headerRight={
        <div className="flex flex-wrap items-center gap-2">
          <EnvironmentBadge />
          <FeatureFlagsButton />
          <ImpersonateUserButton />
          <Link href="/architecture">
            <Button variant="outline" size="sm">
              Architecture
            </Button>
          </Link>
          <TenantSwitcher />
          <UserSwitcher />
        </div>
      }
    >
      {content}
    </LayoutShell>
  );
}

