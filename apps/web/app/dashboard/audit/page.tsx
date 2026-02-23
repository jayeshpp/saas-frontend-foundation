"use client";



import type { AuditEvent } from "@saas/api-client";
import type { DataTableColumn } from "@saas/ui";

import { usePagination } from "@saas/hooks";
import { DataTable } from "@saas/ui";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";

import { useApiClient } from "../../lib/use-api-client";
import { useTenant } from "../../tenant-context";

export default function AuditLogPage(): React.ReactElement {
  const api = useApiClient();
  const { tenant } = useTenant();
  const { page, pageSize, setPage, setPageSize } = usePagination({ page: 1, pageSize: 10 });

  const audit = useQuery({
    queryKey: ["audit", tenant.id, page, pageSize],
    queryFn: () => api.audit.list({ page, pageSize })
  });

  const columns = React.useMemo<readonly DataTableColumn<AuditEvent>[]>(() => {
    return [
      { key: "time", header: "Time", cell: (e) => new Date(e.createdAt).toLocaleString() },
      { key: "actor", header: "Actor", cell: (e) => e.actorEmail },
      { key: "action", header: "Action", cell: (e) => <span className="font-mono text-xs">{e.action}</span> },
      { key: "ip", header: "IP", cell: (e) => <span className="font-mono text-xs">{e.ip}</span> }
    ];
  }, []);

  return (
    <div className="space-y-3">
      <div>
        <div className="text-base font-semibold">Audit Log</div>
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          Audit visibility is a role-controlled surface area (e.g. SOC2, incident response).
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

