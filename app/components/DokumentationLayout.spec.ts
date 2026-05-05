import { describe, expect, it } from "vitest";
import { buildDocumentationRoutes } from "./DokumentationLayout";

const mockPrinzips = [
  {
    Name: "Digitale Kommunikation sicherstellen",
    URLBezeichnung: "digitale-kommunikation",
    documentId: "doc-1",
  },
  {
    Name: "Wiederverwendung von Daten und Standards ermöglichen",
    URLBezeichnung: "wiederverwendung",
    documentId: "doc-2",
  },
];

describe("buildDocumentationRoutes", () => {
  it("builds the documentation routes in the correct order", () => {
    const routes = buildDocumentationRoutes(mockPrinzips);
    expect(routes).toMatchSnapshot();
  });

  it("places principle routes between intro and finalize routes", () => {
    const routes = buildDocumentationRoutes(mockPrinzips);
    const flat = routes.flat();
    const paths = flat.map((r) => r.path);
    expect(paths[0]).toBe("/dokumentation/hinweise");
    expect(paths[paths.length - 1]).toBe("/dokumentation/absenden");
    expect(paths).toContain("/dokumentation/digitale-kommunikation");
  });

  it("returns only intro and finalize routes when no prinzips given", () => {
    const routes = buildDocumentationRoutes([]);
    expect(routes).toMatchSnapshot();
  });
});
