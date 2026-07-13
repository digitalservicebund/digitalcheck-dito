import Footer from "@/layout/Footer";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Footer Component", () => {
  it("Renders correctly", () => {
    const { container } = render(<Footer />);

    expect(container).toMatchSnapshot();
  });
});
