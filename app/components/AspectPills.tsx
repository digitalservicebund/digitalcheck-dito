import Pills, { PillsProps } from "~/components/Pills.tsx";
import type { PrinzipAspekt } from "~/utils/strapiData.server";
import { slugify } from "~/utils/utilFunctions";

type AspectPillsProps = Omit<PillsProps, "options"> & {
  aspekte: PrinzipAspekt[];
};

export default function AspectPills({
  aspekte,
  ...props
}: Readonly<AspectPillsProps>) {
  const values = aspekte.map((aspekt) => ({
    label: aspekt.Kurzbezeichnung,
    value: slugify(aspekt.Kurzbezeichnung),
  }));
  return <Pills options={values} {...props} />;
}
