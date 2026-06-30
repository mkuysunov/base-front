import * as React from "react";

export interface SvgIconWrapperProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  filled?: boolean;
}

interface SvgIconWrapperDefaultProps extends React.SVGProps<SVGSVGElement> {
  filledVariant?: React.ReactNode;
}

export const SvgIconWrapper = (
  children: React.ReactNode,
  displayName: string,
  defaultProps?: SvgIconWrapperDefaultProps
) => {
  const Component = React.forwardRef<SVGSVGElement, SvgIconWrapperProps>(
    ({ size = 24, filled, ...props }, ref) => {
      const { filledVariant, ...restDefaultProps } = defaultProps || {};
      return (
        <svg
          ref={ref}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          {...restDefaultProps}
          {...props}
        >
          {filled ? filledVariant || children : children}
        </svg>
      );
    }
  );

  Component.displayName = displayName;

  return Component;
};
