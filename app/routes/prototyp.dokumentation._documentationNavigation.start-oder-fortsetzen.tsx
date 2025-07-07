import React from "react";
import { useNavigate } from "react-router";
import ButtonContainer from "~/components/ButtonContainer";
import Container from "~/components/Container";
import Heading from "~/components/Heading";
import RichText from "~/components/RichText";
import { general } from "~/resources/content/shared/general";
import { prototypeDocumentation } from "~/resources/prototyp-dokumentation";
import {
  ROUTE_PROTOTYPE_DOCUMENTATION,
  ROUTE_PROTOTYPE_DOCUMENTATION_META,
  ROUTE_PROTOTYPE_DOCUMENTATION_START_RESUME,
} from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";

const { title, subtitle, startNewButtonText } =
  prototypeDocumentation.startOrResume;

export function meta() {
  return constructMetaTitle(ROUTE_PROTOTYPE_DOCUMENTATION_START_RESUME.title);
}

export default function PrototypeDocumentationMeta() {
  const navigate = useNavigate();
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await navigate(ROUTE_PROTOTYPE_DOCUMENTATION_META.url, {
        state: "fileUpload",
      });
    }
  };
  return (
    <Container className="pt-0">
      <Heading
        text={title}
        tagName="h1"
        look="ds-heading-02-reg"
        className="mb-16"
      />
      <RichText markdown={subtitle} className="mb-40" />

      <label className="ds-label-01-reg mb-40 block w-full cursor-pointer border-2 border-dashed border-blue-800 bg-white p-40 text-blue-800 focus-within:border-solid focus-within:outline-3 focus-within:outline-blue-800">
        <input
          type="file"
          accept="application/json"
          className="w-0 opacity-0"
          onChange={onFileChange}
        />
        Klicken Sie oder ziehen Sie eine Datei hierhin, um fortzufahren
      </label>

      <ButtonContainer
        buttons={[
          {
            text: startNewButtonText,
            href: ROUTE_PROTOTYPE_DOCUMENTATION_META.url,
          },
          {
            text: general.buttonBack.text,
            href: ROUTE_PROTOTYPE_DOCUMENTATION.url,
            look: "tertiary",
          },
        ]}
      />
    </Container>
  );
}
