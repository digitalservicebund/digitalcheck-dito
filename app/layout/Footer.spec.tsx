import { render } from "@testing-library/react";
import Footer from "app/layout/Footer";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";

const RouterStubFooter = createRoutesStub([
  {
    path: "/",
    Component: () => Footer(),
  },
]);

describe("Footer Component", () => {
  it("Renders correctly", () => {
    const { container } = render(<RouterStubFooter />);

    expect(container).toMatchSnapshot();
  });
});
