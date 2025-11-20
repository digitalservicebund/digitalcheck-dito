import { Outlet } from "react-router";

export const handle = {
  hasProgressBar: true, // enable progress bar for all child routes
};

export default function Methods() {
  return <Outlet />;
}
