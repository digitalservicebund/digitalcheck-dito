import AccordionItem, { AccordionItemProps } from "./AccordionItem";

export default function Accordion({
  items,
}: Readonly<{ items: AccordionItemProps[] }>) {
  return (
    <div className="border-b-ds-dark-blue border-b-2 bg-white">
      {items.map((item) => (
        <AccordionItem
          key={item.headline}
          headline={item.headline}
          content={item.content}
          id={item.id}
          plausibleEventName={item.plausibleEventName}
        />
      ))}
    </div>
  );
}
