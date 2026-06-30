import { forwardRef } from "react";
import { Link } from "react-router-dom";

type RouterLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  to?: string;
};

export const RouterLink = forwardRef<HTMLAnchorElement, RouterLinkProps>(
  ({ href, to, children, ...others }, ref) => (
    <Link to={to ?? href ?? "#"} ref={ref} {...others}>
      {children}
    </Link>
  )
);

RouterLink.displayName = "RouterLink";
