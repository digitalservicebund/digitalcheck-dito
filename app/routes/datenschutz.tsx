import fs from "node:fs/promises";
import { useLoaderData } from "react-router";
import ContentWrapper from "~/components/ContentWrapper.tsx";
import Hero from "~/components/Hero";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import { ROUTE_PRIVACY } from "~/resources/staticRoutes";

export async function loader() {
  return await fs.readFile("public/markdown/datenschutz.md", {
    encoding: "utf-8",
  });
}

export default function Index() {
  const content = useLoaderData<typeof loader>();

  return (
    <>
      <MetaTitle prefix={ROUTE_PRIVACY.title} />
      <main>
        <Hero title="Datenschutzerklärung" />
        <ContentWrapper>
          <RichText
            markdown={content}
            className="ds-stack-16 [&>h2]:mt-40 [&>h3]:mt-32"
          />
        </ContentWrapper>
      </main>
    </>
  );
}
