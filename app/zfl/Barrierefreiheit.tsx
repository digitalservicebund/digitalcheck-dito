import fs from "node:fs/promises";
import { useLoaderData } from "react-router";
import ContentWrapper from "~/components/ContentWrapper.tsx";
import RichText from "~/components/RichText.tsx";
import MetaTitle from "./ZFLMeta";
import { ROUTE_ZFL_A11Y } from "./routes";

export async function loader() {
  return await fs.readFile("public/zfl/markdown/barrierefreiheit.md", {
    encoding: "utf-8",
  });
}
export default function ZFLImpressum() {
  const content = useLoaderData<typeof loader>();

  return (
    <>
      <MetaTitle prefix={ROUTE_ZFL_A11Y.title} />
      <ContentWrapper>
        <RichText className="[&_h1]:mb-64 [&_h2]:mt-40" markdown={content} />
      </ContentWrapper>
    </>
  );
}
