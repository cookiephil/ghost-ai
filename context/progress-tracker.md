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

## In Progress

- None.

## Next Up

- 03 (next feature spec, not yet written).

## Open Questions

- `ui-context.md` says the dark palette is defined in `globals.css`, but it was not there (not in the original commit either). It was added from the `ui-context.md` table during 01. Confirm this is the intended source of truth.

## Architecture Decisions

- shadcn's current CLI generates `lib/utils.ts` as `export { cn } from "cn"` (the `cn` package from shadcn-ui, a clsx + tailwind-merge replacement), and generated components import `cn` from `"cn"` directly. Left as generated.
- Theme is dark only. `:root` defines the `ui-context.md` palette; shadcn semantic variables (`--background`, `--card`, `--primary`, ...) map onto it. `<html>` carries the `dark` class so `dark:` variants in generated components apply.
- Palette utilities exposed via `@theme inline`: `bg-base`, `bg-surface`, `bg-elevated`, `bg-subtle`, `border-surface-border`, `border-surface-border-subtle`, `text-copy-{primary,secondary,muted,faint}`, `text-brand`, `bg-accent-dim`, `text-ai`, `text-ai-text`, `text-state-{error,success,warning}`.

## Session Notes

- shadcn primary maps to the cyan brand accent (`--accent-primary`), with `--bg-base` as primary foreground.
- shadcn `chart-*` and `sidebar-*` tokens were removed from `globals.css` as unused. Re-add them if a sidebar or chart component is generated.
