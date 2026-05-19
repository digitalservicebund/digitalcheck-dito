import { useForm } from "@rvf/react";
import React from "react";
import { z } from "zod";
import Checkbox from "~/components/Checkbox.tsx";

const schema = z.object({ checked: z.literal("on").optional() });

export default function CheckboxCard({
  children,
  heading,
}: Readonly<{ children: React.ReactNode; heading: React.ReactNode }>) {
  const form = useForm({ schema, defaultValues: { checked: undefined } });

  return (
    <div className="scroll-my-40">
      <div
        className={"rounded-t-lg bg-white px-16 pt-24 pb-16 sm:pr-80 sm:pl-32"}
      >
        <Checkbox scope={form.scope("checked")}>{heading}</Checkbox>
      </div>
      <div className={"rounded-b-lg bg-blue-200 px-16 py-40 sm:px-80"}>
        {children}
      </div>
    </div>
  );
}
