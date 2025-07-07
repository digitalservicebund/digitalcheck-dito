import SvgSaveAsOutlined from "@digitalservicebund/icons/SaveAsOutlined";
import { Link } from "react-router";
import { ROUTE_PROTOTYPE_DOCUMENTATION_INTERMEDIATE_SAVE } from "~/resources/staticRoutes.ts";

export default function IntermediateSaveLink() {
  return (
    <Link
      to={ROUTE_PROTOTYPE_DOCUMENTATION_INTERMEDIATE_SAVE.url}
      className="ds-link-01-reg mb-24 flex items-center justify-end gap-4"
    >
      <SvgSaveAsOutlined fill={"currentColor"} height={20} />
      Zwischenstand speichern
    </Link>
  );
}
