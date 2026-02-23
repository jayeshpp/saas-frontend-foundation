import * as React from "react";

import { cn } from "../lib/cn";

import { Button } from "./Button";

export type DataTableColumn<T> = {
  key: string;
  header: React.ReactNode;
  cell: (row: T) => React.ReactNode;
  className?: string;
};

export type DataTableProps<T> = {
  columns: readonly DataTableColumn<T>[];
  rows: readonly T[];
  isLoading?: boolean;
  emptyState?: React.ReactNode;

  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange(page: number): void;
  onPageSizeChange(pageSize: number): void;
};

export function DataTable<T>(props: DataTableProps<T>): React.ReactElement {
  const totalPages = Math.max(1, Math.ceil(props.totalItems / props.pageSize));

  return (
    <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase tracking-wide text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-400">
            <tr>
              {props.columns.map((c) => (
                <th key={c.key} className={cn("px-4 py-3 font-medium", c.className)}>
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {props.isLoading ? (
              <tr>
                <td colSpan={props.columns.length} className="px-4 py-10 text-center text-zinc-500">
                  Loading…
                </td>
              </tr>
            ) : props.rows.length === 0 ? (
              <tr>
                <td colSpan={props.columns.length} className="px-4 py-10 text-center text-zinc-500">
                  {props.emptyState ?? "No results."}
                </td>
              </tr>
            ) : (
              props.rows.map((row, idx) => (
                <tr key={idx} className="text-zinc-900 dark:text-zinc-50">
                  {props.columns.map((c) => (
                    <td key={c.key} className={cn("px-4 py-3", c.className)}>
                      {c.cell(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-zinc-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          Page <span className="font-medium text-zinc-900 dark:text-zinc-50">{props.page}</span> of{" "}
          <span className="font-medium text-zinc-900 dark:text-zinc-50">{totalPages}</span>
          <span className="ml-2">({props.totalItems} items)</span>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-zinc-600 dark:text-zinc-400">
            Page size{" "}
            <select
              className="ml-1 rounded-md border border-zinc-200 bg-white px-2 py-1 text-sm text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
              value={props.pageSize}
              onChange={(e) => props.onPageSizeChange(Number(e.target.value))}
            >
              {[10, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>

          <Button
            variant="outline"
            size="sm"
            onClick={() => props.onPageChange(1)}
            disabled={props.page <= 1}
          >
            First
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => props.onPageChange(props.page - 1)}
            disabled={props.page <= 1}
          >
            Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => props.onPageChange(props.page + 1)}
            disabled={props.page >= totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

