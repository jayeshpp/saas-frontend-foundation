import type { Action } from "./actions";
import type { AuthorizationSubject } from "./can";

import * as React from "react";

import { can, canAll, canAny } from "./can";

export type RequirePermissionProps = {
  subject: AuthorizationSubject;
  action?: Action;
  allOf?: readonly Action[];
  anyOf?: readonly Action[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export function RequirePermission(props: RequirePermissionProps): React.ReactNode {
  const { subject, action, allOf, anyOf, children, fallback = null } = props;

  const ok =
    (action ? can(subject, action) : true) &&
    (allOf ? canAll(subject, allOf) : true) &&
    (anyOf ? canAny(subject, anyOf) : true);

  return ok ? <>{children}</> : <>{fallback}</>;
}

