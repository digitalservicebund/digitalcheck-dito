/**
 * Compatibility shim replacing react-router primitives with browser-native
 * equivalents for use in Astro (static) context.
 *
 * Route-specific hooks (useLoaderData, Outlet, useOutletContext, useParams, etc.)
 * are NOT included here — those are replaced by props in Astro page components.
 */

import {
  type AnchorHTMLAttributes,
  type ComponentType,
  createContext,
  type DetailedHTMLProps,
  type MouseEvent,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// ── Link ────────────────────────────────────────────────────────────────────

export type LinkProps = Omit<
  DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
  "href"
> & {
  /** Destination URL (mirrors react-router's `to` prop). */
  to: string;
  /** Unused in static mode; kept for API compatibility. */
  prefetch?: string;
  /** Unused in static mode; kept for API compatibility. */
  replace?: boolean;
  /** Unused in static mode; kept for API compatibility. */
  state?: unknown;
  /** Unused in static mode; kept for API compatibility. */
  relative?: string;
  /** Unused in static mode; kept for API compatibility. */
  reloadDocument?: boolean;
  /** Unused in static mode; kept for API compatibility. */
  unstable_viewTransition?: boolean;
};

/**
 * Drop-in replacement for react-router's `<Link>`.
 * Renders a plain `<a>` tag. In MemoryRouter context (tests), intercepts
 * clicks to update in-memory location instead of navigating the page.
 * Hash-only hrefs are resolved relative to the current pathname.
 */
export function Link({
  to,
  prefetch: _prefetch,
  replace: _replace,
  state: _state,
  relative: _relative,
  reloadDocument: _reloadDocument,
  unstable_viewTransition: _vt,
  onClick,
  ...rest
}: LinkProps) {
  const ctx = useContext(LocationContext);
  const loc = useLocation();
  // Resolve hash-only hrefs (e.g. "#section") relative to current pathname
  const resolvedHref = to.startsWith("#") ? loc.pathname + to : to;
  const handleClick = ctx
    ? (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        ctx.navigate(to);
        onClick?.(e);
      }
    : onClick;
  return <a href={resolvedHref} onClick={handleClick} {...rest} />;
}

// ── NavLink ──────────────────────────────────────────────────────────────────

export type NavLinkProps = Omit<LinkProps, "children"> & {
  children: ReactNode | (({ isActive }: { isActive: boolean }) => ReactNode);
};

/**
 * Drop-in replacement for react-router's `<NavLink>`.
 * Marks the link active when `href` matches the current pathname.
 */
export function NavLink({ to, children, ...rest }: NavLinkProps) {
  const { pathname } = useLocation();
  const isActive =
    pathname === to || pathname.startsWith(to.endsWith("/") ? to : to + "/");
  return (
    <a href={to} aria-current={isActive ? "page" : undefined} {...rest}>
      {typeof children === "function" ? children({ isActive }) : children}
    </a>
  );
}

// ── Location context (for MemoryRouter / test environment) ───────────────────

type Location = {
  pathname: string;
  search: string;
  hash: string;
};

type LocationContextValue = {
  location: Location;
  navigate: (to: string) => void;
};

const LocationContext = createContext<LocationContextValue | null>(null);

// ── useLocation ──────────────────────────────────────────────────────────────

/**
 * Drop-in replacement for react-router's `useLocation`.
 * In tests wrapped by MemoryRouter, returns the injected location.
 * Otherwise reads from `window.location` and updates on `popstate`.
 */
export function useLocation(): Location {
  const ctx = useContext(LocationContext);

  const getWindowLocation = (): Location => {
    if (typeof window === "undefined") {
      return { pathname: "/", search: "", hash: "" };
    }
    return {
      pathname: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash,
    };
  };

  const [windowLocation, setWindowLocation] =
    useState<Location>(getWindowLocation);

  useEffect(() => {
    if (ctx) return;
    const update = () => setWindowLocation(getWindowLocation());
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, [ctx]);

  return ctx?.location ?? windowLocation;
}

// ── useNavigate ──────────────────────────────────────────────────────────────

/**
 * Drop-in replacement for react-router's `useNavigate`.
 * In MemoryRouter context, updates the in-memory location.
 * Otherwise uses `window.location.href`.
 */
export function useNavigate() {
  const ctx = useContext(LocationContext);
  return useCallback(
    (to: string) => {
      if (ctx) {
        ctx.navigate(to);
      } else {
        window.location.href = to;
      }
    },
    [ctx],
  );
}

// ── useSearchParams ──────────────────────────────────────────────────────────

type SetSearchParams = (
  updater: (prev: URLSearchParams) => URLSearchParams,
  options?: { preventScrollReset?: boolean },
) => void;

/**
 * Drop-in replacement for react-router's `useSearchParams`.
 * In MemoryRouter context, reads/writes the in-memory location.
 * Otherwise reads/writes `window.location`.
 */
export function useSearchParams(): [URLSearchParams, SetSearchParams] {
  const ctx = useContext(LocationContext);
  const loc = useLocation();
  const params = new URLSearchParams(loc.search);

  const setSearchParams: SetSearchParams = (updater) => {
    const next = updater(new URLSearchParams(loc.search));
    const search = next.toString() ? `?${next.toString()}` : "";
    if (ctx) {
      ctx.navigate(loc.pathname + search + loc.hash);
    } else {
      const url = new URL(window.location.href);
      url.search = next.toString();
      window.history.pushState({}, "", url);
      window.dispatchEvent(new PopStateEvent("popstate", { state: {} }));
    }
  };

  return [params, setSearchParams];
}

// ── Outlet ───────────────────────────────────────────────────────────────────

/**
 * Stub for react-router's `<Outlet>`. Renders nothing in static/Astro context.
 */
export function Outlet() {
  return null;
}

// ── useRouteLoaderData ───────────────────────────────────────────────────────

/**
 * Stub for react-router's `useRouteLoaderData`. Returns undefined in static context.
 */
export function useRouteLoaderData<T = unknown>(
  _routeId: string,
): T | undefined {
  return undefined;
}

// ── useParams ────────────────────────────────────────────────────────────────

/**
 * Read named URL params from a pattern provided at call site.
 * In Astro static mode, components receive params as props.
 * This hook reads them from window.location.pathname as a fallback.
 *
 * Usage: const { principleId } = useParams<{ principleId: string }>();
 * The values are extracted by matching against `patternSegments` in the pathname.
 */
export function useParams<T extends Record<string, string>>(): Partial<T> {
  if (typeof window === "undefined") return {};
  const pathname = window.location.pathname;
  const segments = pathname.split("/").filter(Boolean);
  // Return raw segments as an object so callers can destructure what they need
  return segments.reduce<Record<string, string>>((acc, seg, i) => {
    acc[`_${i}`] = seg;
    return acc;
  }, {}) as Partial<T>;
}

// ── useOutletContext ──────────────────────────────────────────────────────────

/**
 * Stub — Outlet context is replaced by React context in Astro.
 * Child components should use useContext(NavigationContext) instead.
 */
export function useOutletContext<T>(): T {
  return {} as T;
}

// ── useLoaderData / useRouteLoaderData stubs ──────────────────────────────────

/** Stub — data loading is done in Astro frontmatter. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useLoaderData<T = any>(): T {
  return {} as T;
}

// ── Testing shims ─────────────────────────────────────────────────────────────
// These exports allow test files that previously imported from "react-router"
// to continue working without the package installed.

/** Stateful in-memory router for use in tests. Updates location context on navigation. */
export function MemoryRouter({
  children,
  initialEntries,
}: {
  children: ReactNode;
  initialEntries?: string[];
  initialIndex?: number;
}) {
  const raw = initialEntries?.[0] ?? "/";
  const parsed = new URL(raw, "http://localhost");
  const [loc, setLoc] = useState<Location>({
    pathname: parsed.pathname,
    search: parsed.search,
    hash: parsed.hash,
  });

  const navigate = useCallback((to: string) => {
    const next = new URL(to, "http://localhost");
    setLoc({ pathname: next.pathname, search: next.search, hash: next.hash });
  }, []);

  return (
    <LocationContext.Provider value={{ location: loc, navigate }}>
      {children}
    </LocationContext.Provider>
  );
}

/** Alias of MemoryRouter for test compatibility. */
export function BrowserRouter({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

/** Renders its element or Component — works inside Routes in test wrappers. */
export function Route({
  element,
  Component,
}: {
  path?: string;
  element?: ReactNode;
  Component?: ComponentType;
  children?: ReactNode;
}) {
  if (element) return <>{element}</>;
  if (Component) return <Component />;
  return null;
}

/** Renders all Route children (simplified — no path-matching needed for tests). */
export function Routes({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

type RouteConfig = {
  path: string;
  element?: ReactNode;
  Component?: ComponentType;
  ErrorBoundary?: ComponentType;
  HydrateFallback?: ComponentType;
  children?: RouteConfig[];
  loader?: () => unknown;
};

type RouterObject = {
  routes: RouteConfig[];
  initialEntries: string[];
};

/**
 * Creates a stub router for use with RouterProvider in tests.
 * Renders the root route's element/Component at the initial entry path.
 */
export function createMemoryRouter(
  routes: RouteConfig[],
  opts?: { initialEntries?: string[] },
): RouterObject {
  return { routes, initialEntries: opts?.initialEntries ?? ["/"] };
}

export function createBrowserRouter(routes: RouteConfig[]): RouterObject {
  return {
    routes,
    initialEntries: [
      typeof window !== "undefined" ? window.location.pathname : "/",
    ],
  };
}

/**
 * Renders the root route's element or Component from the stub router.
 * Child routes are not rendered — tests that rely on outlet children
 * should be updated to use DocumentationNavigationContext directly.
 */
export function RouterProvider({ router }: { router: RouterObject }) {
  const root = router.routes[0];
  if (!root) return null;
  if (root.element) return <>{root.element}</>;
  if (root.Component) return <root.Component />;
  return null;
}

/**
 * Creates a route stub component for testing components that use router hooks.
 * Renders the matched route's Component at the given path.
 */
export function createRoutesStub(
  routes: Array<{
    path: string;
    Component: ComponentType;
    loader?: () => unknown;
  }>,
) {
  return function RouterStub({
    initialEntries = ["/"],
  }: {
    initialEntries?: string[];
  }) {
    const path = initialEntries[0] ?? "/";
    const route = routes.find(
      (r) => r.path === path || r.path === "/*" || r.path === "*",
    );
    const FallbackRoute = routes[0];
    const MatchedRoute = route ?? FallbackRoute;
    if (!MatchedRoute?.Component) return null;
    return <MatchedRoute.Component />;
  };
}

/** Type stub for react-router's EntryContext (used in entry.server tests). */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type EntryContext = {};
