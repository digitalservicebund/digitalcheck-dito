# 26. Use Headless UI for accessible UI primitives

## Status

- 2026-04-21: Accepted

## Context

We need accessible, keyboard-navigable UI primitives (e.g. dialogs, tabs, accordions, listboxes) that work consistently across the application and can be styled with Tailwind.

We already use `@headlessui/react` for several shared components:

- `Dialog` (`app/components/Dialog.tsx`)
- `Tabs` / `TabGroup` (`app/components/Tabs/Tabs.tsx`) and mobile tab picker via `Listbox` (`app/components/Tabs/MobileTabPicker.tsx`)
- navigation subtree and FAQ accordions via `Disclosure` (`app/components/Nav.tsx`, `app/components/AccordionItem.tsx`)

This dependency also affects platform concerns like our Content Security Policy (CSP) configuration.

## Decision

We will use **Headless UI** (`@headlessui/react`) as the default library for accessible interaction primitives.

Where we want a stable design-system API and consistent styling, we wrap Headless UI primitives in local components (e.g. `Dialog`, `Tabs`) instead of using Headless UI directly in route modules.

## Consequences

**Positive:**

- **Accessibility baseline**: Focus management, keyboard interactions, and ARIA patterns are implemented once and reused.
- **Implementation simplicity**: Headless UI primitives are easy to implement and use.
- **Consistency**: Shared primitives reduce bespoke implementations and styling drift across routes.
- **Tailwind-friendly**: Unstyled primitives fit our styling approach.

**Negative:**

- **CSP impact**: Headless UI currently requires us to allow `'unsafe-inline'` for `style-src` (see `app/utils/contentSecurityPolicy.server.ts`), which we need to accept or revisit if CSP requirements tighten.
- **Library coupling**: Component APIs and behavior are tied to Headless UI updates and breaking changes.

## Alternatives Considered

- **Custom primitives**: Rejected due to higher maintenance cost and a higher risk of accessibility regressions.
- **Other accessibility libraries (e.g. Radix UI, React Aria)**: Not chosen at the time since Headless UI is already in use and provides the required primitives with a smaller migration cost.
