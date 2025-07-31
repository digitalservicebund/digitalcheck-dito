import { Outlet, useLoaderData } from "react-router";
import Box from "~/components/Box";
import Container from "~/components/Container";
import SupportBanner from "~/components/SupportBanner";
import { examplesRegelungen } from "~/resources/content/beispiele-regelungen";
import { supportBanner } from "~/resources/content/shared/support-banner";
import {
  fetchStrapiData,
  GET_PRINZIPS_QUERY,
  Prinzip,
} from "~/utils/strapiData.server";

export async function loader() {
  const prinzipData = await fetchStrapiData<{ prinzips: Prinzip[] }>(
    GET_PRINZIPS_QUERY,
  );

  if ("error" in prinzipData) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response(prinzipData.error, { status: 400 });
  }

  return prinzipData.prinzips.toSorted((a, b) => a.order - b.order);
}

export default function Digitaltauglichkeit() {
  return (
    <>
      <Outlet context={useLoaderData<typeof loader>()} />
      <Container className="bg-ds-yellow mt-40 mb-80" overhangingBackground>
        <Box
          heading={{
            text: examplesRegelungen.yourExample.title,
            tagName: "h2",
          }}
          content={{ markdown: examplesRegelungen.yourExample.text }}
        />
      </Container>
      <SupportBanner {...supportBanner} />
    </>
  );
}
