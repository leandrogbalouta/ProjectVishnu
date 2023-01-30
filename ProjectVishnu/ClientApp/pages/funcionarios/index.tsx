import {
  Button,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { fetchFuncionarios } from "../../common/APICalls";
import IFuncionarioOutput from "../../common/Interfaces/Funcionario/IFuncionarioOutput";
import FilterBar from "../../components/FilterBar";

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [mercado, setMercado] = useState("");
  const [searchString, setSearchString] = useState("");
  const router = useRouter();

  async function redirectToFuncionario(id: number) {
    router.push(`/funcionarios/${id}`);
  }

  async function redirectToFuncionarioCreation() {
    router.push("/funcionarios/create");
  }

  let contents = !funcionarios ? (
    <Spinner />
  ) : (
    renderFuncionariosTable(funcionarios)
  );

  useEffect(() => {
    const filters = Object.assign(
      {},
      // mercado === null ? null : { mercado: mercado },
      // searchString === null ? null : { nome: searchString }
      { mercado: mercado ?? null },
      { nome: searchString ?? null }
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
          searchBar
        />
        <div id="table-container" className="overflow-x-scroll">
          <Table className="table table-striped" aria-labelledby="tabelLabel">
            <Thead>
              <Tr className="data-table-header">
                <Th>Nome</Th>
                <Th>Nif</Th>
                <Th>Niss</Th>
                <Th>Mercado</Th>
              </Tr>
            </Thead>
            <Tbody>
              {funcionarios &&
                funcionarios.map((funcionario) => (
                  <Tr
                    className="data-table-row"
                    onClick={() => redirectToFuncionario(funcionario.id)}
                    key={funcionario.nif}
                  >
                    <Td>{funcionario.nome}</Td>
                    <Td>{funcionario.nif}</Td>
                    <Td>{funcionario.niss}</Td>
                    <Td className="capitalize">{funcionario.mercado}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </div>
        <div id="button-container" className="flex justify-end mt-3">
          <Button
            onClick={() => redirectToFuncionarioCreation()}
            colorScheme="blue"
          >
            Criar
          </Button>
        </div>
      </div>
    );
  }
}
