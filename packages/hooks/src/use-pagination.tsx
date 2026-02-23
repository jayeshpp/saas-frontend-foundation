import * as React from "react";

export type PaginationState = {
  page: number; // 1-based
  pageSize: number;
};

export function usePagination(initial: PaginationState = { page: 1, pageSize: 10 }) {
  const [state, setState] = React.useState<PaginationState>(initial);

  const setPage = React.useCallback((page: number) => {
    setState((s) => ({ ...s, page: Math.max(1, page) }));
  }, []);

  const setPageSize = React.useCallback((pageSize: number) => {
    setState((s) => ({ ...s, pageSize: Math.max(1, Math.min(100, pageSize)), page: 1 }));
  }, []);

  return { ...state, setPage, setPageSize };
}

