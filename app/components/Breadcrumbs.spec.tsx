import { render, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import Breadcrumbs from "./Breadcrumbs";

vi.mock("~/resources/staticRoutes", () => {
  const ROUTE_LANDING = {
    url: "/",
    title: "Startseite",
  };

  const ROUTE_TEST = {
    url: "/test-1",
    title: "test-1",
    parent: ROUTE_LANDING.url,
  };

  const ROUTE_TEST_NESTED = {
    url: "/test-1/test-2",
    title: "test-2",
    parent: ROUTE_TEST.url,
  };

  const ROUTE_TEST_ALTERNATIVE_TITLE = {
    url: "/test-1/test-alternative",
    title: "test-title",
    extraBreadcrumbTitle: "test-title-alternative",
    parent: ROUTE_TEST.url,
  };

  return {
    ROUTE_LANDING,
    ROUTES: [
      ROUTE_LANDING,
      ROUTE_TEST,
      ROUTE_TEST_NESTED,
      ROUTE_TEST_ALTERNATIVE_TITLE,
    ],
  };
});

const RouterStubFooter = createRoutesStub([
  {
    path: "/",
    id: "root",
    Component: () => Breadcrumbs(),
    children: [
      {
        path: "test-1",
        id: "test-1",
        Component: () => Breadcrumbs(),
        children: [
          {
            path: "test-2",
            id: "test-2",
            Component: () => Breadcrumbs(),
          },
          {
            path: "test-alternative",
            id: "test-alternative",
            Component: () => Breadcrumbs(),
          },
        ],
      },
    ],
  },
]);

describe("Breadcrumbs Component", () => {
  it("Renders correctly", () => {
    const { container } = render(
      <RouterStubFooter initialEntries={["/test-1"]} />,
    );

    expect(container).toMatchSnapshot();
  });

  it("Shows the correct breadcrumbs", () => {
    render(<RouterStubFooter initialEntries={["/test-1/test-2"]} />);

    expect(
      screen.getByRole("navigation", { name: "breadcrumb navigation" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "Startseite" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "test-1" })).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "test-2" }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("test-2")).toBeInTheDocument();
  });

  it("Shows alternative breadcrumb titles", () => {
    render(<RouterStubFooter initialEntries={["/test-1/test-alternative"]} />);

    expect(
      screen.getByRole("navigation", { name: "breadcrumb navigation" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "Startseite" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "test-1" })).toBeInTheDocument();
    expect(screen.queryByText("test-title")).not.toBeInTheDocument();
    expect(screen.queryByText("test-title-alternative")).toBeInTheDocument();
  });
});
