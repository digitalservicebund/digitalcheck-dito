import { render } from "@testing-library/react";
import { features } from "app/resources/features";
import Index from "app/routes/_index";
import { createRoutesStub } from "react-router";
import { describe, expect, it, vi } from "vitest";

vi.mock("react-router", async () => ({
  ...(await vi.importActual("react-router")),
  useOutletContext: () => ({
    featureFlags: Object.fromEntries(
      Object.entries(features).map(([_, value]) => [value, true]),
    ),
  }),
}));

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal("ResizeObserver", ResizeObserverMock);

const RouterStubIndex = createRoutesStub([
  {
    path: "/",
    Component: () => Index(),
  },
]);

describe("Landing page main content", () => {
  it("Renders correctly", () => {
    const { container } = render(<RouterStubIndex />);

    expect(container).toMatchSnapshot();
  });
});
