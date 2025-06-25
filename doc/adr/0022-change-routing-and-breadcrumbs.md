# 22. Change routing and breadcrumb handling

## Status

- 2025-06-06: Accepted

## Context

### Issues with the current route and breadcrumb setup

- For each route, we need to configure and connect several things:
  - Currently "implicitly" defined through file-based routing:
    - The route file
    - The route path (URL)
  - What we refer to as the route definition is configured explicitly:
    - The route title (used e.g. for search engines and tabs)
    - The route breadcrumb (often shorter than the title)
- The configuration of routes is divided across multiple files: `app/routes.ts`, `app/resources/staticRoutes.ts`, `app/resources/allRoutes.ts`, where allRoutes adds precheck question and example principle routes
- Sometimes an `<route>._index.tsx` file is used to export a parent routes content routes, sometimes `<route>.tsx` is used
- Breadcrumbs do not work with trailing slashes at the end of the URL
- Breadcrumb implementation does not follow the official documentation
- It does not work with SSG out of the box

### General considerations

- React Router 7 went back do config based routing as the default in contrast to Remix file based routing (which is also still supported)
- `app/routes.ts` is required by React Router
  - We can't however move all route definitions here if we export them, as we can't use exports from this file in route files
- Route or file configuration, not both: einen tod muss man sterben: Even route config still has filename vs path in config issue
- Route info entirely in files or in config: Not entirely possible due to filename, title, url, and variable availability not being completely colocatable

### Success conditions fo the new implementation

- Works with trailing slashes at the end of the URL
- Reduce number of route files (optimally to one, two is acceptable)
- Consistent approach to route files and route definitions

#### Nice-to-haves

- No extraneous files just for breadcrumbs
- Works for current sitemap implementation

### Considered Approaches

#### File based + info in routes

- Still needs routes file
- Test whether flatRoutes works for sitemap and tests
- Need to create extra files, which isn’t a big deal
- How to do dynamic routes without central config?
- Still needs double configuration of URL and fileName

#### Config based + info in routes

- Most react router like
- Still needs routes url information configured in addition to routes config
- More boilerplate, no central config (but also no place to forget to add routes)
- Imports more complicated
- Might need extra files, but could be more explicit / intuitive
- Unclear Naming convention
- Parent in config

#### Config based + info in config

- Easier for tests
- Needs mapper for custom config -> RouteConfig
- How to shape Routes
- Unclear Naming convention
- Could work without extra files

## Decision

We will keep using file-based routing as it works and doesn't create any issues at the moment.
Config routing also needs extra files to make breadcrumbs work. (why?)

We will simplify the route definitions by removing `allRoutes` and simplify to `staticRoutes` only.
Dynamic pages (precheck, methods, examples) => what happened?

- Create a helper function for route creation that streamlines URL building and parent definitions and improve naming of some select routes
- Unify route configuration: Always use `<route>.tsx` handling breadcrumbs etc. and `<route>._index.tsx` for the rendered content (necessary for correct breadcrumb handling too)
- Introduce new breadcrumb handling: Use a handle where it exists (e.g. dynamic routes like questions or examples), use the statically defined routes otherwise. Also works with trailing slashes and SSG now.

## Consequences

Sitemap

- Info in files => extra files necessary
- Needs one static file next to routes definition
- Three new files are necessary for breadcrumbs
- Direct import of handle possible
  - Leads to more boilerplate
