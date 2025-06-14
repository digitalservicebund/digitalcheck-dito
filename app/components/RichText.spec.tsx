import { render, screen } from "@testing-library/react";
import RichText from "./RichText";

const EXAMPLE_MARKDOWN = `Jedes Regelungsvorhaben hat Auswirkungen auf die Digitalisierung.
<br />
<br />
**Digitaltaugliche Regelungsvorhaben** sind solche, die die Digitalisierung gezielt fördern und unterstützen.
Schauen Sie sich die [Hilfestellungen und Methoden](/methoden) an, um Ihr Regelungsvorhaben digitaltauglich zu gestalten.
Mit den folgenden externen Beispielen können Sie sich ein Bild davon machen, wie Digitaltauglichkeit in der Praxis aussieht:
- [Beispiel 1](https://example.com)
- [Beispiel 2](https://example.com)

Hier können sie die [Dokumentation herunterladen](/documents/digitalcheck-dokumentation.pdf).

Hier können sie die [Excel-Datei herunterladen](/documents/digitalcheck-dokumentation.xlsx).

Hier können sie das [Word Dokument herunterladen](/documents/digitalcheck-dokumentation.docx).

Hier können sie die [Powerpoint-Datei herunterladen](/documents/digitalcheck-dokumentation.pptx).
`;

test("Richtext renders external links with target blank", async () => {
  render(<RichText markdown={EXAMPLE_MARKDOWN} data-testid="rich-text" />);
  const links = await screen.findAllByRole("link");
  expect(links[0]).not.toHaveAttribute("target", "_blank");
  expect(links[1]).toHaveAttribute("target", "_blank");
  expect(links[2]).toHaveAttribute("target", "_blank");
});

test("Richtext links to download files have download attribute", async () => {
  render(<RichText markdown={EXAMPLE_MARKDOWN} data-testid="rich-text" />);
  const links = await screen.findAllByRole("link");
  expect(links[3]).toHaveAttribute("download");
  expect(links[4]).toHaveAttribute("download");
  expect(links[5]).toHaveAttribute("download");
  expect(links[6]).toHaveAttribute("download");
});

test("Richtext links to download files have helpful title", async () => {
  render(<RichText markdown={EXAMPLE_MARKDOWN} data-testid="rich-text" />);
  const links = await screen.findAllByRole("link");

  expect(links[3]).toHaveAttribute("title");
  expect(links[4]).toHaveAttribute("title");
  expect(links[5]).toHaveAttribute("title");
  expect(links[6]).toHaveAttribute("title");

  expect(links[3].title).contains("(PDF-Datei)");
  expect(links[4].title).contains("(XLSX-Datei)");
  expect(links[5].title).contains("(DOCX-Datei)");
  expect(links[6].title).contains("(PPTX-Datei)");
});
