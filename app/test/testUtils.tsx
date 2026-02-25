import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { MemoryRouter } from "react-router";
import FederalStateContext, {
  type FederalState,
  getFederalStateInfo,
} from "~/contexts/FederalStateContext";

interface WrapperProps {
  children: ReactNode;
}

interface RenderWithProvidersOptions extends Omit<RenderOptions, "wrapper"> {
  initialRoute?: string;
  federalState?: FederalState;
}

/**
 * Creates a mock FederalStateProvider for testing
 */
function createMockFederalStateProvider(state: FederalState = "bund") {
  return function MockFederalStateProvider({ children }: WrapperProps) {
    const value = {
      currentState: state,
      setCurrentState: () => {},
      stateInfo: getFederalStateInfo(state),
    };

    return (
      <FederalStateContext.Provider value={value}>
        {children}
      </FederalStateContext.Provider>
    );
  };
}

/**
 * Renders a component with all necessary providers for testing
 */
export function renderWithProviders(
  ui: ReactElement,
  {
    initialRoute = "/",
    federalState = "bund",
    ...renderOptions
  }: RenderWithProvidersOptions = {},
) {
  const MockFederalStateProvider = createMockFederalStateProvider(federalState);

  function Wrapper({ children }: WrapperProps) {
    return (
      <MemoryRouter initialEntries={[initialRoute]}>
        <MockFederalStateProvider>{children}</MockFederalStateProvider>
      </MemoryRouter>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

/**
 * Renders a component with MemoryRouter and FederalStateProvider
 * This is a simpler version for tests that just need routing context
 */
export function renderWithRouter(
  ui: ReactElement,
  federalState: FederalState = "bund",
) {
  return renderWithProviders(ui, { federalState });
}
