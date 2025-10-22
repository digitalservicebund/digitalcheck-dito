import { Outlet } from "react-router";
import Footer from "./components/Footer";
import PageHeader from "./components/PageHeader";

export default function ZFLLayout() {
  return (
    <>
      <PageHeader />
      <Outlet />
      <Footer />
    </>
  );
}
