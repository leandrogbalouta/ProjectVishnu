import React, { useState, useEffect } from "react";
import { fetchObras } from "../../common/APICalls";
import FilterBar from "../../components/FilterBar";
import Router from "next/router";
import IObraOutput from "../../common/Interfaces/Obra/IObraOutput";
import {
  Button,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import ObrasTable from "../../components/ObrasTable";
import ObraStateFilter from "../../components/ObraStateFilter";

export default function Obras() {
  const [obras, setObras] = useState(null);
  const [state, setState] = useState("todas")
  const [mercado, setMercado] = useState(null);
  const [searchString, setSearchString] = useState(null);

  async function redirectToObra(codigoInterno: string) {
    Router.push(`/obras/${codigoInterno}`);
  }

  async function redirectToObraCreation() {
    console.log("onclick");
    Router.push("/obras/create");
  }

  let contents = !obras ? <Spinner /> : <ObrasTable obras={obras} dataOnRowClick={redirectToObra} />;

  useEffect(() => {
    const filters = Object.assign(
      {},
      state === "todas" ? null : { estado : state},
      mercado === null ? null : { mercado: mercado },
      searchString === null ? null : { valor: searchString }
    );

    const populateObrasData = async () => {
      const response = await fetchObras(filters);
      const data = await response.json();
      setObras(data);
    };
    populateObrasData();
  }, [mercado, searchString, state]);

  return (
    <div className="flex flex-col flex-1 h-full">
      <h1 className="text-center text-4xl mb-10">Obras</h1>
      <ObraStateFilter state={state} setState={setState} />
      <FilterBar
        setMercado={setMercado}
        setSearchString={setSearchString}
        searchBar
      />

      {contents}
      <div id="button-container" className="flex justify-end mt-3">
        <Button onClick={() => redirectToObraCreation()} colorScheme="blue">
          Criar
        </Button>
      </div>
    </div>
  );
}
