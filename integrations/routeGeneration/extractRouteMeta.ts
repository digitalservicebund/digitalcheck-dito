import matter from "gray-matter";
import ts from "typescript";
import type { RouteMeta } from "../routeGenerator";

type RouteMetaKey = keyof RouteMeta;
type RouteMetaValue = string | boolean | number;
type RouteMetaInput = Partial<Record<RouteMetaKey, RouteMetaValue>>;

const ROUTE_META_KEYS = [
  "title",
  "sitemap",
  "isStagingOnly",
  "navOrder",
  "navLabel",
] as const satisfies RouteMetaKey[];

function isRouteMetaKey(key: string): key is RouteMetaKey {
  return ROUTE_META_KEYS.includes(key as RouteMetaKey);
}

export function extractMeta(file: string, raw: string): RouteMeta | null {
  const data = file.endsWith(".astro")
    ? extractAstroRouteMeta(file, raw)
    : (matter(raw).data as RouteMetaInput);

  const title = typeof data.title === "string" ? data.title : undefined;
  if (!title) return null;

  return {
    title,
    sitemap: data.sitemap !== false,
    isStagingOnly: !!data.isStagingOnly,
    navOrder: typeof data.navOrder === "number" ? data.navOrder : null,
    navLabel: typeof data.navLabel === "string" ? data.navLabel : null,
  };
}

function extractAstroRouteMeta(file: string, raw: string): RouteMetaInput {
  const frontmatterBlock = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw)?.[1];
  if (!frontmatterBlock) return {};

  const sourceFile = ts.createSourceFile(
    file,
    frontmatterBlock,
    ts.ScriptTarget.Latest,
  );

  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue;

    for (const declaration of statement.declarationList.declarations) {
      if (
        !ts.isIdentifier(declaration.name) ||
        declaration.name.text !== "frontmatter"
      ) {
        continue;
      }

      if (
        !declaration.initializer ||
        !ts.isObjectLiteralExpression(declaration.initializer)
      ) {
        throw new Error(
          `${file}: \`frontmatter\` must be declared as a plain object literal.`,
        );
      }

      return readAstroRouteMetaObject(declaration.initializer);
    }
  }

  return {};
}

function readAstroRouteMetaObject(
  objectLiteral: ts.ObjectLiteralExpression,
): RouteMetaInput {
  const meta: RouteMetaInput = {};

  for (const property of objectLiteral.properties) {
    if (!ts.isPropertyAssignment(property)) continue;

    const key =
      ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)
        ? property.name.text
        : null;
    if (!key || !isRouteMetaKey(key)) continue;

    const value = readLiteralValue(property.initializer);
    if (value === null) continue;

    meta[key] = value;
  }

  return meta;
}

function readLiteralValue(value: ts.Expression): RouteMetaValue | null {
  if (ts.isStringLiteralLike(value)) return value.text;
  if (ts.isNumericLiteral(value)) return Number(value.text);
  if (value.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (value.kind === ts.SyntaxKind.FalseKeyword) return false;

  return null;
}
