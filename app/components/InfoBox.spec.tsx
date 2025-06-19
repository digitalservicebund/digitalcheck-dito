import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import InfoBox, { InfoBoxIconProps } from "./InfoBox"; // Import the component to test

describe("InfoBox", () => {
  it("renders without crashing and displays children", () => {
    render(
      <InfoBox>
        <div>Test Children</div>
      </InfoBox>,
    );
    expect(screen.getByText("Test Children")).toBeInTheDocument();
  });

  it("renders with an identifier", () => {
    render(
      <InfoBox identifier="test-id">
        <div>Children</div>
      </InfoBox>,
    );
    const infoBoxElement = screen.getByTestId("info-box-container");
    expect(infoBoxElement).toBeInTheDocument();
    expect(infoBoxElement).toHaveAttribute("id", "test-id");
  });

  it("renders with an icon when provided", () => {
    const MockIconContent = () => <svg data-testid="mock-svg">Mock SVG</svg>;
    const iconProps = {
      size: "SMALL",
      content: <MockIconContent />,
    } as InfoBoxIconProps;
    render(
      <InfoBox icon={iconProps}>
        <div data-testid="children">Children</div>
      </InfoBox>,
    );

    expect(screen.getByTestId("mock-svg")).toBeInTheDocument();
    const iconWrapper = screen.getByTestId("mock-svg").parentElement;
    expect(iconWrapper).toHaveClass("hidden");
    expect(iconWrapper).toHaveClass("sm:block");
  });

  it("applies className to the main container", () => {
    render(
      <InfoBox className="custom-class">
        <div data-testid="children">Children</div>
      </InfoBox>,
    );
    const infoBoxElement = screen.getByTestId("info-box-container");
    expect(infoBoxElement).toHaveClass("custom-class");
  });
});
