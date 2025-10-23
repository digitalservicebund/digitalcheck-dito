import { vi } from "vitest";
import { NavigationContext } from "~/routes/dokumentation._documentationNavigation";

vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router")>();
  const context: NavigationContext = {
    currentUrl: "/current-url",
    nextUrl: "/next-url",
    previousUrl: "/previous-url",
    routes: [],
    prinzips: [],
  };

  return {
    ...actual,
    useOutletContext: vi.fn().mockReturnValue(context),
    useNavigate: vi.fn(() => vi.fn()),
    useLoaderData: vi.fn(),
  };
});
