import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  type Route,
  ROUTE_DOCUMENTATION,
  ROUTES_DOCUMENTATION_ORDERED,
} from "~/resources/staticRoutes";

import LayoutWithDocumentationNavigation from "~/routes/dokumentation._documentationNavigation";
import useFeatureFlag from "~/utils/featureFlags";

vi.mock("~/utils/featureFlags", () => {
  return {
    default: vi.fn(),
  };
});

function renderPage({ url }: Route) {
  function ErrorBoundary() {
    return <h1>Something went wrong</h1>;
  }
  function DummyElement() {
    return <h1>Foobar</h1>;
  }
  const routes = [
    {
      path: ROUTE_DOCUMENTATION.url,
      element: <LayoutWithDocumentationNavigation />,
      ErrorBoundary: ErrorBoundary,
      children: [
        {
          path: url,
          element: <DummyElement />,
          HydrateFallback: () => <div></div>,
        },
      ],
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: [url],
  });

  render(<RouterProvider router={router} />);
}

describe("navigation on pages of documentation", () => {
  beforeEach(() => {
    vi.mocked(useFeatureFlag).mockReturnValue(true);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.each(ROUTES_DOCUMENTATION_ORDERED)(
    "$url has back and forth navigation to previous and next page",
    (route) => {
      renderPage(route);

      const index = ROUTES_DOCUMENTATION_ORDERED.findIndex(
        ({ url }) => url === route.url,
      );
      const previous = ROUTES_DOCUMENTATION_ORDERED[index - 1];
      const next = ROUTES_DOCUMENTATION_ORDERED[index + 1];

      if (previous) {
        expect(screen.getByRole("link", { name: "Zurück" })).toHaveAttribute(
          "href",
          previous.url,
        );
      }
      if (next) {
        const linkNext = screen.getByRole("link", {
          name: "Übernehmen & weiter",
        });
        expect(linkNext).toHaveAttribute("href", next.url);
      }
    },
  );

  it("renders sidebar navigation with links to all pages", () => {
    renderPage(ROUTES_DOCUMENTATION_ORDERED[0]);

    const navigation = screen.getByRole("navigation", {
      name: "Alle Fragen",
    });
    for (const route of ROUTES_DOCUMENTATION_ORDERED) {
      const navItem = within(navigation).getByRole("link", {
        name: route.title,
      });
      expect(navItem).toHaveAttribute("href", route.url);
    }
  });

  it("shows error page in case feature flag is disabled", () => {
    vi.spyOn(console, "error").mockImplementation(() => {}); // suppress expected error logs to keep test output clean
    vi.mocked(useFeatureFlag).mockReturnValue(false);

    renderPage(ROUTES_DOCUMENTATION_ORDERED[0]);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });
});
