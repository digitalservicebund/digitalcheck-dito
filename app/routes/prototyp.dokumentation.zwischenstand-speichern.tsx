import Background from "~/components/Background";
import Box from "~/components/Box.tsx";
import ButtonContainer from "~/components/ButtonContainer.tsx";
import Container from "~/components/Container";
import DetailsSummary from "~/components/DetailsSummary.tsx";
import Header from "~/components/Header";
import {
  ROUTE_PROTOTYPE_DOCUMENTATION_RESULT,
  ROUTE_PROTOTYPE_DOCUMENTATION_STATIC_JSON,
} from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";

export function meta() {
  return constructMetaTitle(ROUTE_PROTOTYPE_DOCUMENTATION_RESULT.title);
}

export default function DocumentationResult() {
  return (
    <Background backgroundColor="blue" className="py-40 print:pb-0">
      <div className="px-16">
        <Container className="rounded-t-lg py-32" backgroundColor="midBlue">
          <div className="flex flex-col gap-16 sm:flex-row">
            <Header
              heading={{
                tagName: "h1",
                look: "ds-heading-02-reg",
                markdown: "Später weiterarbeiten",
                className: "mb-0",
              }}
            />
          </div>
        </Container>
        <Container className="rounded-b-lg" backgroundColor="white">
          <Box
            heading={{
              text: "Zwischenstand speichern",
              tagName: "h2",
            }}
            content={{
              markdown:
                "Sie können die Dokumentation als Digitalcheck-Datei speichern, um sie später wieder hochzuladen und weiterzubearbeiten.",
            }}
          />
          <DetailsSummary
            className="mt-40"
            title="Welches Format hat die Datei?"
            content="Eine JSON-Datei speichert Informationen als menschen- und maschinenlesbares Textformat. So können Sie die Informationen Ihrer Dokumentation jetzt sichern, später wieder laden und weiter bearbeiten."
          />
          <ButtonContainer
            buttons={[
              {
                text: "Zwischenstand herunterladen",
                href: ROUTE_PROTOTYPE_DOCUMENTATION_STATIC_JSON.url,
              },
              {
                text: "Zurück",
                href: ROUTE_PROTOTYPE_DOCUMENTATION_RESULT.url,
                look: "tertiary",
              },
            ]}
            className="mt-40"
          />
        </Container>
      </div>
    </Background>
  );
}
