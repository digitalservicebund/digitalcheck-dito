import { vi } from "vitest";
import type { DocumentationNavigationContextType } from "~/routes/dokumentation/DocumentationNavigationContext";

const { mockNavigate, mockNavigationContext } = vi.hoisted(() => {
  const ctx: DocumentationNavigationContextType = {
    currentUrl: "/current-url",
    navigationBaseUrl: "/current-url",
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

vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router")>();

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

vi.mock(
  "~/routes/dokumentation/DocumentationNavigationContext",
  async (importOriginal) => {
    const actual =
      await importOriginal<
        typeof import("~/routes/dokumentation/DocumentationNavigationContext")
      >();
    return {
      ...actual,
      useDocumentationNavigation: vi
        .fn()
        .mockReturnValue(mockNavigationContext),
    };
  },
);
