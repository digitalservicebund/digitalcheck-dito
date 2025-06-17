import Container from "~/components/Container";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import InfoBoxList from "~/components/InfoBoxList";
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
        <InfoBoxList separator>
          <Heading tagName="h2">{fundamentalsMethods.roadmap.title}</Heading>
          <InfoBoxList.List>
            {fundamentalsMethods.roadmap.items.map((item) => (
              <InfoBoxList.Item key={item.heading.text} {...item} />
            ))}
          </InfoBoxList.List>
        </InfoBoxList>
      </Container>

      <Container>
        <BulletList className="mb-40" items={methodStepsItems(false)} />
      </Container>
      <SupportBanner {...supportBanner} />
    </>
  );
}
