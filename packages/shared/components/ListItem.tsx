import { type BackgroundColor } from "components";
import Background from "./Background";
import Button, { type ButtonProps } from "./Button";
import ButtonContainer from "./ButtonContainer";
import Heading, { type HeadingProps } from "./Heading";
import Image, { type ImageProps } from "./Image";
import RichText from "./RichText";

export type ListItemProps = {
  identifier?: string;
  label?: HeadingProps;
  headline?: HeadingProps;
  spacer?: boolean | HeadingProps;
  image?: ImageProps;
  content?: string;
  buttons?: ButtonProps[];
  background?: BackgroundColor;
};

const ListItem = ({
  identifier,
  label,
  headline,
  spacer,
  image,
  content,
  buttons,
  numeric,
  background,
}: ListItemProps & { readonly numeric?: number }) => {
  return (
    <div id={identifier} className="flex flex-row items-center justify-center">
      {image && (
        <Image
          {...image}
          {...{
            className:
              "max-[499px]:mb-16 max-[499px]:w-[144px] max-[499px]:h-[144px] h-[168px] w-[168px]" +
              " self-baseline",
          }}
        />
      )}
      <div
        className={`break-words ds-stack-16 w-full ${image ? "min-[500px]:ml-16" : ""}`}
      >
        {spacer && (
          <div className={`${numeric && "border-t-2 pb-16"}`}>
            {spacer !== true && (
              <div
                className={`flex flex-row gap-16 items-center ${numeric && "mt-32"}`}
              >
                <span className="display-block w-[40px]" />
                <Heading
                  tagName="h4"
                  className="ds-label-section text-gray-900"
                  {...spacer}
                />
              </div>
            )}
          </div>
        )}
        <div className="flex flex-row gap-16 items-start col">
          <div className="w-[40px]">
            {numeric && (
              <div className="min-w-[40px] w-[40px] h-[40px] flex justify-center items-center border-2 border-solid border-gray-400 rounded-full">
                {numeric}
              </div>
            )}
            {background && (
              <div className="min-w-[20px] w-[20px] h-[20px] flex justify-center items-center bg-blue-900 rounded-full"></div>
            )}
          </div>
          <div className={background && "overflow-hidden rounded-lg"}>
            <Background backgroundColor={background || "white"}>
              <div className={background && "p-64"}>
                <div className="flex flex-row gap-16 items-center">
                  {label && <Heading {...label} />}
                  {headline && <Heading tagName="h3" {...headline} />}
                </div>
                {content && <RichText markdown={content} />}
                {buttons && buttons.length > 0 && (
                  <ButtonContainer className="mt-16">
                    {buttons.map((button) => (
                      <Button key={button.text ?? button.href} {...button} />
                    ))}
                  </ButtonContainer>
                )}
              </div>
            </Background>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
