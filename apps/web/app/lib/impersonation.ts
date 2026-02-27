import type { UserId } from "@saas/types";

export const IMPERSONATION_KEY = "saas.foundation.impersonation.v1";

export function loadOriginalUserId(): UserId | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(IMPERSONATION_KEY);
  return raw ? (raw as UserId) : null;
}

export function setOriginalUserId(id: UserId | null): void {
  if (typeof window === "undefined") return;
  if (!id) window.localStorage.removeItem(IMPERSONATION_KEY);
  else window.localStorage.setItem(IMPERSONATION_KEY, id);
}

export function clearOriginalUserId(): void {
  setOriginalUserId(null);
}

