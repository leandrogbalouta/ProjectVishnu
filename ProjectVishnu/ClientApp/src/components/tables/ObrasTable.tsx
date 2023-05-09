import { Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import IObraOutput from "../../common/Interfaces/Obra/IObraOutput";
import SemDadosPlaceHolder from "../SemDadosPlaceHolder";
import TdState from "./TdState";
import { v4 as uuidv4 } from 'uuid';

interface Props {
  obras: IObraOutput[];
  dataOnRowClick: (codigoInterno: string) => void;
}
export default function ObrasTable({ obras, dataOnRowClick }: Props) {
  console.log(obras);
  return (
    <div id="table-container" className="overflow-x-scroll flex-1">
      {obras && obras.length > 0 ? (
        <Table className="table table-striped" aria-labelledby="tabelLabel">
          <Thead>
            <Tr className="data-table-header">
              <Th>Código interno</Th>
              <Th>Designação</Th>
              <Th>Cliente</Th>
              <Th>Chefe de obra</Th>
              <Th>Mercado</Th>
              <Th>Estado</Th>
            </Tr>
          </Thead>
          <Tbody>
            {obras.map((obra) => (
              <Tr
                className="data-table-row"
                onClick={() => dataOnRowClick(obra.codigoInterno)}
                key={() => uuidv4()}
              >
                <Td>{obra.codigoInterno}</Td>
                <Td>{obra.designacao}</Td>
                <Td>{obra.cliente}</Td>
                <Td>{obra.chefeDeObra}</Td>
                <Td className="capitalize">{obra.mercado}</Td>
                <TdState state={obra.estado} />
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <SemDadosPlaceHolder/>
      )}
    </div>
  );
}
