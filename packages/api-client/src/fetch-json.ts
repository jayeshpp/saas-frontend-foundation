import type { ApiErrorPayload } from "@saas/types";

import { ApiClientError } from "./errors";

export type FetchJsonOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: unknown;
  signal?: AbortSignal;
};

export async function fetchJson<T>(url: string, options: FetchJsonOptions = {}): Promise<T> {
  const init: RequestInit = {
    method: options.method ?? "GET",
    headers: {
      "content-type": "application/json",
      ...(options.headers ?? {})
    }
  };
  if (options.body !== undefined) init.body = JSON.stringify(options.body);
  if (options.signal) init.signal = options.signal;

  const res = await fetch(url, init);

  if (res.ok) return (await res.json()) as T;

  let payload: ApiErrorPayload | null = null;
  try {
    payload = (await res.json()) as ApiErrorPayload;
  } catch {
    payload = null;
  }

  throw new ApiClientError(
    payload ?? {
      code: res.status === 401 ? "UNAUTHORIZED" : res.status === 403 ? "FORBIDDEN" : "INTERNAL_ERROR",
      message: `Request failed (${res.status}).`
    }
  );
}

