import fs from "node:fs";
import path from "node:path";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  escapeStringLiteral,
  generateRoutes,
  getParentRouteKey,
  serializeRoutesModule,
  toExportName,
  toRouteKey,
} from "./routeGenerator";

vi.mock("node:fs");

// =============================================================================
// Test Harness
// =============================================================================
// These helpers keep the integration tests compact:
// - `mockPages()` simulates a small pages directory tree in memory.
// - `runBuild()` drives the Astro hooks the integration registers.

const PAGES_DIR = "src/pages";
const OUTPUT_FILE = "src/routes.ts";
const PAGES_ROOT = path.resolve(PAGES_DIR);

type MockFile = {
  path: string;
  frontmatter?: string;
};

type MockPageFile = MockFile & {
  frontmatter: string;
};

function createDirent(name: string, isDirectory: boolean) {
  return {
    name,
    isDirectory: () => isDirectory,
  };
}

function createPageWithFrontmatter(frontmatter: string) {
  return `---
${frontmatter}
---`;
}

function hasFrontmatter(file: MockFile): file is MockPageFile {
  return file.frontmatter !== undefined;
}

function mockPages(files: MockFile[]) {
  const contents = new Map(
    files
      .filter(hasFrontmatter)
      .map((file) => [
        path.join(PAGES_ROOT, file.path),
        createPageWithFrontmatter(file.frontmatter),
      ]),
  );

  vi.mocked(fs.existsSync).mockReturnValue(true);
  vi.mocked(fs.readdirSync).mockImplementation((dir) => {
    const normalizedDir = path
      .relative(PAGES_ROOT, String(dir))
      .replaceAll("\\", "/");
    const prefix = normalizedDir ? `${normalizedDir}/` : "";
    const children = new Map<string, boolean>();

    for (const file of files) {
      if (!file.path.startsWith(prefix)) continue;

      const remainder = file.path.slice(prefix.length);
      const [segment, ...rest] = remainder.split("/");
      children.set(segment, rest.length > 0);
    }

    return [...children.entries()].map(([name, isDirectory]) =>
      createDirent(name, isDirectory),
    ) as unknown as ReturnType<typeof fs.readdirSync>;
  });
  vi.mocked(fs.readFileSync).mockImplementation((file) => {
    const content = contents.get(String(file));
    if (content === undefined) {
      throw new Error(`Unexpected read for ${String(file)}`);
    }

    return content;
  });
}

function createIntegration() {
  return generateRoutes({ pagesDir: PAGES_DIR, output: OUTPUT_FILE });
}

function runBuild(base = "/") {
  const integration = createIntegration();
  integration.hooks["astro:config:done"]?.({ config: { base } } as never);
  integration.hooks["astro:build:start"]?.({ config: { base } } as never);
}

function getWrittenOutput() {
  return vi.mocked(fs.writeFileSync).mock.calls.at(-1)?.[1] as string;
}

// =============================================================================
// Integration Tests: Route Generation Hook
// =============================================================================
// These tests exercise the full generation flow from mocked page files to the
// written routes module.

