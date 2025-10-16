import { useLoaderData, useOutletContext } from "react-router";
import Button from "~/components/Button";
import Heading from "~/components/Heading";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { ROUTE_DOCUMENTATION_SEND } from "~/resources/staticRoutes";
import downloadWord from "~/utils/documentationCreationService/documentCreation";
import {
  fetchStrapiData,
  GET_PRINZIPS_WITH_ASPECTS_QUERY,
  type PrinzipWithAspekte,
} from "~/utils/strapiData.server";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";

const { send } = digitalDocumentation;

export async function loader() {
  const principles = await fetchStrapiData<{
    prinzips: PrinzipWithAspekte[];
  }>(GET_PRINZIPS_WITH_ASPECTS_QUERY);

  if ("error" in principles) {
    console.error("Failed to fetch principles:", principles.error);
    throw new Error("Failed to fetch principles from Strapi");
  }

  return {
    principles: principles.prinzips,
  };
}

export default function DocumentationSend() {
  const { previousUrl } = useOutletContext<NavigationContext>();
  const { principles } = useLoaderData<typeof loader>();
  return (
    <>
      <MetaTitle prefix={ROUTE_DOCUMENTATION_SEND.title} />
      <Heading
        text={send.headline}
        tagName="h1"
        look="ds-heading-02-reg"
        className="mb-16"
      />
      <RichText markdown={send.text} className="mb-40" />

      <Button onClick={() => downloadWord(principles)}>
        Dokumentation herunterladen
      </Button>

      <DocumentationActions previousUrl={previousUrl} />
    </>
  );
}
