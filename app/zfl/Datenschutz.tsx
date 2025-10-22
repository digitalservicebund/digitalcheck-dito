import Hero from "~/components/Hero";
import MetaTitle from "./ZFLMeta";
import { ROUTE_ZFL_PRIVACY } from "./routes";

export default function ZFLDatenschutz() {
  return (
    <>
      <MetaTitle prefix={ROUTE_ZFL_PRIVACY.title} />
      <Hero title={ROUTE_ZFL_PRIVACY.title} className="bg-white" />
    </>
  );
}
