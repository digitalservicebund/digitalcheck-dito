import { header } from "~/resources/content/components/header.ts";

const DropdownSupportItem = ({ mobile }: { mobile: boolean }) => {
  return (
    <div className="px-16 lg:px-56">
      <div className="ds-label-02-reg px-16 pt-16 pb-24 text-gray-900">
        {mobile ? header.contact.msgMobile : header.contact.msg}
        <a
          href={`tel:${header.contact.number}`}
          className="plausible-event-name=Phone+Click plausible-event-position=header ds-link-02-reg ml-8"
        >
          {header.contact.number}
        </a>
      </div>
      <div className="border-b-1 border-gray-900" />
    </div>
  );
};

export default DropdownSupportItem;
