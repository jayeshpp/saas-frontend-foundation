"use client";



import type { TenantConfig } from "@saas/tenants";

import { AuthProvider } from "@saas/auth";
import { getTenantThemeTokens } from "@saas/tenants";
import { ThemeProvider } from "@saas/ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";

import { TenantProvider, useTenant } from "./tenant-context";

export function Providers(props: {
  tenant: TenantConfig;
  children: React.ReactNode;
}) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 10_000,
            retry: 1,
            refetchOnWindowFocus: false
          }
        }
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TenantProvider initialTenant={props.tenant}>
          <TenantThemeBoundary>{props.children}</TenantThemeBoundary>
        </TenantProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

function TenantThemeBoundary(props: { children: React.ReactNode }) {
  const { tenant } = useTenant();
  return <ThemeProvider tokens={getTenantThemeTokens(tenant)}>{props.children}</ThemeProvider>;
}

