import { features } from "~/resources/features";
import useFeatureFlag from "~/utils/featureFlags";
import constructMetaTitle from "~/utils/metaTitle";

export function meta() {
  return constructMetaTitle("Throw Error");
}

export default function ThrowError() {
  const enableThrowErrorRoute = useFeatureFlag(features.enableThrowErrorRoute);

  if (!enableThrowErrorRoute) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("Feature is not enabled for this environment", {
      status: 404,
    });
  }

  throw new Error("Test error.");
  return <></>;
}
