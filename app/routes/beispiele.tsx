import { Outlet, useLoaderData } from "react-router";
import Container from "~/components/Container";
import InfoBox from "~/components/InfoBox.tsx";
import RichText from "~/components/RichText.tsx";
import SupportBanner from "~/components/SupportBanner";
import { examplesRegelungen } from "~/resources/content/beispiele-regelungen";
import { supportBanner } from "~/resources/content/shared/support-banner";
import {
  fetchStrapiData,
  GET_PRINZIPS_QUERY,
  PrinzipWithBeispielvorhaben,
} from "~/utils/strapiData.server";

export async function loader() {
  const prinzipData = await fetchStrapiData<{
    prinzips: PrinzipWithBeispielvorhaben[];
  }>(GET_PRINZIPS_QUERY);

  if ("error" in prinzipData) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response(prinzipData.error, { status: 400 });
  }

  return prinzipData.prinzips.toSorted((a, b) => a.order - b.order);
}

export default function Digitaltauglichkeit() {
  return (
    <>
      <main>
        <Outlet context={useLoaderData<typeof loader>()} />
        <aside>
          <Container className="mt-80 mb-80 bg-blue-100" overhangingBackground>
            <InfoBox
              heading={{
                text: examplesRegelungen.yourExample.title,
                tagName: "h2",
              }}
            >
              <RichText markdown={examplesRegelungen.yourExample.text} />
            </InfoBox>
          </Container>
        </aside>
      </main>
      <SupportBanner {...supportBanner} />
    </>
  );
}
