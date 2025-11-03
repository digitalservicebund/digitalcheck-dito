import {
  Description,
  DialogPanel,
  DialogTitle,
  Dialog as HeadlessDialog,
} from "@headlessui/react";
import { ReactNode, useState } from "react";

type DialogProps = {
  title: string;
  description?: string;
  children: ReactNode;
  renderToggleButton?: (args: { toggleDialog: () => void }) => ReactNode;
  renderActionButtons?: (args: { closeDialog: () => void }) => ReactNode;
};

function Dialog({
  children,
  renderToggleButton,
  title,
  description,
  renderActionButtons,
}: Readonly<DialogProps>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {renderToggleButton ? (
        renderToggleButton({ toggleDialog: () => setIsOpen(!isOpen) })
      ) : (
        <button onClick={() => setIsOpen(true)}>Öffnen</button>
      )}
      <HeadlessDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center bg-black/60 p-4">
          <DialogPanel className="max-w-a11y w-full space-y-16 bg-white p-40">
            <DialogTitle className="ds-heading-02-reg">{title}</DialogTitle>
            {description && <Description>{description}</Description>}
            <div>{children}</div>
            {renderActionButtons ? (
              renderActionButtons({ closeDialog: () => setIsOpen(false) })
            ) : (
              <div className="flex gap-4">
                <button onClick={() => setIsOpen(false)}>Cancel</button>
                <button onClick={() => setIsOpen(false)}>Deactivate</button>
              </div>
            )}
          </DialogPanel>
        </div>
      </HeadlessDialog>
    </>
  );
}

export default Dialog;
