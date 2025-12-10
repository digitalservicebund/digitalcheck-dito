import { Outlet, useOutletContext, useParams } from "react-router";
import MetaTitle from "~/components/Meta";
import { PrinzipWithAspekteAndExample } from "~/utils/strapiData.server";
import { NavigationContext } from "./dokumentation._documentationNavigation";

export type NavigationContextWithPrinciple = NavigationContext & {
  prinzip: PrinzipWithAspekteAndExample;
};

export default function NewDocumentationPrinciple() {
  const { principleId } = useParams();
  const navContext = useOutletContext<NavigationContext>();

  const prinzip = navContext.prinzips.find(
    ({ URLBezeichnung }) => URLBezeichnung === principleId,
  );

  if (!prinzip)
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("No Prinzip for slug found", { status: 404 });

  return (
    <>
      <MetaTitle prefix={prinzip.Name} />
      <Outlet context={{ ...navContext, prinzip }} />
    </>
  );
}
