import Container from "~/components/Container";
import Hero from "~/components/Hero";
import InfoBoxList from "~/components/InfoBoxList.tsx";
import { BulletList } from "~/components/List.tsx";
import SupportBanner from "~/components/SupportBanner";
import { fundamentalsMethods } from "~/resources/content/grundlage-methoden.ts";
import { supportBanner } from "~/resources/content/shared/support-banner";
import { ROUTE_FUNDAMENTALS_METHODS } from "~/resources/staticRoutes";
import { methodStepsItems } from "~/utils/listProcessing.ts";
import constructMetaTitle from "~/utils/metaTitle";

export function meta() {
  return constructMetaTitle(ROUTE_FUNDAMENTALS_METHODS.title);
}

export default function FundamentalsMethods() {
  return (
    <>
      <Hero
        title={fundamentalsMethods.title}
        subtitle={fundamentalsMethods.subtitle}
      />

      <Container>
        <InfoBoxList
          heading={{ text: fundamentalsMethods.roadmap.title }}
          items={fundamentalsMethods.roadmap.items}
        />
      </Container>
      <Container>
        <BulletList className="mb-40" items={methodStepsItems(false)} />
      </Container>
      <SupportBanner {...supportBanner} />
    </>
  );
}
