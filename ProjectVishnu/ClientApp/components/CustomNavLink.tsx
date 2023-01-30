import NavLink from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

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
  const router = useRouter();
  return (
    <div
      className={router.route == href ? "active-nav-link" : "inactive-nav-link"}
    >
      <NavLink href={href} {...rest}>
        <div className="w-full cursor-pointer hover:text-orange-300" onClick={toggleNavBar}>
          {children}
        </div>
      </NavLink>
    </div>
  );
}
