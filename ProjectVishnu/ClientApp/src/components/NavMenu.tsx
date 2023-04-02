import React, { useCallback, useContext, useEffect, useRef } from "react";
import CustomNavLink from "./CustomNavLink";
import { useState } from "react";
import { RiMenu4Line, RiSettings5Line } from "react-icons/ri";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import ThemeContext from "./contexts/Theme/themeContext";
import AppRoutes from "../common/AppRoutes";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { SlPower } from "react-icons/sl";

function signOutClickHandler() {
  const instance = useMsal().instance;
  const logoutRequest = {
    account: instance.getActiveAccount(),
    postLogoutRedirectUri: location.origin,
    
  };
  instance.logoutRedirect();
}


export default function NavMenu() {
  
  const [toggleNav, setToggleNav] = useState<boolean>(false);
  const msalInstance = useMsal().instance;
  const darkTheme = useRef<boolean>();
  let toggleClass = toggleNav ? "block" : "hidden";
  const { currentTheme, changeCurrentTheme } = useContext(ThemeContext);
  const changeToggle = useCallback(() => {
    setToggleNav(!toggleNav);
  }, [toggleNav]);
  function changeTheme() {
    changeCurrentTheme(currentTheme === "light" ? "dark" : "light");
    darkTheme.current = !darkTheme.current;
    localStorage.setItem("theme", darkTheme.current ? "dark" : "light");
  }
  useEffect(() => {
    darkTheme.current = localStorage.getItem("theme") === "dark";
    changeCurrentTheme(darkTheme.current ? "dark" : "light");
    // Fechar NavMenu quando utilizador clicka fora da nav.
    document.addEventListener("click", (e) => {
      if (toggleNav) {
        const target = e.target;
        const navMenu = document.getElementById("navmenu")!;
        if (!navMenu.contains(target as Node)) {
          changeToggle();
        }
      }
    });
  }, [changeCurrentTheme, changeToggle, toggleNav]);
  return (
    <header
      id="navmenu"
      className={"sticky top-0 !z-[1000] shadow-sm shadow-slate-600"}
    >
      <nav className="bg-slate-900 border-gray-200 px-2 sm:px-4 py-2.5 rounded-b">
        <div className="container-fluid flex flex-wrap items-center">
          <div id="nav-menu-button-container" className="flex flex-end"></div>
          <span
            id="nav-title"
            onClick={() => {
              AppRoutes.navigate("/");
              setToggleNav(false);
            }}
          >
            DKM
          </span>
          <div id="nav-menu-button-container" className="flex flex-end">
            <button
              id="theme-toggle"
              title="toggle-dark-mode-button"
              type="button"
              className="text-gray-500 hover:text-orange-400 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1"
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
              id="settings"
              title="open-settings"
              type="button"
              className="text-gray-500 hover:text-orange-400 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1"
              onClick={() => {
                AppRoutes.navigate("/admin");
                setToggleNav(false);
              }} // TODO: ir para uma página de administração (por criar)
            >
              <RiSettings5Line className="h-5 w-5" />
            </button>
            <AuthenticatedTemplate>
              <button
                id="logout"
                title="open-settings"
                type="button"
                className="text-orange-400 hover:text-orange-600 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1"
                onClick={() => msalInstance.loginRedirect()}
                // TODO: ir para uma página de administração (por criar)
              >
                <SlPower className="h-5 w-5" />
              </button>
            </AuthenticatedTemplate>

            <button
              type="button"
              className="inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:hover:bg-slate-800 dark:focus:ring-gray-600 hover:!text-slate-500"
              onClick={changeToggle}
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
                <CustomNavLink href="/" toggleNavBar={changeToggle}>
                  Home
                </CustomNavLink>
              </li>
              <AuthenticatedTemplate>
                <li>
                  <CustomNavLink
                    href="/funcionarios"
                    toggleNavBar={changeToggle}
                  >
                    Funcionarios
                  </CustomNavLink>
                </li>
                <li>
                  <CustomNavLink href="/obras" toggleNavBar={changeToggle}>
                    Obras
                  </CustomNavLink>
                </li>
                <li>
                  <CustomNavLink
                    href="/folha-de-ponto"
                    toggleNavBar={changeToggle}
                  >
                    Folhas de Ponto
                  </CustomNavLink>
                </li>
              </AuthenticatedTemplate>
              <UnauthenticatedTemplate>
                <li>
                  <CustomNavLink
                    href="#"
                    onClick={() => msalInstance.loginRedirect()}
                    toggleNavBar={changeToggle}
                  >
                    Login
                  </CustomNavLink>
                </li>
              </UnauthenticatedTemplate>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
