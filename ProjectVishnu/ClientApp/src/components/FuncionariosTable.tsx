import { Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import IFuncionarioOutput from "../common/Interfaces/Funcionario/IFuncionarioOutput";
import AppRoutes from '../common/AppRoutes';

interface Props {
  funcionarios: IFuncionarioOutput[];
}
export default function FuncionariosTable({ funcionarios }: Props) {
  const navigate = useNavigate();
  return (
    <div id="table-container" className="overflow-x-scroll flex-1">
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
  );
  async function redirectToFuncionario(id: number) {
    navigate(`/funcionarios/${id}`);
  }
}

