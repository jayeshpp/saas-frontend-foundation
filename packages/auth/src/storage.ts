import type { AuthState } from "./auth-types";

const KEY = "saas.foundation.auth.v1";

export function loadAuthState(): AuthState {
  if (typeof window === "undefined") return { status: "anonymous", user: null };
  const raw = window.localStorage.getItem(KEY);
  if (!raw) return { status: "anonymous", user: null };
  try {
    const parsed = JSON.parse(raw) as AuthState;
    if (parsed.status === "authenticated" && parsed.user) return parsed;
    return { status: "anonymous", user: null };
  } catch {
    return { status: "anonymous", user: null };
  }
}

export function saveAuthState(state: AuthState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(state));
}

