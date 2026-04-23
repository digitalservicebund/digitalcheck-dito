import DokumentationIndexPage from "~/routes/dokumentation._index";
import { DocumentationDataProvider } from "~/routes/dokumentation/DocumentationDataProvider";

export function DokumentationLanding() {
  return (
    <DocumentationDataProvider>
      <DokumentationIndexPage />
    </DocumentationDataProvider>
  );
}
