import { Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import IFolhaDePontoInfoModel from "../../common/Interfaces/FolhaDePonto/IFolhaDePontoInfoModel";
import { useNavigate, useParams } from "react-router-dom";
import SemDadosPlaceHolder from "../SemDadosPlaceHolder";

export default function FolhaDePontoForFuncionarioTable({
  folhasDePonto,
}: {
  folhasDePonto: any;
}) {
  const navigate = useNavigate();
  const { codigo } = useParams();
  async function redirectToFolhaDePonto(folhaDePonto: any) {
    navigate(
      `/obras/${codigo}/folha-de-ponto/${folhaDePonto.ano}-${folhaDePonto.mes}`
    );
  }
  return (
    <div
      id="table-wrapper"
      className="flex-1 bg-white dark:bg-inherit rounded p-1"
    >
      {folhasDePonto && folhasDePonto.length > 0 ? (
        <Table className="overflow-scroll" aria-labelledby="tabelLabel">
          <Thead>
            <Tr className="data-table-header">
              <Th>Mes</Th>
              <Th>Ano</Th>
            </Tr>
          </Thead>
          <Tbody>
            {/* TODO check folhasdeponto type */}
            {folhasDePonto.map((folhaDePonto: IFolhaDePontoInfoModel) => (
              <Tr
                className="data-table-row"
                key={`${folhaDePonto.ano}${folhaDePonto.mes}`}
                onClick={() => redirectToFolhaDePonto(folhaDePonto)}
              >
                <Td>{folhaDePonto.mes}</Td>
                <Td>{folhaDePonto.ano}</Td>
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
