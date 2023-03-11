import { ReactNode } from "react";
import AppRoutes from "../common/AppRoutes";
interface Params {
  href: string;
  children: ReactNode;
  toggleNavBar: () => any;
}
export default function CustomNavLink({
  href,
  children,
  toggleNavBar,
  ...rest
}: Params & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <div
      className={window.location.pathname == href ? "active-nav-link" : "inactive-nav-link"}
    >
      <p onClick={() => AppRoutes.navigate(href)} {...rest}>
        <div className="w-full cursor-pointer hover:text-orange-300" onClick={toggleNavBar}>
          {children}
        </div>
      </p>
    </div>
  );
}
