export const PRE_CHECK_START_BUTTON_ID = "preCheck-start-button";
export const A11Y_MESSAGE_NEW_WINDOW = "a11y-message--new-window";

export const PRINCIPLE_COLORS = {
  1: { background: "bg-principle-1", border: "border-principle-1" },
  2: { background: "bg-principle-2", border: "border-principle-2" },
  3: { background: "bg-principle-3", border: "border-principle-3" },
  4: { background: "bg-principle-4", border: "border-principle-4" },
  5: { background: "bg-principle-5", border: "border-principle-5" },
  6: { background: "bg-principle-6", border: "border-principle-6" },
} as const;

export type PrincipleNumber = keyof typeof PRINCIPLE_COLORS;

export const STRAPI_MEDIA_URL =
  import.meta.env.VITE_STRAPI_MEDIA_URL ||
  "https://secure-dinosaurs-1a634d1a3d.media.strapiapp.com";
