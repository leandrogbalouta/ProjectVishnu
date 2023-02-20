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

export default function Obras() {
  const [obras, setObras] = useState(null);
  const [state, setState] = useState("todas")
  const [mercado, setMercado] = useState(null);
  const [searchString, setSearchString] = useState(null);

  async function redirectToObra(codigo: string) {
    Router.push(`/obras/${codigo}`);
  }

  async function redirectToObraCreation() {
    console.log("onclick");
    Router.push("/obras/create");
  }

  let contents = !obras ? <Spinner /> : renderObrasTable(obras);

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
      <h1 className="text-center text-4xl mb-5">Obras</h1>
      <div className="flex justify-center align-middle">
        <ul className="flex p-4 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-md md:font-medium md:border-0 ">
          <li className={state === "todas" ? "active-obra-state" : "inactive-obra-state"} onClick={ () => setState("todas")}>
            Todas
          </li>
          <li className={state === "em-curso" ? "active-obra-state" : "inactive-obra-state"} onClick={ () => setState("em-curso")}>
            Em curso
          </li>
          <li className={state === "completada" ? "active-obra-state" : "inactive-obra-state"} onClick={ () => setState("completada")}>
            Completadas
          </li>
          <li className={state === "por-comecar" ? "active-obra-state" : "inactive-obra-state"} onClick={ () => setState("por-comecar")}>
            Por começar
          </li>
        </ul>
      </div>
      
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

  function renderObrasTable(Obras: IObraOutput[]) {
    return (
      <div id="table-container" className="overflow-x-scroll flex-1">
        <Table className="table table-striped" aria-labelledby="tabelLabel">
          <Thead>
            <Tr className="data-table-header">
              <Th>Código interno</Th>
              <Th>Designação</Th>
              <Th>Cliente</Th>
              <Th>Mercado</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Obras.map((obra) => (
              <Tr
                className="data-table-row"
                onClick={() => redirectToObra(obra.codigoInterno)}
                key={obra.codigoInterno}
              >
                <Td>{obra.codigoInterno}</Td>
                <Td>{obra.designacao}</Td>
                <Td>{obra.cliente}</Td>
                <Td className="capitalize">{obra.mercado}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    );
  }
}
