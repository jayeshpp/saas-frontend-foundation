import type { ApiErrorCode, ApiErrorPayload } from "@saas/types";

export class ApiClientError extends Error {
  public readonly code: ApiErrorCode;
  public readonly requestId: string | undefined;

  constructor(payload: ApiErrorPayload) {
    super(payload.message);
    this.name = "ApiClientError";
    this.code = payload.code;
    this.requestId = payload.requestId;
  }
}

export function toApiErrorPayload(err: unknown): ApiErrorPayload {
  if (err instanceof ApiClientError) {
    return {
      code: err.code,
      message: err.message,
      ...(err.requestId ? { requestId: err.requestId } : {})
    };
  }
  if (err instanceof Error) {
    return { code: "INTERNAL_ERROR", message: err.message };
  }
  return { code: "INTERNAL_ERROR", message: "Unknown error." };
}

