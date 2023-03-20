import { Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import { AddFuncionarioToObra } from "../../common/APICalls";
import IObraOutput from "../../common/Interfaces/Obra/IObraOutput";
import { useNavigate } from 'react-router-dom';
import SemDadosRow from '../SemDadosRow';

interface Props {
  obras: IObraOutput[];
  // dataOnRowClick?: (codigoInterno: string) => void;
}
export default function ObrasTable({ obras }: Props) {
  const navigate = useNavigate();
  async function redirectToObra(codigoInterno: string) {
    navigate(`/obras/${codigoInterno}`);
  }
  function TdState({ state }: { state: string }) {
    let estado = '';
    let classe = '';
    switch (state) {
      default:
        break;
      case "por-comecar":
        classe = "bg-slate-100";
        estado = "Por começar";
        break;
      case "completada":
        classe = "bg-emerald-300";
        estado = "Completada";
        break;
      case "em-curso":
        classe = "bg-cyan-300";
        estado = "Em curso";
        break;
    }
    return <Td className={"text-black ".concat(classe)}>{estado}</Td>
  }
  return (
    <div id="table-container" className="overflow-x-scroll flex-1">
      <Table className="table table-striped" aria-labelledby="tabelLabel">
        <Thead>
          <Tr className="data-table-header">
            <Th>Código interno</Th>
            <Th>Designação</Th>
            <Th>Cliente</Th>
            <Th>Mercado</Th>
            <Th>Estado</Th>
          </Tr>
        </Thead>
        <Tbody>
          {obras && obras.length > 0 ? obras.map((obra) => (
            <Tr
              className="data-table-row"
              onClick={() =>
                redirectToObra(obra.codigoInterno)
              }
              key={obra.codigoInterno}
            >
              <Td>{obra.codigoInterno}</Td>
              <Td>{obra.designacao}</Td>
              <Td>{obra.cliente}</Td>
              <Td className="capitalize">{obra.mercado}</Td>
              <TdState state={obra.estado} />
            </Tr>
          )) : <SemDadosRow />}
        </Tbody>
      </Table>
    </div>
  );
}
