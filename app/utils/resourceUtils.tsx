import Button, {
  type ButtonLinkProps,
  type ButtonProps,
} from "~/components/Button";
import ButtonContainer from "~/components/ButtonContainer.tsx";

export function renderButtonContainer(
  buttons: (ButtonLinkProps | ButtonProps)[],
  options: { className?: string } = {},
) {
  return (
    <ButtonContainer className={options.className}>
      {buttons.map((button) => (
        <Button key={button.text ?? button.href} {...button} />
      ))}
    </ButtonContainer>
  );
}
