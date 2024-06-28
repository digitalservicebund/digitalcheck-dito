import Container from "@digitalcheck/shared/components/Container";
import { Link, Route, Routes } from "react-router-dom";
import PageHeader from "src/components/PageHeader";
import { PATH_IMPRINT, PATH_INFO } from "src/routes";
import Imprint from "src/routes/Imprint";
import MaintenanceModePage from "src/routes/MaintenanceModePage";

function MaintenanceModeApp() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col">
        <PageHeader />
        <Routes>
          <Route path={PATH_INFO} element={<MaintenanceModePage />} />
          <Route path={PATH_IMPRINT} element={<Imprint />} />
        </Routes>
      </main>
      <footer>
        <Container paddingTop="48" paddingBottom="48">
          <Link to={PATH_IMPRINT} className="text-link increase-tap-area">
            Impressum
          </Link>
        </Container>
      </footer>
    </div>
  );
}

export default MaintenanceModeApp;
