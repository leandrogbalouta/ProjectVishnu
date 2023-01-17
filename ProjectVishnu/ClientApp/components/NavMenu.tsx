import React from "react";
import { useRouter } from "next/router";
import CustomNavLink from "./CustomNavLink";
import { useState } from "react";
import { BsList } from "react-icons/bs";

export default function NavMenu() {
  const [toggleNav, setToggleNav] = useState<boolean>(false);
  let toggleClass = toggleNav ? "block" : "hidden";
  function to() {
    setToggleNav(!toggleNav);
  }
  const router = useRouter();

  return (
    <header className="sticky top-0 !z-[1000]">
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
        <div className="container-fluid flex flex-wrap items-center justify-between mx-0">
          <span
            className="self-center text-xl font-semibold whitespace-nowrap dark:text-white cursor-pointer"
            onClick={() => router.push("/")}
          >
            ProjectVishnu
          </span>
          <button
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={to}
          >
            <span className="sr-only">Open main menu</span>
            <BsList className="text-2xl" />
          </button>
          <div
            className={toggleClass + " w-full md:block md:w-auto"}
            id="navbar-default"
          >
            <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <CustomNavLink href="/" toggleNavBar={to}>
                  Home
                </CustomNavLink>
              </li>
              <li>
                <CustomNavLink href="/funcionarios" toggleNavBar={to}>
                  Funcionarios
                </CustomNavLink>
              </li>
              <li>
                <CustomNavLink href="/obras" toggleNavBar={to}>
                  Obras
                </CustomNavLink>
              </li>
              <li>
                <CustomNavLink href="/folha-de-ponto" toggleNavBar={to}>
                  Folhas de Ponto
                </CustomNavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
