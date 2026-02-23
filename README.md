# SaaS Frontend Foundation (Multi-tenant + RBAC + White-label)

This repo is a production-oriented **frontend reference architecture** for early-stage B2B SaaS teams preparing to scale into enterprise requirements:

- **Multi-tenancy**: tenant resolution + tenant-scoped data
- **RBAC**: centralized permission matrix + route/UI guards
- **White-label theming**: per-tenant theme tokens via CSS variables
- **Modularity**: clean separation between domain packages and the Next.js app

It is intentionally **frontend-focused** (no backend-heavy complexity) while still looking and behaving like a real system.

## Repo layout

```
saas-frontend-foundation/
  apps/
    web/                    # Next.js (App Router) demo app
  packages/
    api-client/             # typed client + endpoint modules (mock data)
    auth/                   # mocked auth provider + AuthProvider/useAuth
    config/                 # shared tsconfig + eslint presets
    hooks/                  # shared hooks + minimal Zustand demo store
    permissions/            # roles, actions, matrix, can(), guards
    tenants/                # tenant resolution + config + tenant theme tokens
    types/                  # shared branded ids + common API types
    ui/                     # tenant-agnostic components + theme adapter
```

## Local dev

From `saas-frontend-foundation/`:

```bash
npm install
npm run dev
```

Then open the demo app and use the header controls:

- **Tenant switcher**: sets a cookie (`tenant`) and refreshes (middleware re-resolves tenant)
- **User switcher**: selects a seeded mock user (persisted in localStorage)

## Multi-tenant flow (high level)

- **Input sources** (in priority order):
  - `x-tenant` header (simulated; enterprise setups often use gateways)
  - `tenant` cookie (demo switcher)
  - subdomain (convention: `<tenant>.example.com`)
  - `?tenant=` query (demo fallback)
- `apps/web/middleware.ts` calls `resolveTenant()` from `@saas/tenants` and injects the resolved tenant slug into `x-tenant` for downstream server components.
- `apps/web/app/layout.tsx` reads the tenant slug from headers and selects the tenant config from `@saas/tenants`.
- `@saas/ui` receives **theme tokens** (no tenant knowledge) and applies CSS variables on a boundary via `ThemeProvider`.

## RBAC architecture

All authorization is centralized in `@saas/permissions`:

- **Roles**: `admin`, `manager`, `viewer`
- **Actions** (examples): `users.manage`, `billing.read`, `tenant.update`
- **Permission matrix**: role → allowed actions
- **Utilities**:
  - `can(subject, action)`
  - `guard(subject, requiredActions)`
  - `<RequirePermission />` for UI-level gating

In the demo app: [Demo](https://saas-frontend-foundation-web.vercel.app?utm_source=github&utm_medium=readme&utm_campaign=saas-frontend-foundation&utm_content=demo-link)

- **Route-level guard** is implemented in `apps/web/app/dashboard/layout.tsx` using `requiredActionsForPath()` from `apps/web/app/dashboard/route-permissions.ts`.
- **UI-level gating** is used for individual buttons (e.g. “Invite user” requires `users.manage`).

## White-label theming

- Tenants define theme tokens (HSL) in `@saas/tenants`.
- UI consumes generic tokens and maps them to CSS variables:
  - `--brand-primary`
  - `--brand-secondary`
  - `--brand-accent`
- Components use those variables (e.g. `bg-[hsl(var(--brand-primary))]`) so **white-labeling does not require changing component code**.

## Key reference docs

- `Architecture.md`: why this structure was chosen, tradeoffs, and how to scale to enterprise needs.


