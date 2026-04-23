import { vi } from "vitest";
import { type NavigationContext } from "~/routes/dokumentation._documentationNavigation";

const { mockNavigate } = vi.hoisted(() => ({
  mockNavigate: vi.fn(),
}));

export { mockNavigate };

vi.mock("~/utils/routerCompat", async (importOriginal) => {
  const actual = await importOriginal<typeof import("~/utils/routerCompat")>();
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
    useNavigate: vi.fn(() => mockNavigate),
    useLoaderData: vi.fn(),
    useParams: vi.fn(),
    useRouteLoaderData: vi.fn().mockReturnValue({
      routes: context.routes,
      prinzips: context.prinzips,
    }),
  };
});
