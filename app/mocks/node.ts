import { setupServer } from "msw/node";
import plausibleHandlers from "~/mocks/plausibleHandlers";

export const mockServer = setupServer(...plausibleHandlers);
