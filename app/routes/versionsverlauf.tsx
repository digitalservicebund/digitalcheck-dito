import Container from "~/components/Container";
import Hero from "~/components/Hero";
import Timeline, { TimelineItemContentProps } from "~/components/Timeline.tsx";
import { versionHistory } from "~/resources/content/versionsverlauf";
import { ROUTE_VERSION_HISTORY } from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";

export function meta() {
  return constructMetaTitle(ROUTE_VERSION_HISTORY.title);
}

export default function VersionHistory() {
  const historyItems: (TimelineItemContentProps & { key: number })[] =
    versionHistory.items.map((item, index) => ({
      ...item,
      hasBullet: true,
      key: index,
      badge: {
        children: item.badge.text,
      },
    }));

  return (
    <>
      <Hero title={versionHistory.title} subtitle={versionHistory.subtitle} />

      <Container>
        <Timeline>
          {historyItems.map((item) => (
            <Timeline.Item bullet key={item.key}>
              <Timeline.ItemContent {...item} />
            </Timeline.Item>
          ))}
        </Timeline>
      </Container>
    </>
  );
}
