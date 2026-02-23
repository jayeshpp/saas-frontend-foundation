import type { Action } from "./actions";
import type { Role } from "./roles";

import { PERMISSIONS } from "./permission-matrix";

export type AuthorizationSubject = {
  role: Role;
};

export function can(subject: AuthorizationSubject, action: Action): boolean {
  return PERMISSIONS[subject.role].has(action);
}

export function canAll(subject: AuthorizationSubject, actions: readonly Action[]): boolean {
  return actions.every((a) => can(subject, a));
}

export function canAny(subject: AuthorizationSubject, actions: readonly Action[]): boolean {
  return actions.some((a) => can(subject, a));
}

