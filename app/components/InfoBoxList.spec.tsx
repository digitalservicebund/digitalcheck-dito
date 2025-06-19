import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import InfoBoxList from "./InfoBoxList"; // Import the component to test

describe("InfoBoxList", () => {
  it("renders without crashing and displays children within list items", () => {
    render(
      <InfoBoxList>
        <div>Child 1</div>
        <div>Child 2</div>
      </InfoBoxList>,
    );

    // Check that the children are rendered
    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();

    // Check that the children are wrapped in li elements
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(2);
    expect(listItems[0]).toContainElement(screen.getByText("Child 1"));
    expect(listItems[1]).toContainElement(screen.getByText("Child 2"));
  });

  it("renders the heading when provided", () => {
    const headingText = "List Heading";
    render(
      <InfoBoxList heading={<h2>{headingText}</h2>}>
        <div>Child</div>
      </InfoBoxList>,
    );

    expect(
      screen.getByRole("heading", { name: headingText }),
    ).toBeInTheDocument();
  });

  it("does not render a heading when not provided", () => {
    render(
      <InfoBoxList>
        <div>Child</div>
      </InfoBoxList>,
    );
    // Use queryByRole to assert that the element is not in the document
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("applies the correct classes to the ul when separator is true", () => {
    render(
      <InfoBoxList separator={true}>
        <div>Child</div>
      </InfoBoxList>,
    );
    const ulElement = screen.getByRole("list");
    expect(ulElement).toHaveClass("ds-stack-32");
    expect(ulElement).not.toHaveClass("ds-stack-48");
  });

  it("applies the correct classes to the ul when separator is false or not provided", () => {
    const { rerender } = render(
      <InfoBoxList separator={false}>
        <div>Child</div>
      </InfoBoxList>,
    );
    let ulElement = screen.getByRole("list");
    expect(ulElement).toHaveClass("ds-stack-48");
    expect(ulElement).not.toHaveClass("ds-stack-32");

    rerender(
      <InfoBoxList>
        <div>Child</div>
      </InfoBoxList>,
    );
    ulElement = screen.getByRole("list");
    expect(ulElement).toHaveClass("ds-stack-48");
    expect(ulElement).not.toHaveClass("ds-stack-32");
  });

  it("applies separator classes to list items when separator is true", () => {
    render(
      <InfoBoxList separator={true}>
        <div>Child 1</div>
        <div>Child 2</div>
      </InfoBoxList>,
    );

    const listItems = screen.getAllByRole("listitem");
    expect(listItems[0]).toHaveClass("border-b-2");
    expect(listItems[0]).toHaveClass("pb-40");
  });

  it("does not apply separator classes to list items when separator is false or not provided", () => {
    const { rerender } = render(
      <InfoBoxList separator={false}>
        <div>Child 1</div>
        <div>Child 2</div>
      </InfoBoxList>,
    );

    let listItems = screen.getAllByRole("listitem");
    expect(listItems[0]).not.toHaveClass("border-b-2");
    expect(listItems[0]).not.toHaveClass("pb-40");
    expect(listItems[1]).not.toHaveClass("border-b-2");
    expect(listItems[1]).not.toHaveClass("pb-40");

    rerender(
      <InfoBoxList>
        <div>Child 1</div>
        <div>Child 2</div>
      </InfoBoxList>,
    );

    listItems = screen.getAllByRole("listitem");
    expect(listItems[0]).not.toHaveClass("border-b-2");
    expect(listItems[0]).not.toHaveClass("pb-40");
    expect(listItems[1]).not.toHaveClass("border-b-2");
    expect(listItems[1]).not.toHaveClass("pb-40");
  });
});
