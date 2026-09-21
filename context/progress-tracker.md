# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Foundation

## Current Goal

- Move on to the next feature spec (not yet written).

## Completed

- 01 Design System (`context/feature-specs/01-design-system.md`): shadcn/ui installed and configured (`components.json`, style `base-nova`); Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea added to `components/ui/` unmodified; `lucide-react` installed; `lib/utils.ts` exports `cn()`; dark theme tokens wired in `app/globals.css`. Verified: `tsc` and `eslint` clean, `next build` passes, `cn()` merges conflicting Tailwind classes, compiled CSS resolves to dark tokens.
- 02 Editor Chrome (`context/feature-specs/02-editor-chrome.md`):
  - `components/editor/editor-navbar.tsx` — 56px navbar (`h-14`), left/center/right grid, sidebar toggle swapping `PanelLeftOpen` / `PanelLeftClose`, center and right empty, `bg-surface` with `border-surface-border` bottom border. Controlled via `isSidebarOpen` / `onToggleSidebar`.
  - `components/editor/project-sidebar.tsx` — absolutely positioned floating panel (does not push content), slides in from the left via `translate-x`, `isOpen` prop, `Projects` header + close button, shadcn `Tabs` (My Projects / Shared) with empty placeholder states, full-width `New Project` button with `Plus` icon. Closed state is `inert` + `aria-hidden`.
  - `components/editor/editor-dialog.tsx` — dialog pattern wrapping shadcn Dialog with title, optional description, children, and footer actions; token-based styling, `rounded-3xl`. No actual dialogs built; no callers yet.
  - `components/editor/editor-shell.tsx` (not in the spec) — thin client component owning the sidebar open state; renders navbar + sidebar over a placeholder canvas area. Mounted from `app/page.tsx` so the chrome is reachable.
  - Verified: `tsc` and `eslint` clean, `next build` passes, compiled CSS contains the slide/opacity/radius classes, SSR sidebar is `inert`. Not yet checked visually in a browser.

- 03 Auth (`context/feature-specs/03-auth.md`):
  - `@clerk/ui` installed (`@clerk/nextjs` was already present).
  - `lib/clerk-appearance.ts` — Clerk `dark` theme from `@clerk/ui/themes` with `variables` mapped to the app's CSS variables (`var(--bg-surface)`, `var(--accent-primary)`, ...); no hardcoded colors.
  - `app/layout.tsx` — `ClerkProvider` wraps the body content with that appearance.
  - `proxy.ts` (project root, not `middleware.ts`) — `clerkMiddleware`; public routes are the sign-in/sign-up URLs from `NEXT_PUBLIC_CLERK_SIGN_IN_URL` / `NEXT_PUBLIC_CLERK_SIGN_UP_URL` (falling back to `/sign-in`, `/sign-up`); everything else calls `auth.protect()`.
  - `app/(auth)/sign-in/[[...sign-in]]` and `app/(auth)/sign-up/[[...sign-up]]` pages render Clerk `SignIn` / `SignUp` inside `components/auth/auth-shell.tsx`: two-panel at `lg` (compact logo, tagline, text-only feature list on the left, centered form on the right), form only below `lg`. No gradients, cards, or hero.
  - `app/page.tsx` — server redirect: authenticated → `/editor`, unauthenticated → `/sign-in`.
  - Editor page moved from `app/(editor)/page.tsx` to `app/(editor)/editor/page.tsx` (it previously collided with `app/page.tsx` at `/`).
  - `components/editor/editor-navbar.tsx` — Clerk `UserButton` in the right section, default menu untouched.
  - Auth UI revision (from a reference screenshot; this supersedes the spec's "text-only feature list"): `auth-shell.tsx` is an exact 50/50 split at `lg`. The left panel is tinted with the `accent-dim` token over `surface` (solid, no gradient) and holds the logo, headline, intro paragraph, three features with a small lucide icon, title and description, and a copyright line. Below `lg` only the form shows.
  - `ClerkProvider` now receives `ui={ui}` from `@clerk/ui`, so the installed UI package renders instead of the CDN copy. The CDN copy ignored the installed package's `Appearance` options. In this version the social-button variant is `options.socialButtonsVariant`, not `layout`. Social buttons are stacked full-width with a border token, and the label is "Continue with {provider}" via `clerkLocalization` in `lib/clerk-appearance.ts`.
  - Fonts: verified in a browser that every element on `/sign-in`, including Clerk's inputs and buttons, computes to Geist Sans and the Geist font file loads. The `--font-sans` / `html` wiring was already correct.
  - Verified: `tsc` and `eslint` clean, `next build` passes (routes: `/`, `/editor`, `/sign-in`, `/sign-up`, Proxy). Against `next start` unauthenticated: `/` and `/editor` return 307 to `/sign-in`; `/sign-in` and `/sign-up` return 200. Not yet checked while signed in or visually in a browser.

## In Progress

- None.

## Next Up

- 04 (next feature spec, not yet written).

## Open Questions

- `ui-context.md` says the dark palette is defined in `globals.css`, but it was not there (not in the original commit either). It was added from the `ui-context.md` table during 01. Confirm this is the intended source of truth.

- `.env.local` had only the Clerk publishable and secret keys, so the sign-in/sign-up env vars the 03 spec refers to did not exist. Without them `auth.protect()` redirected to Clerk's hosted accounts domain instead of `/sign-in`. Added Clerk's standard `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in` and `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up` to `.env.local` (gitignored). Any other environment (Vercel, teammates) needs the same two vars.

## Architecture Decisions

- shadcn's current CLI generates `lib/utils.ts` as `export { cn } from "cn"` (the `cn` package from shadcn-ui, a clsx + tailwind-merge replacement), and generated components import `cn` from `"cn"` directly. Left as generated.
- Theme is dark only. `:root` defines the `ui-context.md` palette; shadcn semantic variables (`--background`, `--card`, `--primary`, ...) map onto it. `<html>` carries the `dark` class so `dark:` variants in generated components apply.
- Palette utilities exposed via `@theme inline`: `bg-base`, `bg-surface`, `bg-elevated`, `bg-subtle`, `border-surface-border`, `border-surface-border-subtle`, `text-copy-{primary,secondary,muted,faint}`, `text-brand`, `bg-accent-dim`, `text-ai`, `text-ai-text`, `text-state-{error,success,warning}`.

## Session Notes

- shadcn primary maps to the cyan brand accent (`--accent-primary`), with `--bg-base` as primary foreground.
- shadcn `chart-*` and `sidebar-*` tokens were removed from `globals.css` as unused. Re-add them if a sidebar or chart component is generated.
