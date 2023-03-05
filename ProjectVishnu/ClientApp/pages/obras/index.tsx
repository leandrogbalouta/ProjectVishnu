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
  const [obras, setObras] = useState<IObraOutput[]>([]);
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

  let contents = obras ? <ObrasTable obras={(state !== "todas") ? [...obras.filter((obra) => obra.estado == state)] : obras} /> :<Spinner />

  useEffect(() => {
    const populateObrasData = async () => {
      const response = await fetchObras();
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
