import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import Footer from "./Footer";

const RouterStubFooter = createRoutesStub([
  {
    path: "/",
    Component: () => Footer(),
  },
]);

describe("Footer Component", () => {
  it("Renders correctly", () => {
    window.history.pushState({}, "Footer", "/");
    const { container } = render(<RouterStubFooter />);

    expect(container).toMatchSnapshot();
  });
});
