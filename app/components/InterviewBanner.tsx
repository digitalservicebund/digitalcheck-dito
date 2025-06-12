import { interviewBanner } from "~/resources/content/components/interview-banner";
import HighlightBox from "./HighlightBox";

export default function InterviewBanner() {
  return (
    <HighlightBox
      items={[
        {
          headline: { tagName: "h2", text: interviewBanner.title },
          content: interviewBanner.text,
        },
      ]}
    />
  );
}
