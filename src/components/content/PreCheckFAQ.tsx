import AccordionItem from "@/components/AccordionItem.tsx";
import RichText from "@/components/RichText.tsx";
import { preCheck } from "@/resources/content/vorpruefung.ts";

export function PreCheckFAQ() {
  return (
    <>
      {preCheck.faq.items.map((item) => (
        <AccordionItem key={item.headline} headline={item.headline}>
          <RichText markdown={item.content} />
        </AccordionItem>
      ))}
    </>
  );
}
