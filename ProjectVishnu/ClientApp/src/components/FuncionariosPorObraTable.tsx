import { Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import { Navigate, useNavigate } from 'react-router-dom';
import AppRoutes from "../common/AppRoutes";
import IFuncionarioObraOutputModel from "../common/Interfaces/Funcionario/IFuncionarioObraOutputModel";

interface Props {
  funcionarios: IFuncionarioObraOutputModel[];
}
export default function FuncionariosPorObraTable({ funcionarios }: Props) {
  return (
    <div id="table-container" className="overflow-x-scroll flex-1">
      <Table className="table table-striped" aria-labelledby="tabelLabel">
          <Thead>
            <Tr className="data-table-header">
              <Th>Nome</Th>
              <Th>Nif</Th>
              <Th>Categoria profissional</Th>
            <Th>Data de começo</Th>
            <Th>Data de fim</Th>
            </Tr>
          </Thead>
          <Tbody>
            {funcionarios &&
              funcionarios.map((funcionario) => (
                <Tr
                  className="data-table-row"
                  onClick={() => redirectToFuncionario(funcionario.funcionario.id)}
                  key={funcionario.funcionario.nif}
                >
                  <Td>{funcionario.funcionario.nome}</Td>
                  <Td>{funcionario.funcionario.nif}</Td>
                  <Td>{funcionario.funcionario.catprof}</Td>
                  <Td>{funcionario.dataInicio}</Td>
                  <Td>{funcionario.dataFim ?? "N/A"}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
    </div>
  );
  async function redirectToFuncionario(id: number) {
    AppRoutes.navigate(`/funcionarios/${id}`);
  }
}

