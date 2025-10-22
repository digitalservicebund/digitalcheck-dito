import Hero from "~/components/Hero";
import MetaTitle from "./ZFLMeta";
import { ROUTE_ZFL_A11Y } from "./routes";

export default function ZFLImpressum() {
  return (
    <>
      <MetaTitle prefix={ROUTE_ZFL_A11Y.title} />
      <Hero title={ROUTE_ZFL_A11Y.title} className="bg-white" />
    </>
  );
}
