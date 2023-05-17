import { Table, Thead, Tr, Th, Tbody, Td, Checkbox } from "@chakra-ui/react";
import IObraOutput from "../../common/Interfaces/Obra/IObraOutput";
import SemDadosPlaceHolder from "../SemDadosPlaceHolder";
import TdState from "./TdState";
import uniqid from "uniqid";
import { Key } from "react";

interface Props {
  obras: IObraOutput[];
  selectable?: boolean;
  dataOnRowClick: (codigoInterno: string) => void;
}
export default function ObrasTable({
  obras,
  selectable = false,
  dataOnRowClick,
}: Props) {
  return (
    <div id="table-container" className="overflow-x-scroll flex-1">
      {obras && obras.length > 0 ? (
        <Table className="table table-striped" aria-labelledby="tabelLabel">
          <Thead>
            <Tr className="data-table-header">
              {selectable && <Th>#</Th>}
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
                key={uniqid()}
              >
                {selectable && (
                  <Td className="!border-r-slate-100">
                    <Checkbox
                      className="bg-white rounded"
                      // Add onchange or wtv
                    />
                  </Td>
                )}
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
        <SemDadosPlaceHolder />
      )}
    </div>
  );
}
