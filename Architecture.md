# Architecture (Reference Implementation)

This document explains **why** the monorepo is structured the way it is, the boundaries it enforces, and what changes as you scale from Seed → Series A → enterprise clients.

## Guiding principles

- **Tenant logic is a domain concern**: it lives in `@saas/tenants` and is consumed via providers/adapters.
- **Authorization is centralized**: no “if (role === …)” scattered in pages/components.
- **UI is tenant-agnostic**: white-label theming is applied via injected design tokens, not per-tenant component forks.
- **Apps compose packages**: `apps/web` is an integration layer (routing + providers + page composition).
- **Strict TypeScript by default**: errors surface early and boundaries stay explicit.

## Why a Turborepo-style monorepo?

Enterprise-bound SaaS frontends tend to accumulate shared infrastructure:

- consistent auth/session integration
- permission systems
- tenant resolution + theming
- API client conventions
- UI primitives that must remain stable while product areas evolve

Putting these concerns in `packages/*` makes their contracts explicit and forces reuse through stable boundaries.

## Package boundaries (what depends on what)

**Core rule**: `apps/web` can depend on all packages, but packages should not depend on the app.

Recommended dependency direction:

- `@saas/types` is leaf-most (shared primitives)
- `@saas/tenants` depends on `@saas/types`
- `@saas/permissions` depends on `@saas/types` (and `react` as a peer for the wrapper component)
- `@saas/auth` depends on `@saas/permissions` + `@saas/types`
- `@saas/api-client` depends on `@saas/types`
- `@saas/ui` depends on UI libs only (Radix, cva, etc.)
- `apps/web` composes everything and owns framework specifics (Next.js routing, middleware, data fetching orchestration)

This prevents common failure modes:

- UI components importing tenant config directly
- RBAC checks duplicated across app surfaces
- pages calling `fetch()` directly (bypassing client conventions)

## Multi-tenant resolution design

`@saas/tenants` intentionally exposes a **framework-agnostic** resolver:

- Input: `{ host, headers, cookieTenant, url }`
- Output: `{ tenantId, tenant, mode }`

`apps/web/middleware.ts` is the **Next adapter**:

- calls `resolveTenant()`
- injects `x-tenant` for downstream reads (server components)

### Enterprise scaling considerations

Static tenant config is fine for this reference; in enterprise you typically add:

- **Config service** with edge caching and strict SLAs
- **Signed tenant config tokens** (tamper-proof) if config is delivered to the client
- **Tenant isolation in observability** (logs/metrics tagged by tenant)
- **Per-tenant feature flags** (often layered with plan tier + entitlements)

## White-label theming system

This architecture uses a deliberate contract:

- Tenants produce **tokens** (HSL strings) in `@saas/tenants`
- UI consumes tokens via `@saas/ui` `ThemeProvider`
- UI components use only CSS variables (`--brand-*`) and never import tenant config

Why CSS variables?

- tokens can be swapped at runtime without rebuilding
- avoids “per-tenant Tailwind builds”
- works for embedded surfaces and nested shells

What changes at enterprise scale:

- design token governance (versioned token schema)
- accessibility validation (contrast enforcement per tenant)
- tenant-specific assets (logos) hosted via CDN + signed URLs

## RBAC architecture (centralized)

`@saas/permissions` defines:

- `roles.ts`: roles and optional hierarchy (for UI)
- `actions.ts`: a typed action vocabulary
- `permission-matrix.ts`: single source of truth (role → allowed actions)
- `can()` / `guard()` and `<RequirePermission />`

### Why an action vocabulary?

Actions avoid brittle “role checks” and make it possible to evolve:

- introduce new roles
- introduce per-tenant custom roles
- move to attribute-based checks for specific resources

### Route-level vs UI-level authorization

This reference implements:

- **Route-level** guard in `apps/web/app/dashboard/layout.tsx` using a central route→required-actions mapping.
- **UI-level** gating for individual controls (`users.manage`, `billing.manage`, `tenant.update`).

Enterprise note: you typically also enforce authorization server-side (API) because the frontend is not a trust boundary.

## API client layer

All app data access routes through `@saas/api-client`.

The reference includes:

- `fetchJson<T>()` + `ApiClientError` (production conventions)
- endpoint modules: `users`, `tenants`, `billing`, `audit`
- a mocked in-memory “DB” to keep the focus on frontend architecture

Scaling to enterprise typically adds:

- request tracing / `requestId`
- automatic auth header injection
- retry policies and circuit breakers for critical endpoints
- multi-region edge caching for tenant-stable data

## Tradeoffs (intentional)

- **Mock auth + mock API**: focuses on system boundaries and composition rather than backend implementation.
- **Cookie-based tenant switching**: simple demo mechanism; real systems often use subdomains + gateways.
- **Action-based RBAC only**: sufficient for many B2B SaaS; enterprises may require resource-scoped constraints.

