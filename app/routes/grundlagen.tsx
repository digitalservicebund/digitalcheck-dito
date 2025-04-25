import { Outlet, useOutletContext } from "react-router";

export default function Fundamentals() {
  return <Outlet context={useOutletContext()} />;
}
