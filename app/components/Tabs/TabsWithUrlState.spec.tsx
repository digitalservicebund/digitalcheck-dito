import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event/dist/cjs/index.js";
import { MemoryRouter, useSearchParams } from "react-router";
import { describe, it } from "vitest";
import TabGroupWithUrlState from "~/components/Tabs/TabsWithUrlState.tsx";

vi.mock("react-router", async (importOriginal) => ({
  ...(await importOriginal()),
  useSearchParams: vi.fn(),
}));
describe("TabGroupWithUrlState", () => {
  const renderTabsWithRouter = () =>
    render(
      <MemoryRouter>
        <TabGroupWithUrlState>
          <TabGroupWithUrlState.TabList>
            <TabGroupWithUrlState.Tab>Tab 1</TabGroupWithUrlState.Tab>
            <TabGroupWithUrlState.Tab>Tab 2</TabGroupWithUrlState.Tab>
          </TabGroupWithUrlState.TabList>
        </TabGroupWithUrlState>
      </MemoryRouter>,
    );

  it("sets 1-indexed URL state", async () => {
    const mockSetSearchParams = vi.fn();
    vi.mocked(useSearchParams).mockImplementation(() => [
      new URLSearchParams(),
      mockSetSearchParams,
    ]);
    const user = userEvent.setup();

    const screen = renderTabsWithRouter();
    await user.click(screen.getByText("Tab 2"));
    expect(mockSetSearchParams).toHaveBeenLastCalledWith(
      new URLSearchParams({ tab: "2" }),
      expect.anything(),
    );
  });

  it("uses state from URL", () => {
    vi.mocked(useSearchParams).mockImplementation(() => [
      new URLSearchParams({ tab: "2" }),
      () => {},
    ]);

    const screen = renderTabsWithRouter();

    expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
  });
});
