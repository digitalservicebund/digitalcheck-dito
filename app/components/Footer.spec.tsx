import { render } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";
import Footer from "./Footer";

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
