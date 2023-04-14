import React from "react";
import isAuthPage from "../auth/isAuthPage";
import NavMenu from "./NavMenu";

export default function Layout({ children }: { children: React.ReactNode }) {
  const isAuth = isAuthPage(location.pathname);
  const isAuthenticated = false;

  return (
    <div className="flex flex-col h-full w-full dark:bg-slate-800 font-Dosis">
      {!isAuth && <NavMenu />}
      <div
        id="main-container"
        className="flex flex-col flex-1 m-5 max-h-full min-h-0 text-slate-900 dark:text-white"
      >
        {children}
      </div>
    </div>
  );
}
