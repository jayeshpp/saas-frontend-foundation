import type { NextRequest } from "next/server";

import { TENANT_COOKIE, TENANT_HEADER, resolveTenant } from "@saas/tenants";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const tenantCookie = req.cookies.get(TENANT_COOKIE)?.value ?? null;
  const tenantHeader = req.headers.get(TENANT_HEADER);

  const input: Parameters<typeof resolveTenant>[0] = {
    host: req.headers.get("host"),
    url: req.url,
    cookieTenant: tenantCookie
  };
  if (tenantHeader) input.headers = { [TENANT_HEADER]: tenantHeader };

  const ctx = resolveTenant(input);

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set(TENANT_HEADER, ctx.tenant.slug);
  requestHeaders.set("x-tenant-mode", ctx.mode);

  return NextResponse.next({
    request: { headers: requestHeaders }
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};

