"use client";



import type { TenantConfig } from "@saas/tenants";

import { useDemoTenantStore } from "@saas/hooks";
import { getTenantBySlug, listTenants } from "@saas/tenants";
import { useRouter } from "next/navigation";
import * as React from "react";

type TenantContextValue = {
  tenant: TenantConfig;
  setTenantSlug(slug: string): void;
  availableTenants: readonly TenantConfig[];
};

const TenantContext = React.createContext<TenantContextValue | null>(null);

export function TenantProvider(props: { initialTenant: TenantConfig; children: React.ReactNode }) {
  const router = useRouter();
  const { tenantSlug, setTenantSlug } = useDemoTenantStore();
  const availableTenants = React.useMemo(() => listTenants(), []);

  const [tenant, setTenant] = React.useState<TenantConfig>(() => {
    return getTenantBySlug(tenantSlug) ?? props.initialTenant;
  });

  React.useEffect(() => {
    const t = getTenantBySlug(tenantSlug);
    if (t) setTenant(t);
  }, [tenantSlug]);

  const value = React.useMemo<TenantContextValue>(() => {
    return {
      tenant,
      availableTenants,
      setTenantSlug: (slug) => {
        const next = getTenantBySlug(slug);
        if (next) setTenant(next);
        setTenantSlug(slug);
        router.refresh();
      }
    };
  }, [availableTenants, router, setTenantSlug, tenant]);

  return <TenantContext.Provider value={value}>{props.children}</TenantContext.Provider>;
}

export function useTenant(): TenantContextValue {
  const ctx = React.useContext(TenantContext);
  if (!ctx) throw new Error("useTenant must be used within TenantProvider.");
  return ctx;
}

