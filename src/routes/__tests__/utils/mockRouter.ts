import type { DocumentationNavigationContextType } from "@/routes/dokumentation/DocumentationNavigationContext";
import { vi } from "vitest";

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

vi.mock(
  "@/routes/dokumentation/DocumentationNavigationContext",
  async (importOriginal) => {
    const actual =
      await importOriginal<
        typeof import("@/routes/dokumentation/DocumentationNavigationContext")
      >();
    return {
      ...actual,
      useDocumentationNavigation: vi
        .fn()
        .mockReturnValue(mockNavigationContext),
    };
  },
);
