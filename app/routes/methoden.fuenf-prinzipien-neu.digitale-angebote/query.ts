export const PRINZIP_ASPEKTE_QUERY = `
query Prinzip($URLBezeichnung: String!, $status: PublicationStatus!) {
  prinzips(status: $status, filters: { URLBezeichnung: { eq: $URLBezeichnung } }) {
    documentId
    Name
    Beschreibung
    order
    Nummer
    URLBezeichnung
    Beispiel {
      documentId
      Nummer
      Text
      Paragraph {
        Nummer
        Gesetz
        Titel
        Beispielvorhaben {
          URLBezeichnung
          Titel
        }
      }
      PrinzipErfuellungen {
        id
        Erklaerung
        Prinzip {
          Nummer
          Name
        }
      }
    }
    Aspekte {
      Nummer
      Titel
      Kurzbezeichnung
      Beschreibung
      Text
      Leitfragen
      Formulierungsbeispiel
      Anwendung {
        Titel
        Erklaerung
        Formulierungsbeispiel
        Beispiel {
          documentId
          Nummer
          Text
          Auszug
          Paragraph {
            Nummer
            Gesetz
            Titel
          }
        }
      }
      Beispiel {
        documentId
        Nummer
        Text
        Paragraph {
          Nummer
          Gesetz
          Titel
          Beispielvorhaben {
            URLBezeichnung
            Titel
          }
        }
      }
    }
  }
}`;
