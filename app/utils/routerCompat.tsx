/**
 * Compatibility shim replacing react-router primitives with browser-native
 * equivalents for use in Astro (static) context.
 *
 * Route-specific hooks are NOT included here — those are replaced by props in Astro page components.
 */

import type { ComponentType, ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// ── Location context (for MemoryRouter / test environment) ───────────────────

type Location = {
  pathname: string;
  search: string;
  hash: string;
};

type LocationContextValue = {
  location: Location;
  navigate: (to: string) => Promise<void>;
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
    async (to: string): Promise<void> => {
      if (ctx) {
        await ctx.navigate(to);
      } else {
        window.location.href = to;
        // Pseudo-await: the page navigates away before this resolves,
        // but satisfies the async contract.
        await Promise.resolve();
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
      void ctx.navigate(loc.pathname + search + loc.hash);
    } else {
      const url = new URL(window.location.href);
      url.search = next.toString();
      window.history.pushState({}, "", url);
      window.dispatchEvent(new PopStateEvent("popstate", { state: {} }));
    }
  };

  return [params, setSearchParams];
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

  const navigate = useCallback(async (to: string): Promise<void> => {
    const next = new URL(to, "http://localhost");
    setLoc({ pathname: next.pathname, search: next.search, hash: next.hash });
    await Promise.resolve();
  }, []);

  return (
    <LocationContext.Provider value={{ location: loc, navigate }}>
      {children}
    </LocationContext.Provider>
  );
}

/**
 * Creates a route stub component for testing components that use router hooks.
 * Renders the matched route's Component at the given path, wrapped in a
 * MemoryRouter so Link clicks and hash navigation work in tests.
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
    return (
      <MemoryRouter initialEntries={initialEntries}>
        <MatchedRoute.Component />
      </MemoryRouter>
    );
  };
}
