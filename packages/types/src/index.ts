export type Brand<K, T extends string> = K & { readonly __brand: T };

export type TenantId = Brand<string, "TenantId">;
export type UserId = Brand<string, "UserId">;

export type PlanTier = "free" | "pro" | "enterprise";

export type ISODateString = Brand<string, "ISODateString">;

export type PaginatedRequest = {
  page: number; // 1-based
  pageSize: number;
};

export type PaginatedResponse<T> = {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type ApiErrorCode =
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "RATE_LIMITED"
  | "INTERNAL_ERROR";

export type ApiErrorPayload = {
  code: ApiErrorCode;
  message: string;
  requestId?: string;
};

