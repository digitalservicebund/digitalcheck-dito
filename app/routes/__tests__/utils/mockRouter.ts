import { vi } from "vitest";
import type { Route as InternalRoute } from "~/resources/staticRoutes";
import type { NavigationContext } from "~/routes/dokumentation._documentationNavigation";

const mockUseOutletContext = vi.fn();

export const mockRouter = (
  routes: (InternalRoute | InternalRoute[])[] = [],
) => {
  vi.mock("react-router", async (importOriginal) => {
    const actual = await importOriginal<typeof import("react-router")>();
    return {
      ...actual,
      useOutletContext: mockUseOutletContext,
      useNavigate: vi.fn(() => vi.fn()),
    };
  });

  const mockNavigationContext = () => {
    const context: NavigationContext = {
      currentUrl: "/current-url",
      nextUrl: "/next-url",
      previousUrl: "/previous-url",
      routes: routes,
    };
    mockUseOutletContext.mockReturnValue(context);
  };

  return {
    mockNavigationContext,
  };
};
