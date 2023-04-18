import { Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import IFolhaDePontoInfoModel from "../../common/Interfaces/FolhaDePonto/IFolhaDePontoInfoModel";
import SemDadosPlaceHolder from "../SemDadosPlaceHolder";

export default function FolhasDePontoTable({
  folhasDePonto,
  mercado,
}: {
  folhasDePonto: IFolhaDePontoInfoModel[];
  mercado: string;
}) {
  const navigate = useNavigate();
  async function redirectToFolhaDePonto(
    mes: string,
    ano: string,
    mercado: string
  ) {
    navigate(`/folha-de-ponto/${mercado}/${ano}-${mes}`);
  }
  return (
    <div id="table-container" className="overflow-x-scroll flex-1">
      {folhasDePonto && folhasDePonto.length > 0 ? (
        <Table className="" aria-labelledby="tabelLabel">
          <Thead>
            <Tr className="data-table-header">
              <Th>Mes</Th>
              <Th>Ano</Th>
              <Th>Mercado</Th>
            </Tr>
          </Thead>
          <Tbody>
            {folhasDePonto.map((folhaDePonto, index) => (
              <Tr
                className="data-table-row"
                key={index}
                onClick={() =>
                  redirectToFolhaDePonto(
                    folhaDePonto.mes,
                    folhaDePonto.ano,
                    mercado!
                  )
                }
              >
                <Td>{folhaDePonto.mes}</Td>
                <Td>{folhaDePonto.ano}</Td>
                <Td className="capitalize">{mercado}</Td>
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
