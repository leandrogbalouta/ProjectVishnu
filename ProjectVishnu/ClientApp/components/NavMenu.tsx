import React, { useEffect } from "react";
import { useRouter } from "next/router";
import CustomNavLink from "./CustomNavLink";
import { useState } from "react";
import { RiMenu4Line } from "react-icons/ri";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";

export default function NavMenu() {
  const [toggleNav, setToggleNav] = useState<boolean>(false);
  let toggleClass = toggleNav ? "block" : "hidden";
  function to() {
    setToggleNav(!toggleNav);
  }
  useEffect(() => {
    var themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
    var themeToggleLightIcon = document.getElementById(
      "theme-toggle-light-icon"
    );

    // Change the icons inside the button based on previous settings
    if (
      localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      themeToggleLightIcon!.classList.remove("hidden");
    } else {
      themeToggleDarkIcon!.classList.remove("hidden");
    }

    var themeToggleBtn = document.getElementById("theme-toggle");

    themeToggleBtn!.addEventListener("click", function () {
      // toggle icons inside button
      themeToggleDarkIcon!.classList.toggle("hidden");
      themeToggleLightIcon!.classList.toggle("hidden");

      // if set via local storage previously
      if (localStorage.getItem("color-theme")) {
        if (localStorage.getItem("color-theme") === "light") {
          document.documentElement.classList.add("dark");
          localStorage.setItem("color-theme", "dark");
        } else {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("color-theme", "light");
        }

        // if NOT set via local storage previously
      } else {
        if (document.documentElement.classList.contains("dark")) {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("color-theme", "light");
        } else {
          document.documentElement.classList.add("dark");
          localStorage.setItem("color-theme", "dark");
        }
      }
    });
  });
  const router = useRouter();

  return (
    <header className="sticky top-0 !z-[1000] shadow-sm shadow-slate-600">
      <nav className="bg-slate-900 border-gray-200 px-2 sm:px-4 py-2.5 rounded">
        <div className="container-fluid flex flex-wrap items-center justify-between mx-0">
          <span
            className="self-center text-xl font-semibold whitespace-nowrap !text-white cursor-pointer"
            onClick={() => router.push("/")}
          >
            ProjectVishnu
          </span>
          <div id="nav-menu-button-container" className="flex flex-end">
            <button
              id="theme-toggle"
              type="button"
              className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
            >
              <BsFillSunFill
                id="theme-toggle-dark-icon"
                className="hidden w-5 h-5"
              />
              <BsFillMoonStarsFill
                id="theme-toggle-light-icon"
                className="hidden w-5 h-5"
              />
            </button>
            <button
              type="button"
              className="inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:hover:bg-slate-800 dark:focus:ring-gray-600 hover:!text-slate-500"
              onClick={to}
            >
              <span className="sr-only">Open main menu</span>
              <RiMenu4Line className="text-2xl sm:text-3xl text-orange-400" />
            </button>
            <div
              className={toggleClass + " w-full md:block md:w-auto"}
              id="navbar-default"
            >
              <ul className="flex flex-col p-4 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0  bg-slate-800 md:bg-slate-900 border-slate-700 !text-white dark:hover:!text-sky-400">
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
        </div>
      </nav>
    </header>
  );
}
