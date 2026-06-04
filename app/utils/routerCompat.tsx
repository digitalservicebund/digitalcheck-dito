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

  // ── useNavigate ──────────────────────────────────────────────────────────────
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
