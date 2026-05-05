import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Footer from "~/layout/Footer";
import { createRoutesStub } from "~/utils/routerCompat";

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
