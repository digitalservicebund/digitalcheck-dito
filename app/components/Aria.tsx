import { general } from "~/resources/content/shared/general";

export const A11Y_MESSAGE_NEW_WINDOW: string = "a11y-message--new-window";

export function Aria() {
  return (
    <span aria-hidden="true" className="hidden" id={A11Y_MESSAGE_NEW_WINDOW}>
      {general.a11yMessageNewWindow}
    </span>
  );
}
