import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import {
  createMemoryRouter,
  RouterProvider,
  useLoaderData,
} from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  type Route,
  ROUTE_DOCUMENTATION,
  ROUTES_DOCUMENTATION_PRE,
} from "~/resources/staticRoutes";

import LayoutWithDocumentationNavigation from "~/routes/dokumentation._documentationNavigation";
import useFeatureFlag from "~/utils/featureFlags";

vi.mock("~/utils/featureFlags", () => {
  return {
    default: vi.fn(),
  };
});

vi.mock("react-router", async (importOriginal) => {
  const original = await importOriginal<typeof import("react-router")>();
  return {
    ...original,
    useLoaderData: vi.fn(),
  };
});

const mockRoutes: (Route[] | Route)[] = [
  ...ROUTES_DOCUMENTATION_PRE,
  [
    {
      title: "Prinzip A",
      url: `${ROUTE_DOCUMENTATION.url}/prinzipA`,
    },
  ],
];

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
    vi.mocked(useLoaderData).mockReturnValue({ routes: mockRoutes });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // TODO: skipped for now must be tested to return the correct next and previous urls
  it.skip.each(mockRoutes.flat())(
    "$url has back and forth navigation to previous and next page",
    (route) => {
      renderPage(route);

      const index = mockRoutes.flat().findIndex(({ url }) => url === route.url);
      const previous = mockRoutes.flat()[index - 1];
      const next = mockRoutes.flat()[index + 1];

      if (previous) {
        expect(screen.getByRole("link", { name: "Zurück" })).toHaveAttribute(
          "href",
          previous.url,
        );
      }
      if (next) {
        const linkNext = screen.getByRole("link", {
          name: "Weiter",
        });
        expect(linkNext).toHaveAttribute("href", next.url);
      }
    },
  );

  it("renders sidebar navigation with links to all pages", () => {
    renderPage(mockRoutes.flat()[0]);

    const navigation = screen.getByRole("navigation", {
      name: "Seitennavigation",
    });
    for (const route of mockRoutes.flat()) {
      const navItem = within(navigation).getByRole("link", {
        name: route.title,
      });
      expect(navItem).toHaveAttribute("href", route.url);
    }
  });

  it("shows error page in case feature flag is disabled", () => {
    vi.spyOn(console, "error").mockImplementation(() => {}); // suppress expected error logs to keep test output clean
    vi.mocked(useFeatureFlag).mockReturnValue(false);

    renderPage(mockRoutes.flat()[0]);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });
});
