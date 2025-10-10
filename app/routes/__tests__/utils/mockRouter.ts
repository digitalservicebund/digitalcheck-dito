import { vi } from "vitest";

const mockUseOutletContext = vi.fn();

export const mockRouter = () => {
  vi.mock("react-router", async (importOriginal) => {
    const actual = await importOriginal<typeof import("react-router")>();
    return {
      ...actual,
      useOutletContext: mockUseOutletContext,
      useNavigate: vi.fn(() => vi.fn()),
    };
  });

  return {
    mockUseOutletContext,
  };
};
