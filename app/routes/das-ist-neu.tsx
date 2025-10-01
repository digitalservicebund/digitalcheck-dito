import Container from "~/components/Container";
import Hero from "~/components/Hero";
import MetaTitle from "~/components/Meta";
import Timeline, { TimelineItemContentProps } from "~/components/Timeline.tsx";
import { news } from "~/resources/content/das-ist-neu";
import { ROUTE_VERSION_HISTORY } from "~/resources/staticRoutes";

export default function VersionHistory() {
  const historyItems: (TimelineItemContentProps & { key: number })[] =
    news.items.map((item, index) => ({
      ...item,
      hasBullet: true,
      key: index,
      badge: {
        children: item.badge.text,
      },
    }));

  return (
    <>
      <MetaTitle prefix={ROUTE_VERSION_HISTORY.title} />
      <Hero title={news.title} subtitle={news.subtitle} />

      <Container>
        <Timeline>
          {historyItems.map(({ key, ...item }) => (
            <Timeline.Item bullet key={key}>
              <Timeline.ItemContent {...item} />
            </Timeline.Item>
          ))}
        </Timeline>
      </Container>
    </>
  );
}
