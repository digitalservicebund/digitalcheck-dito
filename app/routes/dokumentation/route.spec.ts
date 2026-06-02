import { describe, expect, it } from "vitest";
import { loader } from "./route.tsx";

describe("dokumentation/route.tsx", () => {
  it("renders the routes as in the snapshot", async () => {
    const { routes } = await loader();
    expect(routes).toMatchSnapshot();
  });
});
