// @vitest-environment node
import Index from "@/pages/assistent/vorpruefung/index.astro";
import { contact } from "@/resources/content/shared/contact";
import { renderToDOM } from "@/utils/testUtils";
import type { BoundFunctions, queries } from "@testing-library/dom";
import { within } from "@testing-library/dom";
import "@testing-library/jest-dom";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import { beforeEach, describe, expect, it } from "vitest";

describe("Vorpruefung Index Route - Integration Tests", () => {
  let screen: BoundFunctions<typeof queries>;

  beforeEach(async () => {
    const { dom } = await renderToDOM(Index as AstroComponentFactory);
    screen = within(dom.body);
  });

  it("renders the Hero section with the correct title", () => {
    expect(
      screen.getByRole("heading", { name: "Vorprüfung", level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getByText("Digitalbezug einschätzen")).toBeInTheDocument();
  });

  it("renders the contact below the FAQ", () => {
    // The footer has the same links
    const main = within(screen.getByRole("main"));
    expect(
      main.getByText("Ihre Frage war nicht dabei? Kontaktieren Sie uns gerne:"),
    ).toBeInTheDocument();
    expect(main.getByRole("link", { name: contact.email })).toHaveAttribute(
      "href",
      `mailto:${contact.email}`,
    );
    expect(
      main.getByRole("link", { name: contact.phoneDisplay }),
    ).toHaveAttribute("href", contact.phone);
  });
});