describe("generateRoutes() Integration Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ---------------------------------------------------------------------------
  // Astro hook wiring
  // ---------------------------------------------------------------------------

  describe("Astro lifecycle integration", () => {
    it("triggers file generation during astro:build:start", () => {
      mockPages([
        {
          path: "index.astro",
          frontmatter: 'const frontmatter = { title: "Home" };',
        },
      ]);
      runBuild();

      expect(fs.writeFileSync).toHaveBeenCalledWith(
        path.resolve(OUTPUT_FILE),
        expect.stringContaining('path: "/"'),
      );
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        path.resolve(OUTPUT_FILE),
        expect.stringContaining('key: "home"'),
      );
    });
  });

  // ---------------------------------------------------------------------------
  // Route graph construction
  // ---------------------------------------------------------------------------

  describe("route graph construction", () => {
    it("serializes parent references as variable names for nested routes", () => {
      mockPages([
        {
          path: "ueber/index.astro",
          frontmatter: 'const frontmatter = { title: "Über das ZfL" };',
        },
        {
          path: "ueber/das-ist-neu.astro",
          frontmatter: 'const frontmatter = { title: "Das ist neu" };',
        },
      ]);
      runBuild();

      expect(fs.writeFileSync).toHaveBeenCalledWith(
        path.resolve(OUTPUT_FILE),
        expect.stringContaining("parent: ueber,"),
      );
    });

    it("throws when a nested route has no generated parent route", () => {
      mockPages([
        {
          path: "ueber/index.astro",
        },
        {
          path: "ueber/das-ist-neu.astro",
          frontmatter: 'const frontmatter = { title: "Das ist neu" };',
        },
      ]);

      expect(() => runBuild()).toThrow();
    });
  });

  // ---------------------------------------------------------------------------
  // File discovery and metadata filtering
  // ---------------------------------------------------------------------------

  describe("file discovery and metadata filtering", () => {
    it("ignores unsupported file extensions", () => {
      mockPages([
        {
          path: "index.astro",
          frontmatter: 'const frontmatter = { title: "Home" };',
        },
        {
          path: "notes.mdx",
          frontmatter: "title: Notes",
        },
        { path: "draft.ts" },
        { path: "image.png" },
      ]);
      runBuild();

      expect(fs.readFileSync).toHaveBeenCalledTimes(2);
      expect(getWrittenOutput()).toContain('title: "Notes"');
      expect(getWrittenOutput()).not.toContain("draft");
      expect(getWrittenOutput()).not.toContain("image");
    });

    it("omits pages whose metadata cannot be extracted", () => {
      mockPages([
        {
          path: "index.astro",
          frontmatter: 'const frontmatter = { title: "Home" };',
        },
        {
          path: "draft.astro",
          frontmatter: "const frontmatter = {};",
        },
      ]);
      runBuild();

      expect(getWrittenOutput()).toContain('title: "Home"');
      expect(getWrittenOutput()).not.toContain("draft");
    });
  });

  // ---------------------------------------------------------------------------
  // Output serialization
  // ---------------------------------------------------------------------------

  describe("serialized routes module output", () => {
    it("emits a Route type, top-level exports with as const, and an allRoutes array", () => {
      mockPages([
        {
          path: "index.astro",
          frontmatter: 'const frontmatter = { title: "Home" };',
        },
      ]);
      runBuild();

      const output = getWrittenOutput();
      expect(output).toContain("export type Route = {");
      expect(output).toContain("export const home = {");
      expect(output).toContain("} as const;");
      expect(output).toContain("export const allRoutes = [");
      expect(output).toContain("home,");
      expect(output).toContain("] as const;");
    });

    it("serializes nullable route metadata as null literals", () => {
      mockPages([
        {
          path: "index.astro",
          frontmatter: 'const frontmatter = { title: "Home" };',
        },
      ]);
      runBuild();

      expect(fs.writeFileSync).toHaveBeenCalledWith(
        path.resolve(OUTPUT_FILE),
        expect.stringContaining("parent: null,"),
      );
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        path.resolve(OUTPUT_FILE),
        expect.stringContaining('key: "home"'),
      );
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        path.resolve(OUTPUT_FILE),
        expect.stringContaining("navLabel: null,"),
      );
    });

    it("bakes the configured Astro base path into serialized route paths", () => {
      mockPages([
        {
          path: "index.astro",
          frontmatter: 'const frontmatter = { title: "Home" };',
        },
      ]);
      runBuild("/zfl-website/previews/test-branch");

      expect(fs.writeFileSync).toHaveBeenCalledWith(
        path.resolve(OUTPUT_FILE),
        expect.stringContaining('path: "/zfl-website/previews/test-branch/"'),
      );
    });

    it("escapes quotes and backslashes in serialized strings", () => {
      mockPages([
        {
          path: "index.astro",
          frontmatter: `const frontmatter = {
  title: 'A "quoted" title \\\\ path',
  navLabel: 'Label "Q" \\\\ path',
};`,
        },
      ]);
      runBuild();

      expect(getWrittenOutput()).toContain(
        'title: "A \\"quoted\\" title \\\\ path"',
      );
      expect(getWrittenOutput()).toContain(
        'navLabel: "Label \\"Q\\" \\\\ path"',
      );
    });

    it("prefixes generated export names that are not valid JS identifiers", () => {
      mockPages([
        {
          path: "2026-news.astro",
          frontmatter: 'const frontmatter = { title: "2026 News" };',
        },
      ]);
      runBuild();

      expect(getWrittenOutput()).toContain("export const _2026News = {");
      expect(getWrittenOutput()).toContain('key: "2026News"');
    });
  });
});

// =============================================================================
// Unit Tests: Routes Module Serialization
// =============================================================================

