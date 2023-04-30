import NavMenu from "./NavMenu";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex flex-col h-full w-full dark:bg-slate-800 font-Dosis">
      <NavMenu />
      <div
        id="main-container"
        className="flex flex-col flex-1 m-5 max-h-full min-h-0 text-slate-900 dark:text-white"
      >
        <Outlet/>
      </div>
    </div>
  );
}
