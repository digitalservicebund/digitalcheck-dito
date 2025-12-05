import { useField } from "@rvf/react";
import { ComponentProps, ReactNode } from "react";
import Checkbox, { type CheckboxProps } from "./Checkbox";

type BaseInputProps = Omit<
  ComponentProps<"input">,
  "type" | "children" | "defaultValue"
>;

type CheckboxWithExpandableAreaProps = BaseInputProps &
  Pick<CheckboxProps, "onChange" | "checked" | "scope"> & {
    children: ReactNode | ((args: { closeArea: () => void }) => ReactNode);
    label: string;
    renderDescription?: ReactNode | ((args: { open: boolean }) => ReactNode);
    closeable?: boolean;
    disabled?: boolean;
    error?: string | null;
    warningInsteadOfError?: boolean;
    defaultValue?: "on";
    testId?: string;
  };

function CheckboxWithExpandableArea({
  children,
  label,
  scope,
  renderDescription,
  disabled,
  error,
  warningInsteadOfError,
  closeable = true,
  defaultValue,
  testId,
  ...rest
}: Readonly<CheckboxWithExpandableAreaProps>) {
  const checkboxField = useField(scope);
  const checkboxControlProps = checkboxField.getControlProps();

  const open = !!checkboxControlProps.value;

  return (
    <div
      className="max-w-a11y space-y-40 rounded-sm border border-blue-400 bg-blue-200 p-24"
      data-testid={testId}
    >
      <Checkbox
        scope={scope}
        disabled={disabled}
        description={
          typeof renderDescription === "function"
            ? renderDescription({ open })
            : renderDescription
        }
        error={error}
        defaultValue={defaultValue}
        warningInsteadOfError={warningInsteadOfError}
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
