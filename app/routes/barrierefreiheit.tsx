import fs from "node:fs/promises";
import { useLoaderData } from "react-router";
import ContentWrapper from "~/components/ContentWrapper.tsx";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import { ROUTE_A11Y } from "~/resources/staticRoutes";

export async function loader() {
  return await fs.readFile("public/markdown/barrierefreiheit.md", {
    encoding: "utf-8",
  });
}

export default function Accessibility() {
  const content = useLoaderData<typeof loader>();
  return (
    <>
      <MetaTitle prefix={ROUTE_A11Y.title} />

      <ContentWrapper>
        <RichText
          markdown={content}
          className="ds-stack-16 [&>h2]:mt-40 [&>h3]:mt-32"
          tagName="main"
        />
      </ContentWrapper>
    </>
  );
}
