import { Outlet } from "react-router";
import { DocumentationDataProvider } from "./DocumentationDataProvider";

export default function Documentation() {
  return (
    <DocumentationDataProvider>
      <Outlet />
    </DocumentationDataProvider>
  );
}
