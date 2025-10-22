import Hero from "~/components/Hero";
import MetaTitle from "./ZFLMeta";
import { ROUTE_ZFL_IMPRINT } from "./routes";

export default function ZFLImpressum() {
  return (
    <>
      <MetaTitle prefix={ROUTE_ZFL_IMPRINT.title} />
      <Hero title={ROUTE_ZFL_IMPRINT.title} className="bg-white" />
    </>
  );
}