describe("serializeRoutesModule", () => {
  it("sorts routes by key before serializing", () => {
    const output = serializeRoutesModule(
      [
        {
          key: "zwei",
          path: "/zwei",
          title: "Zwei",
          parentKey: null,
          sitemap: true,
          isStagingOnly: false,
          navOrder: null,
          navLabel: null,
        },
        {
          key: "eins",
          path: "/eins",
          title: "Eins",
          parentKey: null,
          sitemap: true,
          isStagingOnly: false,
          navOrder: null,
          navLabel: null,
        },
      ],
      "/",
    );

    expect(output.indexOf("export const eins")).toBeLessThan(
      output.indexOf("export const zwei"),
    );
  });

  it("prefixes invalid identifiers and preserves escaped string content", () => {
    const output = serializeRoutesModule(
      [
        {
          key: "2026News",
          path: "/2026-news",
          title: 'A "quoted" title',
          parentKey: null,
          sitemap: true,
          isStagingOnly: false,
          navOrder: null,
          navLabel: 'Label "Q"',
        },
      ],
      "/",
    );

    expect(output).toContain("export const _2026News = {");
    expect(output).toContain('key: "2026News"');
    expect(output).toContain('title: "A \\"quoted\\" title"');
    expect(output).toContain('navLabel: "Label \\"Q\\""');
  });

  it("emits parent as a variable reference for nested routes", () => {
    const output = serializeRoutesModule(
      [
        {
          key: "ueber",
          path: "/ueber",
          title: "Über",
          parentKey: null,
          sitemap: true,
          isStagingOnly: false,
          navOrder: null,
          navLabel: null,
        },
        {
          key: "ueber_dasIstNeu",
          path: "/ueber/das-ist-neu",
          title: "Das ist neu",
          parentKey: "ueber",
          sitemap: true,
          isStagingOnly: false,
          navOrder: null,
          navLabel: null,
        },
      ],
      "/",
    );

    expect(output).toContain("parent: ueber,");
    expect(output).toContain("export const allRoutes = [");
    expect(output).toContain("ueber,");
    expect(output).toContain("ueber_dasIstNeu,");
    expect(output).toContain("] as const;");
  });
});

// =============================================================================
// Unit Tests: Route Key Derivation
// =============================================================================

describe("toRouteKey", () => {
  it("converts a single route segment to camelCase", () => {
    expect(toRouteKey("/ueber-uns")).toBe("ueberUns");
  });

  it("joins nested route segments with underscores", () => {
    expect(toRouteKey("/ueber-uns/zahlen-und-fakten")).toBe(
      "ueberUns_zahlenUndFakten",
    );
  });

  it("normalizes each nested segment independently", () => {
    expect(toRouteKey("/foo_bar/baz-qux")).toBe("fooBar_bazQux");
  });

  it("drops unsupported characters while preserving route structure", () => {
    expect(toRouteKey("/ueber-uns/2026-&-mehr")).toBe("ueberUns_2026Mehr");
  });

  it("converts root to home", () => {
    expect(toRouteKey("/")).toBe("home");
  });
});

describe("getParentRouteKey", () => {
  it("returns null for top-level routes", () => {
    expect(getParentRouteKey("/ueber")).toBeNull();
  });

  it("returns the normalized parent key for nested routes", () => {
    expect(getParentRouteKey("/ueber-uns/zahlen-und-fakten")).toBe("ueberUns");
  });

  it("returns the immediate parent key for deeply nested routes", () => {
    expect(getParentRouteKey("/ueber-uns/zahlen-und-fakten/team")).toBe(
      "ueberUns_zahlenUndFakten",
    );
  });
});

// =============================================================================
// Unit Tests: Serialization Helpers
// =============================================================================

describe("toExportName", () => {
  it("leaves valid JavaScript identifiers unchanged", () => {
    expect(toExportName("ueberUns")).toBe("ueberUns");
  });

  it("prefixes identifiers that start with a digit", () => {
    expect(toExportName("2026News")).toBe("_2026News");
  });
});

describe("escapeStringLiteral", () => {
  it("serializes null as the literal null", () => {
    expect(escapeStringLiteral(null)).toBe("null");
  });

  it("escapes quotes and backslashes in strings", () => {
    expect(escapeStringLiteral('A "quoted" \\ path')).toBe(
      '"A \\"quoted\\" \\\\ path"',
    );
  });
});
