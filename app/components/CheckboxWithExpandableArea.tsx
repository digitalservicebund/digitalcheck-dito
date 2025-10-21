import { FormScope, useField } from "@rvf/react-router";
import { ComponentProps, ReactNode, useEffect, useState } from "react";
import Checkbox from "./Checkbox";

type BaseInputProps = Omit<
  ComponentProps<"input">,
  "type" | "children" | "defaultValue"
>;

interface CheckboxWithExpandableAreaProps extends BaseInputProps {
  children: ReactNode | ((args: { closeArea: () => void }) => ReactNode);
  label: string;
  scope: FormScope<"on" | true | undefined>;
  description?: ReactNode | ((args: { open: boolean }) => ReactNode);
  closeable?: boolean;
  disabled?: boolean;
  error?: string | null;
  warningInsteadOfError?: boolean;
  defaultValue?: "on";
}

function CheckboxWithExpandableArea({
  children,
  label,
  scope,
  description,
  disabled,
  error,
  warningInsteadOfError,
  closeable = true,
  defaultValue,
  ...rest
}: Readonly<CheckboxWithExpandableAreaProps>) {
  const [open, setOpen] = useState(false);
  const checkboxField = useField(scope);
  const checkboxControlProps = checkboxField.getControlProps();

  useEffect(() => {
    const checkboxValue = checkboxControlProps.value;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(!!checkboxValue);
  }, [checkboxControlProps.value]);

  return (
    <div className="max-w-a11y space-y-40 rounded-sm border border-blue-400 bg-blue-200 p-24">
      <Checkbox
        scope={scope}
        disabled={disabled || (!closeable && open)}
        description={
          typeof description === "function"
            ? description({ open })
            : description
        }
        error={error}
        defaultValue={defaultValue}
        warningInsteadOfError={warningInsteadOfError}
        includeDisabledInForm
        {...rest}
      >
        {label}
      </Checkbox>
      {open &&
        (typeof children === "function"
          ? children({ closeArea: () => checkboxField.setValue(undefined) })
          : children)}
    </div>
  );
}

export default CheckboxWithExpandableArea;
