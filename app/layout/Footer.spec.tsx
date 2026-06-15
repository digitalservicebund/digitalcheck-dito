import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Footer from "~/layout/Footer";

describe("Footer Component", () => {
  it("Renders correctly", () => {
    const { container } = render(<Footer />);

    expect(container).toMatchSnapshot();
  });
});
