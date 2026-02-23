import type { ISODateString, TenantId, UserId } from "@saas/types";

export type ApiUser = {
  id: UserId;
  tenantId: TenantId;
  email: string;
  displayName: string;
  status: "active" | "invited" | "suspended";
  createdAt: ISODateString;
};

export type BillingSummary = {
  tenantId: TenantId;
  planName: string;
  seatsUsed: number;
  seatsIncluded: number;
  renewalDate: ISODateString;
};

export type AuditEvent = {
  id: string;
  tenantId: TenantId;
  actorEmail: string;
  action: string;
  createdAt: ISODateString;
  ip: string;
};

