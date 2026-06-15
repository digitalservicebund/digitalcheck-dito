import { contact } from "./shared/contact";

export const genericError = {
  title: "Ein Fehler ist aufgetreten",
  message: `Es tut uns leid, aber etwas ist schief gelaufen.

Folgendes könnte helfen:
- Laden Sie die Seite neu.
- Kehren Sie zur Startseite zurück.
- Versuchen Sie es später erneut.

Falls das Problem weiterhin besteht, kontaktieren Sie uns unter ${contact.mdMailToLink(contact.email)} oder ${contact.mdPhoneLink()}.`,
};
