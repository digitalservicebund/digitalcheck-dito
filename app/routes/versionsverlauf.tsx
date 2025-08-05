import Container from "~/components/Container";
import Hero from "~/components/Hero";
import { BulletList } from "~/components/List";
import { ListItemProps } from "~/components/ListItem";
import { versionHistory } from "~/resources/content/versionsverlauf";
import { ROUTE_VERSION_HISTORY } from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";

export function meta() {
  return constructMetaTitle(ROUTE_VERSION_HISTORY.title);
}

export default function VersionHistory() {
  const historyItems: ListItemProps[] = versionHistory.items.map((item) => ({
    ...item,
    hasBullet: true,
  }));

  return (
    <>
      <Hero title={versionHistory.title} subtitle={versionHistory.subtitle} />

      <Container>
        <BulletList items={historyItems} />
      </Container>
    </>
  );
}
