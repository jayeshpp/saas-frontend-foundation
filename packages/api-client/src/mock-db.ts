import type { AuditEvent, ApiUser, BillingSummary } from "./models";
import type { ISODateString, TenantId, UserId } from "@saas/types";

const t = (id: string) => id as TenantId;
const u = (id: string) => id as UserId;
const iso = (s: string) => s as ISODateString;

const now = () => new Date().toISOString() as ISODateString;

const USERS: ApiUser[] = [
  {
    id: u("u_1"),
    tenantId: t("tenant_acme"),
    email: "ava@acme.example",
    displayName: "Ava Stone",
    status: "active",
    createdAt: iso("2025-10-12T10:00:00.000Z")
  },
  {
    id: u("u_2"),
    tenantId: t("tenant_acme"),
    email: "mason@acme.example",
    displayName: "Mason Reed",
    status: "active",
    createdAt: iso("2025-11-01T10:00:00.000Z")
  },
  {
    id: u("u_3"),
    tenantId: t("tenant_globex"),
    email: "glen@globex.example",
    displayName: "Glen Park",
    status: "invited",
    createdAt: iso("2025-12-05T10:00:00.000Z")
  }
];

const BILLING: BillingSummary[] = [
  {
    tenantId: t("tenant_acme"),
    planName: "Enterprise",
    seatsUsed: 57,
    seatsIncluded: 75,
    renewalDate: iso("2026-06-01T00:00:00.000Z")
  },
  {
    tenantId: t("tenant_globex"),
    planName: "Pro",
    seatsUsed: 9,
    seatsIncluded: 15,
    renewalDate: iso("2026-03-15T00:00:00.000Z")
  },
  {
    tenantId: t("tenant_initech"),
    planName: "Free",
    seatsUsed: 2,
    seatsIncluded: 3,
    renewalDate: iso("2026-12-31T00:00:00.000Z")
  }
];

const AUDIT: AuditEvent[] = [
  {
    id: "evt_1",
    tenantId: t("tenant_acme"),
    actorEmail: "ava@acme.example",
    action: "users.invite",
    createdAt: iso("2026-02-20T17:12:00.000Z"),
    ip: "203.0.113.10"
  },
  {
    id: "evt_2",
    tenantId: t("tenant_acme"),
    actorEmail: "mason@acme.example",
    action: "billing.view",
    createdAt: iso("2026-02-21T08:03:00.000Z"),
    ip: "203.0.113.11"
  },
  {
    id: "evt_3",
    tenantId: t("tenant_globex"),
    actorEmail: "glen@globex.example",
    action: "tenant.update_theme",
    createdAt: iso("2026-02-22T09:44:00.000Z"),
    ip: "203.0.113.12"
  }
];

export const mockDb = {
  now,
  users: USERS,
  billing: BILLING,
  audit: AUDIT
};

