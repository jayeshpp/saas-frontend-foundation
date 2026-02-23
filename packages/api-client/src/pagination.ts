import type { PaginatedRequest, PaginatedResponse } from "@saas/types";

export function paginate<T>(items: readonly T[], req: PaginatedRequest): PaginatedResponse<T> {
  const pageSize = Math.max(1, Math.min(100, req.pageSize));
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const page = Math.max(1, Math.min(totalPages, req.page));
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    items: items.slice(start, end),
    page,
    pageSize,
    totalItems,
    totalPages
  };
}

