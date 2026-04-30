import { vi } from "vitest";
import { type NavigationContext } from "~/routes/dokumentation._documentationNavigation";

const { mockNavigate, mockNavigationContext } = vi.hoisted(() => {
  const ctx: NavigationContext = {
    currentUrl: "/current-url",
    nextUrl: "/next-url",
    previousUrl: "/previous-url",
    routes: [],
    prinzips: [],
  };
  return {
    mockNavigate: vi.fn(),
    mockNavigationContext: ctx,
  };
});

export { mockNavigate, mockNavigationContext };

vi.mock("~/utils/routerCompat", async (importOriginal) => {
  const actual = await importOriginal<typeof import("~/utils/routerCompat")>();

  return {
    ...actual,
    useOutletContext: vi.fn().mockReturnValue(mockNavigationContext),
    useNavigate: vi.fn(() => mockNavigate),
    useLoaderData: vi.fn(),
    useParams: vi.fn(),
    useRouteLoaderData: vi.fn().mockReturnValue({
      routes: mockNavigationContext.routes,
      prinzips: mockNavigationContext.prinzips,
    }),
  };
});
