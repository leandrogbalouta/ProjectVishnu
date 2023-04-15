import React, { ReactNode } from "react";
import logo from "../img/logo.jpg";

export default function AuthenticationPanel({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex -m-5 bg-white sm:bg-slate-800 rounded w-screen h-screen">
      <main
        id="authentication-main"
        className="flex-1 flex sm:items-center mt-10 sm:m-0"
      >
        <div
          id="authentication-panel"
          className="sm:p-4 sm:ring-1 sm:ring-slate-600 sm:bg-white sm:shadow-md sm:rounded w-full sm:w-1/2 lg:w-1/4 sm:m-auto justify-center"
        >
          <img
            alt="DKG Logo"
            src={logo}
            className="w-60 flex mx-auto my-10 md:mt-4 md:mb-6"
          />
          {children}
        </div>
      </main>
    </div>
  );
}
