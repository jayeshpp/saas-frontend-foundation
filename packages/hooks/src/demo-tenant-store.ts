import { create } from "zustand";

export const DEMO_TENANT_COOKIE = "tenant" as const;

type DemoTenantState = {
  tenantSlug: string;
  setTenantSlug(slug: string): void;
};

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1] ?? "") : null;
}

function writeCookie(name: string, value: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; samesite=lax`;
}

export const useDemoTenantStore = create<DemoTenantState>((set) => ({
  tenantSlug: readCookie(DEMO_TENANT_COOKIE) ?? "acme",
  setTenantSlug: (slug) => {
    writeCookie(DEMO_TENANT_COOKIE, slug);
    set({ tenantSlug: slug });
  }
}));

