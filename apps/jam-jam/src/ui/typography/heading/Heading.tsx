import {
  createElement,
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
} from "react";

import css from "./Heading.scss";

const VARIANTS = ["large", "big", "medium", "small", "tiny", "micro"] as const;

export type HeadingVariant = typeof VARIANTS[number];

type BaseHeadingProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

export interface HeadingProps extends Omit<BaseHeadingProps, "children"> {
  children: ReactNode;
  variant: HeadingVariant;
}

const Heading = ({ className = "", variant, ...props }: HeadingProps) => {
  return createElement<BaseHeadingProps>(`h${VARIANTS.indexOf(variant) + 1}`, {
    ...props,
    className: `${css.heading} ${css[variant]} ${className}`,
  });
};

export { Heading };
