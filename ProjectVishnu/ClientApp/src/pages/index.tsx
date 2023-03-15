import React from "react";
import analytics from "./../img/analytics.svg";
export default function Home() {
  return (

    <div className="w-full h-full flex flex-col">
      <p className="text-2xl sm:text-3xl sm:mt-10 sm:ml-10">Bem-vindo.</p>
      <img src={analytics} alt="" className="mx-auto sm:w-1/2"/>
    </div>
  );
}
