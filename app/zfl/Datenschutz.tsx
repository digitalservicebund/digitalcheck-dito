import fs from "node:fs/promises";
import { useLoaderData } from "react-router";
import ContentWrapper from "~/components/ContentWrapper.tsx";
import RichText from "~/components/RichText.tsx";
import MetaTitle from "./ZFLMeta";
import { ROUTE_ZFL_PRIVACY } from "./routes";

export async function loader() {
  return await fs.readFile("public/zfl/markdown/datenschutz.md", {
    encoding: "utf-8",
  });
}

export default function ZFLDatenschutz() {
  const loaderData = useLoaderData<typeof loader>();
  return (
    <>
      <MetaTitle prefix={ROUTE_ZFL_PRIVACY.title} />
      <ContentWrapper>
        <h1 className="mb-64">{ROUTE_ZFL_PRIVACY.title}</h1>
        <RichText className="[&_h2]:mt-40 [&_h3]:mt-20" markdown={loaderData} />
      </ContentWrapper>
    </>
  );
}
