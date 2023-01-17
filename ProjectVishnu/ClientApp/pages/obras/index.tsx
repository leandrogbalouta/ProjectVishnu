﻿import React, { useState, useEffect } from "react";
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
  const [mercado, setMercado] = useState(null);
  const [searchString, setSearchString] = useState(null);

  async function redirectToObra(codigo: string) {
    Router.push(`/obras/${codigo}`);
  }

  async function redirectToObraCreation() {
    console.log("onclick");
    Router.push("/obras/create");
  }

  let contents = obras === null ? <Spinner /> : renderObrasTable(obras);

  useEffect(() => {
    const filters = Object.assign(
      {},
      mercado === null ? null : { mercado: mercado },
      searchString === null ? null : { nome: searchString }
    );

    const populateObrasData = async () => {
      const response = await fetchObras(filters);
      const data = await response.json();
      setObras(data);
    };
    populateObrasData();
  }, [mercado, searchString]);

  return (
    <div>
      <h1 className="text-center text-4xl mb-5">Obras</h1>
      {contents}
    </div>
  );

  function renderObrasTable(Obras: IObraOutput[]) {
    return (
      <div className="flex flex-col">
        <div id="filter-bar-container" className="flex ">
          <FilterBar
            setMercado={setMercado}
            setSearchString={setSearchString}
            searchBar={"searchBar"}
          />
        </div>
        <Table className="table table-striped" aria-labelledby="tabelLabel">
          <Thead>
            <Tr>
              <Th>Código interno</Th>
              <Th>Designação</Th>
              <Th>Cliente</Th>
              <Th>Mercado</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Obras.map((obra) => (
                <Tr
                className="hover:bg-gray-200 cursor-pointer"
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
        <div id="button-container" className="flex justify-end mt-3">
          <Button
            onClick={() => redirectToObraCreation()}
            colorScheme="teal"
          >
            Criar
          </Button>
        </div>
      </div>
    );
  }
}