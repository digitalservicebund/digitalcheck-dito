# 27. Migrate from React Router to Astro

## Status

- 2026-06-19: Proposed
- Supersedes [ADR 3](./0003-use-remix.md) (meta framework), [ADR 17](./0017-use-serverside-caching.md) (server-side caching)
- Partially supersedes [ADR 22](./0022-change-routing-and-breadcrumbs.md) (routing)

## Context

ADR 3 justified a server-side meta framework primarily for backend capabilities: email handling, PDF generation, and serving the frontend. Over the project's lifetime, these needs eroded:

- ADR 24 moved all user data to `localStorage` — no server-side user state exists.
- Document generation (docx, pdf-lib) moved entirely to the browser.
- ADR 17 introduced NodeCache only because Strapi was fetched at runtime; that caching complexity exists solely to work around the server.
- ADR 22 struggled with a fundamental React Router constraint: route config could not be imported from `app/routes.ts` into route files without circular dependencies, requiring a separate metadata file as a workaround.

What remains is a content site with a handful of interactive form flows — a profile that maps directly onto Astro's static-output-plus-islands model.

Astro aligns with the existing `zfl-website` (zfl.bund.de) project at DigitalService, reducing context switching and making component sharing between the two projects practical. The long-term goal is to merge both sites; sharing an architecture is a prerequisite for that.

Developer experience for Astro is strong: it ranks first in retention and satisfaction among meta-frameworks in the [State of JS 2025](https://2025.stateofjs.com/en-US/libraries/meta-frameworks/) survey, and its simplicity (file-based routing, slots, Astro Islands) is well-received within the team.

The React investment is **preserved, not discarded**: ADR 2 (React), ADR 23 (children-first API), ADR 26 (Headless UI), and ADR 13 (RVF forms) all continue to apply within React island components.

### Considered risks

- **Content freshness is now deploy-bound.** Strapi edits require a rebuild and redeploy. Mitigation: Strapi content changes infrequently (Regelungen, Prinzipien are largely static); a webhook-triggered CI build closes the gap for editorial changes.
- **SPA-style routes need care.** `/vorpruefung` and `/dokumentation` are multi-step wizards; full-page navigations feel coarser than client-side routing. Mitigation: use Astro's `<ClientRouter />` for these routes.
- **React components as children of Astro components.** React islands receive children as an opaque slot, so patterns relying on `React.Children` (e.g. `Tabs.tsx`) require an Astro rewrite. This is a one-time migration cost per component.

## Decision

We will migrate the site from React Router to Astro using static site generation (SSG). The production runtime becomes nginx serving pre-built files, with no Node.js application server.

React remains the component technology for interactive islands, hydrated via the `client:load` directive where needed.

## Consequences

**Benefits:**

- Server-side caching (ADR 17) and its associated complexity (NodeCache, TTL tuning, stale-data risk) are eliminated entirely — Strapi is only queried at build time.
- The circular-dependency routing problem from ADR 22 is resolved: Astro's file-based routing generates importable route metadata naturally.
- No Node.js server to patch, monitor, or scale; the attack surface shrinks and ADR 24's privacy guarantee strengthens (user data has no server-side code path).
- Strapi downtime cannot affect the live site — only the build pipeline.
- Pages ship near-zero JS; React hydrates only where there is genuine interactivity, resolving the performance trade-off ADR 2 accepted as "not critical."

**Derived actions:**

- Set up a Strapi webhook → CI rebuild pipeline to restore editorial autonomy.
- Rewrite components that rely on `React.Children` traversal as `.astro` equivalents during migration.
- Enable `<ClientRouter />` for `/vorpruefung` and `/dokumentation` to preserve smooth multi-step navigation.
