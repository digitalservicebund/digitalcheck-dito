import { type PrincipleNumber } from "~/resources/constants";
import { type Node } from "~/utils/paragraphUtils";

export type EinschaetzungReferat =
  | "Ja"
  | "Nein"
  | "Teilweise"
  | "Nicht relevant";

export type Ressort =
  | "AA"
  | "BMAS"
  | "BMBF"
  | "BMDV"
  | "BMEL"
  | "BMF"
  | "BMFSFJ"
  | "BMG"
  | "BMI"
  | "BMJ"
  | "BMUV"
  | "BMVg"
  | "BMWK"
  | "BMWSB"
  | "BMZ";

export type Rechtsgebiet = "TBD";

export type GesetzStatus =
  | "Verkuendetes_Gesetz_aktuelle_Fassung"
  | "Regelungsentwurf"
  | "Text_im_Parlament";

export type PrinzipErfuellung = {
  id: number;
  Erklaerung: Node[];
  Prinzip?: BasePrinzip;
};

export type BaseAbsatz = {
  documentId: string;
  Nummer: number;
  Text: Node[];
  Auszug?: Node[];
  PrinzipErfuellungen?: PrinzipErfuellung[];
};

export type AbsatzWithParagraph = BaseAbsatz & {
  Paragraph: {
    Nummer: number;
    Gesetz: string;
    Titel: string;
    Beispielvorhaben: {
      URLBezeichnung: string;
      Titel: string;
    };
  };
};

export type PrinzipAspekt = {
  Titel: string;
  Kurzbezeichnung: string;
  Beschreibung: string;
  Nummer: string;
  Text?: Node[];
  Leitfragen?: Node[];
  Formulierungsbeispiel?: Node[];
  Beispiel?: AbsatzWithParagraph;
  Anwendung: PrinzipAnwendung[];
};

export type PrinzipAnwendung = {
  Titel: string;
  Erklaerung: Node[];
  Formulierungsbeispiel: Node[];
  Beispiel?: AbsatzWithParagraph;
};

export type Paragraph = {
  documentId: string;
  Nummer: string;
  Gesetz: string;
  Titel?: string;
  Artikel?: string;
  Beispielvorhaben?: Beispielvorhaben;
  Absaetze: BaseAbsatz[];
};

export type BasePrinzip = {
  documentId: string;
  Name: string;
  Kurzbezeichnung: string;
  Beschreibung: Node[];
  Kurzbeschreibung?: Node[];
  Hilfetext?: Node[];
  Erklaerungshilfe?: Node[];
  /**
   * Not the actual number visible to users.
   * Legacy ID used to associate Absatz fragments with principles.
   */
  Nummer: PrincipleNumber;
  /**
   * Actual visible number, re-introduced in January 2026
   */
  order: number;
  URLBezeichnung: string;
};

export type PrinzipWithAspekte = BasePrinzip & {
  Beispiel?: AbsatzWithParagraph;
  Aspekte: PrinzipAspekt[];
};

export type PrinzipWithAspekteAndExample = PrinzipWithAspekte & {
  Beispiel: AbsatzWithParagraph;
};

export type PrinzipWithBeispielvorhaben = BasePrinzip & {
  Beispielvorhaben: Beispielvorhaben[];
};

export type Visualisierung = {
  documentId: string;
  Titel: string;
  Visualisierungsart?: string;
  Visualisierungstool?: string;
  Aufwand?: string;
  Ressort?: string;
  Beschreibung: Node[];
  Bild: {
    documentId: string;
    url: string;
    alternativeText: string;
  };
  Beispielvorhaben: Beispielvorhaben;
};

export type Digitalcheck = {
  documentId: string;
  Titel: string;
  NKRStellungnahmeDCText?: Node[];
  EinschaetzungKommunikation: EinschaetzungReferat;
  EinschaetzungWiederverwendung: EinschaetzungReferat;
  EinschaetzungDatenschutz: EinschaetzungReferat;
  EinschaetzungKlareRegelungen: EinschaetzungReferat;
  EinschaetzungAutomatisierung: EinschaetzungReferat;
  Beispielvorhaben?: Beispielvorhaben;
};

export type Beispielvorhaben = {
  documentId: string;
  Titel: string;
  Ressort: Ressort;
  NKRStellungnahmeLink?: string;
  DIPVorgang: number;
  NKRNummer: number;
  URLBezeichnung: string;
  Rechtsgebiet?: Rechtsgebiet;
  VeroeffentlichungsDatum?: string;
  Paragraphen: Paragraph[];
  Visualisierungen: Visualisierung[];
  Digitalchecks: Digitalcheck[];
  LinkRegelungstext: string;
  GesetzStatus?: GesetzStatus;
};
