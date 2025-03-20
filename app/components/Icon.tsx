import * as Icons from "@digitalservicebund/icons";
import { ComponentType } from "react";

export type IconProps = {
  name: string;
  className?: string;
};

const Icon = ({ name, className }: Readonly<IconProps>) => {
  // eslint-disable-next-line import/namespace
  const icon = Icons[name as keyof typeof Icons];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = icon as ComponentType<any>;
  return <IconComponent className={className} />;
};

export default Icon;
