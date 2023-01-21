import React from "react";
import { useRouter } from "next/router";
import CustomNavLink from "./CustomNavLink";
import { useState } from "react";
import {RiMenu4Line} from 'react-icons/ri'

export default function NavMenu() {
  const [toggleNav, setToggleNav] = useState<boolean>(false);
  let toggleClass = toggleNav ? "block" : "hidden";
  function to() {
    setToggleNav(!toggleNav);
  }
  const router = useRouter();

  return (
    <header className="sticky top-0 !z-[1000] shadow-sm shadow-teal-600">
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-teal-900">
        <div className="container-fluid flex flex-wrap items-center justify-between mx-0">
          <span
            className="self-center text-xl font-semibold whitespace-nowrap text-teal-800 dark:!text-white cursor-pointer"
            onClick={() => router.push("/")}
          >
            ProjectVishnu
          </span>
          <button
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:hover:bg-teal-800 dark:focus:ring-gray-600 hover:!text-teal-500"
            onClick={to}
          >
            <span className="sr-only">Open main menu</span>
            <RiMenu4Line className="text-2xl sm:text-3xl dark:!text-orange-400" />
          </button>
          <div
            className={toggleClass + " w-full md:block md:w-auto"}
            id="navbar-default"
          >
            <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-teal-800 md:dark:bg-teal-900 dark:border-teal-700">
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
