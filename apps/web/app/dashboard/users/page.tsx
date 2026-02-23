"use client";



import type { ApiUser } from "@saas/api-client";
import type { DataTableColumn } from "@saas/ui";

import { useAuth } from "@saas/auth";
import { usePagination } from "@saas/hooks";
import { can } from "@saas/permissions";
import { Button, DataTable, Modal } from "@saas/ui";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";

import { useApiClient } from "../../lib/use-api-client";
import { useTenant } from "../../tenant-context";

export default function UsersPage(): React.ReactElement {
  const api = useApiClient();
  const { tenant } = useTenant();
  const { state } = useAuth();

  const { page, pageSize, setPage, setPageSize } = usePagination({ page: 1, pageSize: 10 });

  const users = useQuery({
    queryKey: ["users", tenant.id, page, pageSize],
    queryFn: () => api.users.list({ page, pageSize })
  });

  const subject = state.status === "authenticated" ? { role: state.user.role } : null;
  const canManage = subject ? can(subject, "users.manage") : false;

  const columns = React.useMemo<readonly DataTableColumn<ApiUser>[]>(() => {
    return [
      {
        key: "email",
        header: "Email",
        cell: (u) => <span className="font-medium">{u.email}</span>
      },
      { key: "name", header: "Name", cell: (u) => u.displayName },
      {
        key: "status",
        header: "Status",
        cell: (u) => (
          <span className="rounded-full border border-zinc-200 px-2 py-0.5 text-xs dark:border-zinc-800">
            {u.status}
          </span>
        )
      },
      { key: "created", header: "Created", cell: (u) => new Date(u.createdAt).toLocaleDateString() }
    ];
  }, []);

  const [inviteOpen, setInviteOpen] = React.useState(false);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="text-base font-semibold">User Management</div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            Tenant-scoped list; actions are RBAC-gated via centralized permissions.
          </div>
        </div>

        {canManage ? (
          <Button onClick={() => setInviteOpen(true)}>Invite user</Button>
        ) : (
          <Button variant="outline" disabled title="Requires users.manage">
            Invite user
          </Button>
        )}
      </div>

      <DataTable
        columns={columns}
        rows={users.data?.items ?? []}
        isLoading={users.isLoading}
        page={users.data?.page ?? page}
        pageSize={users.data?.pageSize ?? pageSize}
        totalItems={users.data?.totalItems ?? 0}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />

      <Modal
        open={inviteOpen}
        onOpenChange={setInviteOpen}
        title="Invite user"
        description="This is a UI-only demo; the invite action is gated by users.manage."
        footer={
          <>
            <Button variant="ghost" onClick={() => setInviteOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setInviteOpen(false)}>Send invite</Button>
          </>
        }
      >
        <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
          <div>Tenant: {tenant.branding.name}</div>
          <div>In production, this would call `api.users.invite()` with tenant-scoped auth.</div>
        </div>
      </Modal>
    </div>
  );
}

