import { Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import { AddFuncionarioToObra } from "../common/APICalls";
import IObraOutput from "../common/Interfaces/Obra/IObraOutput";

interface Props {
    obras: IObraOutput[];
    dataOnRowClick: (codigoInterno: string) => void;
  }
export default function ObrasTable({ obras, dataOnRowClick }: Props) {
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
          {obras.map((obra) => (
            <Tr
              className="data-table-row"
              onClick={() => dataOnRowClick(obra.codigoInterno)}
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
