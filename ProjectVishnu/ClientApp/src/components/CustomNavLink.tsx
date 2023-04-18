import { ReactNode } from "react";
import AppRoutes from "../common/AppRoutes";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  return (
    <div
      className={window.location.pathname == href ? "active-nav-link" : "inactive-nav-link"}
    >
      <div onClick={() => navigate(href)} {...rest}>
        <div className="w-full cursor-pointer" onClick={toggleNavBar}>
          {children}
        </div>
      </div>
    </div>
  );
}
