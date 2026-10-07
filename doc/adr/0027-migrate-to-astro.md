# 27. Migrate from React Router to Astro

## Status

- 2026-06-19: Accepted
- 2026-10-01: Amended: replace Strapi with Astro content collections
- Supersedes [ADR 3](./0003-use-remix.md) (meta framework), [ADR 15](./0015-use-cms-for-examples.md) (CMS), [ADR 16](./0016-use-graphql-for-strapi-requests.md) (GraphQL for Strapi), [ADR 17](./0017-use-serverside-caching.md) (server-side caching), [ADR 22](./0022-change-routing-and-breadcrumbs.md) (routing)

## Context

The main driver is alignment with `zfl-website` (zfl.bund.de), which already uses Astro. A common framework lets both sites reuse components, patterns and libraries (e.g. `KernCard`, the sidebar layout, `astro-route-generator`) and is a prerequisite for the long-term goal of merging them.

The switch is possible because we no longer need an application server. ADR 3 chose a server-side framework for emails and PDF generation, neither of which is needed anymore. User data lives in `localStorage` (ADR 24), Word documents are generated in the browser, and the server's only remaining job was fetching and caching Strapi content (ADR 17). What remains is a content site with a few interactive forms, a good fit for Astro's static pages with interactive islands.

Astro also ranks first in satisfaction and retention among meta-frameworks in the [State of JS 2025](https://2025.stateofjs.com/en-US/libraries/meta-frameworks/) survey, and the team likes its model (file-based routing, slots, islands).

## Decision

We migrate from React Router to Astro with static site generation. In production, nginx serves the pre-built files; there is no Node.js application server.

- **React stays for interactive islands** (e.g. the Vorprüfung and Dokumentation forms). ADR 2 (React), 13 (RVF forms), 23 (children-first API) and 26 (Headless UI) still apply inside islands.
- **Astro content collections replace Strapi.** Prinzipien live in `src/content/prinzipien`; the remaining Strapi content has moved to `zfl-website`.
- **Routing uses [`astro-route-generator`](https://github.com/digitalservicebund/astro-route-generator)**, which derives route metadata (titles, parents, breadcrumbs) from Astro's file-based routing.

## Consequences

**Benefits:**

- **Shared components with `zfl-website`:** Components can be moved between both projects with little adaptation.
- **No Node.js server:** Nothing to patch or monitor at runtime. User data never touches server-side code, which strengthens ADR 24's privacy guarantee.
- **No Strapi costs or maintenance:** Strapi Cloud and the `digitalcheck-beispiele` repository (the Strapi app) are gone, along with NodeCache, GraphQL queries and stale-data handling.
- **Less JS, faster page loads:** Pages are pre-rendered and only ship JS for their interactive parts; most pages hydrate no React at all.

**Trade-offs:**

- **Content changes need a deploy:** Edits go through pull requests again, as before Strapi (ADR 7). This is acceptable because the content (Prinzipien) rarely changes.
- **Temporary component duplication:** Some components exist in both a React and an Astro version (e.g. `Tabs`, `Hero`, `MethodCard`), because React islands cannot render Astro components. This should shrink as the migration continues.
- **Full page loads between form steps:** Each step is a separate page (ADR 6), so navigating can feel less smooth than in a single-page app. `/dokumentation` mitigates this with Astro's `<ClientRouter />`.
