import { ArrowForward, CheckCircleRounded } from "@digitalservicebund/icons";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router";
import Heading from "~/components/Heading";
import MetaTitle from "~/components/Meta";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { ROUTE_DOCUMENTATION } from "~/resources/staticRoutes";
import { NavigationContextWithPrinciple } from "./dokumentation._documentationNavigation.neu.$principleId";
import DocumentationActions from "./dokumentation/DocumentationActions";
import { useDocumentationData } from "./dokumentation/documentationDataHook";
import { addOrUpdatePrinciple } from "./dokumentation/documentationDataService";

const { principlePages } = digitalDocumentation;

export default function NewDocumentationPrinciple() {
  const { nextUrl, previousUrl, prinzip, currentUrl } =
    useOutletContext<NavigationContextWithPrinciple>();
  const { documentationData } = useDocumentationData();

  const navigate = useNavigate();

  const principleData = documentationData?.principles?.find(
    (principle) => principle.id === prinzip.documentId,
  );

  const answer = principleData?.answer;

  const nextLinkMap = {
    [principlePages.radioOptions[0]]: {
      url: "schwerpunkte",
      description:
        "Erläutern Sie, wie Sie die Schwerpunkte des Prinzips erfüllt haben",
    },
    [principlePages.radioOptions[1]]: {
      url: "nein",
      description: "Erläutern Sie, wieso Sie das Prinzip nicht erfüllen",
    },
    [principlePages.radioOptions[2]]: {
      url: "nicht-relevant",
      description: "Weiter zum nächsten Prinzip",
    },
  };

  useEffect(() => {
    if (!principleData?.answer) return;

    const wantedUrl = `${ROUTE_DOCUMENTATION.url}/neu/${prinzip.URLBezeichnung}/${nextLinkMap[principleData.answer].url}`;

    if (currentUrl !== wantedUrl) void navigate(wantedUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [principleData, currentUrl, navigate]);

  const handleAnswerClick = async (answer: string) => {
    const url = nextLinkMap[answer].url ?? nextUrl;

    const basePrincipleData = {
      id: prinzip.documentId,
      reasoning: undefined,
      answer: "",
    };

    const update = principleData?.answer !== answer;

    const updatedPrinciple = { ...basePrincipleData, answer };
    if (update) addOrUpdatePrinciple(updatedPrinciple);

    await navigate(url);
  };

  return (
    <>
      <MetaTitle prefix={prinzip.Name} />
      <div className="space-y-40">
        <Heading tagName="h2" look="ds-heading-03-reg">
          {principlePages.question}
        </Heading>

        <ul className="list-unstyled max-w-a11y space-y-40">
          {principlePages.radioOptions.map((option) => (
            <li key={option}>
              <button
                onClick={() => handleAnswerClick(option)}
                className="max-w-a11y grid w-full grid-flow-col grid-cols-[auto_1fr_auto] grid-rows-2 items-center gap-x-16 rounded border border-blue-400 bg-blue-200 p-16 text-left"
              >
                <span className="row-span-2">
                  {option === answer && (
                    <CheckCircleRounded className="fill-ds-green-700 size-36" />
                  )}
                </span>
                <span>
                  <strong>{option}</strong>
                </span>
                <span>{nextLinkMap[option].description}</span>
                <ArrowForward className="row-span-2 size-36 fill-blue-800" />
              </button>
            </li>
          ))}
        </ul>

        <DocumentationActions
          previousUrl={previousUrl}
          nextUrl={nextUrl}
          showDownloadDraftButton
        />
      </div>
    </>
  );
}
