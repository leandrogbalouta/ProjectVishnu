import { Table, Thead, Tr, Th, Tbody, Td, Checkbox } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import IFuncionarioObraOutputModel from "../../common/Interfaces/Funcionario/IFuncionarioObraOutputModel";
import SemDadosRow from "../SemDadosRow";

interface Props {
  funcionarios: IFuncionarioObraOutputModel[];
}
export default function FuncionariosPorObraTable({ funcionarios }: Props) {
  const navigate = useNavigate();
  return (
    <div id="table-container" className="overflow-x-scroll flex-1">
      <Table className="table table-striped" aria-labelledby="tabelLabel">
        <Thead>
          <Tr className="data-table-header">
            <Th>#</Th>
            <Th>Nome</Th>
            <Th>Nif</Th>
            <Th>Categoria profissional</Th>
            <Th>Data de começo</Th>
            <Th>Data de fim</Th>
          </Tr>
        </Thead>
        <Tbody>
          {funcionarios && funcionarios.length > 0 ? (
            funcionarios.map((funcionario) => (
              <Tr className="data-table-row" key={funcionario.funcionario.nif}>
                <Td>
                  <Checkbox />
                </Td>
                <Td
                  onClick={() =>
                    redirectToFuncionario(funcionario.funcionario.id)
                  }
                >
                  {funcionario.funcionario.nif}
                </Td>

                <Td
                  onClick={() =>
                    redirectToFuncionario(funcionario.funcionario.id)
                  }
                >
                  {funcionario.funcionario.nif}
                </Td>

                <Td
                  onClick={() =>
                    redirectToFuncionario(funcionario.funcionario.id)
                  }
                >
                  {funcionario.funcionario.catprof}
                </Td>

                <Td
                  onClick={() =>
                    redirectToFuncionario(funcionario.funcionario.id)
                  }
                >
                  {funcionario.dataInicio}
                </Td>

                <Td
                  onClick={() =>
                    redirectToFuncionario(funcionario.funcionario.id)
                  }
                >
                  {funcionario.dataFim ?? "N/A"}
                </Td>
              </Tr>
            ))
          ) : (
            <SemDadosRow />
          )}
        </Tbody>
      </Table>
    </div>
  );
  async function redirectToFuncionario(id: number) {
    navigate(`/funcionarios/${id}`);
  }
}
