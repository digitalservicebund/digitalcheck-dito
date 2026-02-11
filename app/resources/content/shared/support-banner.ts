import { contact } from "./contact";

export const supportBanner = {
  title: "Sie haben Gesprächsbedarf zu Ihrem Vorhaben?",
  text: `Bei inhaltlichen Anliegen zu Ihrem Regelungsvorhaben oder Fragen helfen wir Ihnen gerne weiter. Schreiben Sie uns über ${contact.mdMailToLink(contact.email, "Gesprächsbedarf: digitalcheck.bund.de")} oder rufen Sie uns an unter ${contact.mdPhoneLink()}.`,
};
