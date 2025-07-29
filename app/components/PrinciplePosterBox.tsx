import Container from "./Container";
import InfoBox from "./InfoBox";

export function PrinciplePosterBox() {
  return (
    <Container>
      <InfoBox
        look="highlight"
        visual={{
          type: "image",
          image: {
            url: "/images/Poster_5Prinzipien.jpg",
            alternativeText: "Poster der 5 Prinzipien",
            size: "large",
          },
        }}
        badge={{
          text: "Download",
        }}
        identifier="principle-poster-box"
        heading={{
          tagName: "h2",
          text: "Die Prinzipien als Poster",
        }}
        content={
          "Drucken Sie sich das Poster in A4 oder A3 aus, um die Prinzipien für digitaltaugliche Gesetzgebung immer im Blick zu haben."
        }
        linkList={{
          links: [
            {
              title: "Download",
              url: "/assets/pdf/Prinzipien-Poster.pdf",
              download: true,
            },
          ],
        }}
      />
    </Container>
  );
}
