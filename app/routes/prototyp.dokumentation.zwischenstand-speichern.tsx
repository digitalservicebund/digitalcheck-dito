import { FileDownloadOutlined } from "@digitalservicebund/icons";
import { useNavigate } from "react-router";
import Background from "~/components/Background";
import Box from "~/components/Box.tsx";
import ButtonContainer from "~/components/ButtonContainer.tsx";
import Container from "~/components/Container";
import DetailsSummary from "~/components/DetailsSummary.tsx";
import Header from "~/components/Header";
import { features } from "~/resources/features";
import {
  ROUTE_PROTOTYPE_DOCUMENTATION_RESULT,
  ROUTE_PROTOTYPE_DOCUMENTATION_STATIC_JSON,
} from "~/resources/staticRoutes";
import useFeatureFlag from "~/utils/featureFlags";
import constructMetaTitle from "~/utils/metaTitle";

export function meta() {
  return constructMetaTitle(ROUTE_PROTOTYPE_DOCUMENTATION_RESULT.title);
}

export default function DocumentationResult() {
  const navigate = useNavigate();
  const goBack = () => {
    Promise.resolve(navigate(-1)).catch(console.error);
  };

  const prototypeAlternativeEnabled = useFeatureFlag(
    features.enableDocumentationPrototypeAlternative,
  );

  return (
    <Background backgroundColor="blue" className="py-40 print:pb-0">
      <div className="px-16">
        <Container className="rounded-t-lg py-32" backgroundColor="midBlue">
          <div className="flex flex-col gap-16 sm:flex-row">
            <FileDownloadOutlined className="size-36" />
            <Header
              heading={{
                tagName: "h1",
                look: "ds-heading-02-reg",
                markdown: "Zwischenstand speichern",
                className: "mb-0",
              }}
            />
          </div>
        </Container>
        <Container className="rounded-b-lg" backgroundColor="white">
          <Box
            content={{
              markdown: prototypeAlternativeEnabled
                ? "Sie können die Dokumentation als PDF-Datei speichern, um sie später wieder hochzuladen und weiterzubearbeiten."
                : "Sie können die Dokumentation als JSON-Datei speichern, um sie später wieder hochzuladen und weiterzubearbeiten.",
            }}
          />
          <DetailsSummary
            className="mt-40"
            title="Was ist eine JSON-Datei?"
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
                look: "tertiary",
                onClick: goBack,
              },
            ]}
            className="mt-40"
          />
        </Container>
      </div>
    </Background>
  );
}
