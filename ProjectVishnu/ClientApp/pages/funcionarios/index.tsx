import { Button, Spinner, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { fetchFuncionarios } from "../../common/APICalls";
import IFuncionarioOutput from "../../common/Interfaces/Funcionario/IFuncionarioOutput";
import FilterBar  from "../../components/FilterBar";

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [mercado, setMercado] = useState("");
  const [searchString, setSearchString] = useState("");
  const router = useRouter();
  const id = router.query;

  async function redirectToFuncionario(id: number) {
    router.push(`/funcionarios/${id}`);
  }

  async function redirectToFuncionarioCreation() {
    router.push("/funcionarios/create");
  }

  let contents =
    funcionarios === null ? <Spinner /> : renderFuncionariosTable(funcionarios);

  useEffect(() => {
    const filters = Object.assign(
      {},
      // mercado === null ? null : { mercado: mercado },
      // searchString === null ? null : { nome: searchString }
      { mercado: mercado } ?? null,
      { nome: searchString } ?? null
    );

    const populateFuncionariosData = async () => {
      const response = await fetchFuncionarios(filters);
      const data = await response.json();
      setFuncionarios(data);
    };
    populateFuncionariosData();
  }, [mercado, searchString]);

  return (
    <div>
      <h1 className="text-center text-4xl mb-5">Funcionarios</h1>
      {contents}
    </div>
  );

  function renderFuncionariosTable(funcionarios: IFuncionarioOutput[]) {
    return (
      <div className="flex flex-col">
        <FilterBar
          setMercado={setMercado}
          setSearchString={setSearchString}
          searchBar={"searchBar"}
        />
        <Table className="table table-striped" aria-labelledby="tabelLabel">
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Nif</Th>
              <Th>Niss</Th>
              <Th>Mercado</Th>
            </Tr>
          </Thead>
          <Tbody>
            {funcionarios.map((funcionario) => (
              <Tr
                className="hover:bg-gray-200 cursor-pointer"
                onClick={() => redirectToFuncionario(funcionario.id)}
                key={funcionario.nome}
              >
                <Td>{funcionario.nome}</Td>
                <Td>{funcionario.nif}</Td>
                <Td>{funcionario.niss}</Td>
                <Td className="capitalize">{funcionario.mercado}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <div id="button-container" className="flex justify-end mt-3">
          <Button
            onClick={() => redirectToFuncionarioCreation()}
            colorScheme="teal"
          >
            Criar
          </Button>
        </div>
      </div>
    );
  }
}
