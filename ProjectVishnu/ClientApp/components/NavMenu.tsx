import React, { useContext, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import CustomNavLink from "./CustomNavLink";
import { useState } from "react";
import { RiMenu4Line } from "react-icons/ri";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import ThemeContext from './contexts/Theme/themeContext';

export default function NavMenu() {
  const [toggleNav, setToggleNav] = useState<boolean>(false);
  const darkTheme = useRef<boolean>()
  let router = useRouter();
  let toggleClass = toggleNav ? "block" : "hidden";
  const { currentTheme, changeCurrentTheme } = useContext(ThemeContext)
  function to() {
    setToggleNav(!toggleNav);
  }
  function changeTheme() {
    changeCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
    darkTheme.current = !darkTheme.current;
    localStorage.setItem('theme', darkTheme.current ? 'dark' : 'light')
  }
  useEffect(() => {
    darkTheme.current = localStorage.getItem("theme") === "dark";
    changeCurrentTheme(darkTheme.current ? 'dark' : 'light');
  },[])
  return (
    <header className={"sticky top-0 !z-[1000] shadow-sm shadow-slate-600"}>
      <nav className="bg-slate-900 border-gray-200 px-2 sm:px-4 py-2.5 rounded">
        <div className="container-fluid flex flex-wrap items-center">
          <span
            className="self-center text-xl font-semibold whitespace-nowrap !text-white cursor-pointer mr-auto"
            onClick={() => router.push("/")}
          >
            ProjectVishnu
          </span>
          <div id="nav-menu-button-container" className="flex flex-end">
            <button
              id="theme-toggle"
              title="toggle-dark-mode-button"
              type="button"
              className="text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1"
              onClick={changeTheme}
            >
              {darkTheme.current ? (
                <BsFillMoonStarsFill
                  id="theme-toggle-light-icon"
                  className={"w-5 h-5"}
                />
              ) : (
                <BsFillSunFill
                  id="theme-toggle-dark-icon"
                  className="w-5 h-5"
                />
              )}
            </button>
            <button
              type="button"
              className="inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:hover:bg-slate-800 dark:focus:ring-gray-600 hover:!text-slate-500"
              onClick={to}
            >
              <span className="sr-only">Open main menu</span>
              <RiMenu4Line className="text-2xl sm:text-3xl text-orange-400" />
            </button>
          </div>
          <div
            className={toggleClass + " w-full md:block md:w-auto"}
            id="navbar-default"
          >
            <ul className="flex flex-col p-4 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 bg-slate-800 md:bg-slate-900 border-slate-700 !text-white dark:hover:!text-sky-400">
              <li className="text-white">
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
