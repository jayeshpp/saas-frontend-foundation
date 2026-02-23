import type { Action } from "./actions";
import type { AuthorizationSubject } from "./can";

import { can, canAll } from "./can";

export type GuardResult =
  | { ok: true }
  | { ok: false; reason: "forbidden"; missing: readonly Action[] };

export function guard(subject: AuthorizationSubject, required: readonly Action[]): GuardResult {
  if (canAll(subject, required)) return { ok: true };
  const missing = required.filter((a) => !can(subject, a));
  return { ok: false, reason: "forbidden", missing };
}

