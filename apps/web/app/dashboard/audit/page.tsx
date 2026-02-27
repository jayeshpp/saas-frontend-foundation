"use client";

import type { AuditEvent } from "@saas/api-client";
import type { DataTableColumn } from "@saas/ui";

import { useAuth } from "@saas/auth";
import { featureLock } from "@saas/entitlements";
import { useFeatureFlags } from "@saas/feature-flags";
import { usePagination } from "@saas/hooks";
import { listTenants } from "@saas/tenants";
import { DataTable } from "@saas/ui";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";

import { useApiClient } from "../../lib/use-api-client";
import { useTenant } from "../../tenant-context";

export default function AuditLogPage(): React.ReactElement {
  const api = useApiClient();
  const { tenant } = useTenant();
  const { flags } = useFeatureFlags();
  const { state } = useAuth();
  const { page, pageSize, setPage, setPageSize } = usePagination({ page: 1, pageSize: 10 });

  const isAdmin = state.status === "authenticated" && state.user.role === "admin";
  const lock = featureLock(tenant, flags, "crossTenantAudit");
  const canCrossTenant = isAdmin && !lock.locked;

  const availableTenants = React.useMemo(() => listTenants(), []);
  const [scope, setScope] = React.useState<"current" | "all" | string>("current");

  const auditScope = React.useMemo(() => {
    if (scope === "all") return { scope: "all" as const };
    if (scope === "current") return { scope: "current" as const };
    const found = availableTenants.find((t) => t.slug === scope);
    return found ? { scope: "tenant" as const, tenantId: found.id } : { scope: "current" as const };
  }, [availableTenants, scope]);

  const audit = useQuery({
    queryKey: ["audit", tenant.id, auditScope.scope, scope, page, pageSize],
    queryFn: () => api.audit.list({ page, pageSize }, auditScope)
  });

  const columns = React.useMemo<readonly DataTableColumn<AuditEvent>[]>(() => {
    const showTenant = auditScope.scope !== "current";
    const nameById = new Map(availableTenants.map((t) => [t.id, t.branding.name] as const));

    return [
      ...(showTenant
        ? ([
            {
              key: "tenant",
              header: "Tenant",
              cell: (e: AuditEvent) => nameById.get(e.tenantId) ?? String(e.tenantId)
            }
          ] as const)
        : []),
      { key: "time", header: "Time", cell: (e) => new Date(e.createdAt).toLocaleString() },
      { key: "actor", header: "Actor", cell: (e) => e.actorEmail },
      { key: "action", header: "Action", cell: (e) => <span className="font-mono text-xs">{e.action}</span> },
      { key: "ip", header: "IP", cell: (e) => <span className="font-mono text-xs">{e.ip}</span> }
    ];
  }, [auditScope.scope, availableTenants]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-base font-semibold">Audit Log</div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            Audit visibility is a role-controlled surface area (e.g. SOC2, incident response).
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-zinc-600 dark:text-zinc-400">
            Tenant filter{" "}
            <select
              className="ml-1 rounded-md border border-zinc-200 bg-white px-2 py-1 text-sm text-zinc-900 disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
              value={scope}
              onChange={(e) => {
                setScope(e.target.value);
                setPage(1);
              }}
              disabled={!canCrossTenant}
              title={!canCrossTenant ? (lock.locked ? lock.reason : "Admin-only") : undefined}
            >
              <option value="current">Current tenant</option>
              <option value="all">All tenants (demo)</option>
              {availableTenants.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.branding.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <DataTable
        columns={columns}
        rows={audit.data?.items ?? []}
        isLoading={audit.isLoading}
        page={audit.data?.page ?? page}
        pageSize={audit.data?.pageSize ?? pageSize}
        totalItems={audit.data?.totalItems ?? 0}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
}

