import { FileDownloadOutlined } from "@digitalservicebund/icons";
import { useNavigate } from "react-router";
import ButtonContainer from "~/components/ButtonContainer.tsx";
import Container from "~/components/Container";
import DetailsSummary from "~/components/DetailsSummary.tsx";
import Header from "~/components/Header";
import InfoBox from "~/components/InfoBox.tsx";
import { features } from "~/resources/features";
import {
  ROUTE_DOCUMENTATION_STATIC_PDF,
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
    <div className="bg-blue-100 py-40 print:pb-0">
      <div className="px-16">
        <Container className="rounded-t-lg bg-blue-300 py-32">
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
        <Container className="rounded-b-lg bg-white">
          <InfoBox
            content={
              prototypeAlternativeEnabled
                ? "Sie können die Dokumentation als auslesbare PDF-Datei speichern, um sie später wieder hochzuladen und weiter zu bearbeiten."
                : "Sie können die Dokumentation als JSON-Datei speichern, um sie später wieder hochzuladen und weiterzubearbeiten."
            }
          />
          <DetailsSummary
            className="mt-40"
            title={
              prototypeAlternativeEnabled
                ? "Was ist eine auslesbare PDF-Datei?"
                : "Was ist eine JSON-Datei?"
            }
            content={
              prototypeAlternativeEnabled
                ? "Diese PDF-Datei beinhaltet die Informationen sowohl als menschen- wie auch maschinenlesbares Textformat. So können Sie Ihre Dokumentation jederzeit speichern, und später wieder hochladen um weiter daran zu arbeiten."
                : "Eine JSON-Datei speichert Informationen als menschen- und maschinenlesbares Textformat. So können Sie die Informationen Ihrer Dokumentation jetzt sichern, später wieder laden und weiter bearbeiten."
            }
          />
          <ButtonContainer
            buttons={[
              {
                text: prototypeAlternativeEnabled
                  ? "PDF-Dokumentation herunterladen"
                  : "Zwischenstand herunterladen",
                href: prototypeAlternativeEnabled
                  ? ROUTE_DOCUMENTATION_STATIC_PDF.url
                  : ROUTE_PROTOTYPE_DOCUMENTATION_STATIC_JSON.url,
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
    </div>
  );
}
