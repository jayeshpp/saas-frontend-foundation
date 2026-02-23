"use client";

import type { ApiClient } from "@saas/api-client";

import { createApiClient } from "@saas/api-client";
import * as React from "react";


import { useTenant } from "../tenant-context";

export function useApiClient() {
  const { tenant } = useTenant();
  return React.useMemo<ApiClient>(() => createApiClient({ tenantId: tenant.id }), [tenant.id]);
}

