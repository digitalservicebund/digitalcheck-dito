export function markdownLinkIEA({
  article,
  paragraph,
  format = "short",
}: {
  article: number;
  paragraph?: number;
  format?: "short" | "long";
}) {
  let text = `Art. ${article}`;
  if (paragraph) {
    const paragraphName = article === 2 ? "Nr." : "Abs.";
    text += ` ${paragraphName} ${paragraph}`;
  }

  text +=
    format === "long"
      ? " der Verordnung für ein interoperables Europa (EU) 2024/903"
      : "";
  return `[${text}](${linkToIEAArticle(article)})`;
}

export function linkToIEAArticle(index?: number) {
  const base =
    "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903";
  if (!index) return base;
  return `${base}#art_${index}`;
}
