import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  type Route,
  ROUTE_DOCUMENTATION,
  ROUTE_DOCUMENTATION_INFO,
  ROUTE_DOCUMENTATION_PARTICIPATION,
  ROUTE_DOCUMENTATION_SEND,
  ROUTE_DOCUMENTATION_SUMMARY,
  ROUTES_DOCUMENTATION_PRINCIPLES,
} from "~/resources/staticRoutes";

import { JSX } from "react";
import LayoutWithDocumentationNavigation from "~/routes/dokumentation._documentationNavigation";
import DocumentationPrinciple, {
  loader,
} from "~/routes/dokumentation._documentationNavigation.$principleId";
import DocumentationSend from "~/routes/dokumentation._documentationNavigation.absenden";
import DocumentationParticipation from "~/routes/dokumentation._documentationNavigation.beteiligungsformate";
import DocumentationInfo from "~/routes/dokumentation._documentationNavigation.informationen-zum-regelungsvorhaben";
import DocumentationSummary from "~/routes/dokumentation._documentationNavigation.zusammenfassung";
import useFeatureFlag from "~/utils/featureFlags";

vi.mock("~/utils/featureFlags", () => {
  return {
    default: vi.fn(),
  };
});

type Page = {
  path: string;
  title: string;
  element: JSX.Element;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loader?: (request: any) => void;
};

function createPage(
  route: Route,
  element: JSX.Element,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loader?: (request: any) => void,
): Page {
  return {
    path: route.url,
    title: route.title,
    element,
    loader,
  };
}

const pages: Page[] = [
  createPage(ROUTE_DOCUMENTATION_INFO, <DocumentationInfo />),
  createPage(ROUTE_DOCUMENTATION_PARTICIPATION, <DocumentationParticipation />),
  ...ROUTES_DOCUMENTATION_PRINCIPLES.map((principleRoute) =>
    createPage(principleRoute, <DocumentationPrinciple />, loader),
  ),
  createPage(ROUTE_DOCUMENTATION_SUMMARY, <DocumentationSummary />),
  createPage(ROUTE_DOCUMENTATION_SEND, <DocumentationSend />),
];

function renderPage({ path, element, loader }: Page) {
  function NotFoundBoundary() {
    return <h1>Something went wrong</h1>;
  }
  const routes = [
    {
      path: ROUTE_DOCUMENTATION.url,
      element: <LayoutWithDocumentationNavigation />,
      ErrorBoundary: NotFoundBoundary,
      children: [
        {
          path,
          element,
          loader,
          HydrateFallback: () => <div></div>,
        },
      ],
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: [path],
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

  it.each(pages)(
    "$path has back and forth navigation to previous and next page",
    (page) => {
      renderPage(page);

      const index = pages.findIndex(({ path }) => path === page.path);
      const previous = pages[index - 1];
      const next = pages[index + 1];

      if (previous) {
        expect(screen.getByRole("link", { name: "Zurück" })).toHaveAttribute(
          "href",
          previous.path,
        );
      }
      if (next) {
        const linkNext = screen.getByRole("link", {
          name: "Übernehmen & weiter",
        });
        expect(linkNext).toHaveAttribute("href", next.path);
      }
    },
  );

  it("renders sidebar navigation with links to all pages", () => {
    renderPage(pages[0]);

    const navigation = screen.getByRole("navigation", {
      name: "Alle Fragen",
    });
    for (const page of pages) {
      const navItem = within(navigation).getByRole("link", {
        name: page.title,
      });
      expect(navItem).toHaveAttribute("href", page.path);
    }
  });

  it("shows error page in case feature flag is disabled", () => {
    vi.spyOn(console, "error").mockImplementation(() => {}); // suppress expected error logs to keep test output clean
    vi.mocked(useFeatureFlag).mockReturnValue(false);

    renderPage(pages[0]);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });
});
