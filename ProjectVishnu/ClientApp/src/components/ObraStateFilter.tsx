import React, { HTMLAttributes } from "react";

interface Props  { state: any; setState: any; };

function ObraStateFilter({ state, setState, }: Props) {
  return (
    <div className="flex justify-center align-middle" >
      <ul className="w-full justify-center flex p-4 border rounded-lg md:flex-row space-x-8 md:mt-0 md:text-md md:font-medium md:border-0 ">
        <li
          className={
            state === "todas" ? "active-obra-state" : "inactive-obra-state"
          }
          onClick={() => setState("todas")}
        >
          Todas
        </li>
        <li
          className={
            state === "em-curso" ? "active-obra-state" : "inactive-obra-state"
          }
          onClick={() => setState("em-curso")}
        >
          Em curso
        </li>
        <li
          className={
            state === "completada" ? "active-obra-state" : "inactive-obra-state"
          }
          onClick={() => setState("completada")}
        >
          Completadas
        </li>
        <li
          className={
            state === "por-comecar"
              ? "active-obra-state"
              : "inactive-obra-state"
          }
          onClick={() => setState("por-comecar")}
        >
          Por começar
        </li>
      </ul>
    </div>
  );
}

export default ObraStateFilter;
