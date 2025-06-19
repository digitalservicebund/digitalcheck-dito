import Background from "~/components/Background";
import Container from "~/components/Container";
import Heading from "~/components/Heading";
import InfoBox from "~/components/InfoBox";
import InfoBoxList from "~/components/InfoBoxList";
import LinkList from "~/components/LinkList";
import RichText from "~/components/RichText";
import { hinweis } from "~/resources/content/hinweis";

export default function Index() {
  return (
    <Background backgroundColor="blue" className="parent-bg-blue">
      <Container>
        <InfoBoxList
          heading={
            <Heading className="ds-heading-02-reg">{hinweis.title}</Heading>
          }
        >
          {hinweis.items.map((item, i) => (
            <InfoBox key={item.heading?.text ?? i}>
              {item.heading && (
                <Heading tagName="h2" className="ds-heading-03-reg">
                  {item.heading.text}
                </Heading>
              )}
              {item.content && <RichText>{item.content}</RichText>}
              {item.linkList && <LinkList links={item.linkList} />}
            </InfoBox>
          ))}
        </InfoBoxList>
      </Container>
    </Background>
  );
}
