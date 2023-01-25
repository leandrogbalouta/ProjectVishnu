import { Spinner, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchFolhaDePontoAllByMercado } from "../../common/APICalls";
import FilterBar from '../../components/FilterBar';
import IFolhaDePontoOutput from '../../common/Interfaces/FolhaDePonto/IFolhaDePontoOutput';
import IFolhaDePontoInfoModel from '../../common/Interfaces/FolhaDePonto/IFolhaDePontoInfoModel';

export default function FolhasDePonto() {
  const [folhasDePonto, setFolhasDePonto] = useState(null);
  const [mercado, setMercado] = useState<string | null>("portugal");
  const router = useRouter();
  console.log(router.query)
  

  async function redirectToFolhaDePonto(
    mes: string,
    ano: string,
    mercado: string
  ) {
    router.push(`/folha-de-ponto/${mercado}/${ano}-${mes}`);
  }

  let contents =
    folhasDePonto === null ? (
      <Spinner/>
    ) : (
      renderFolhasDePontoTable(folhasDePonto)
    );

  useEffect(() => {
    const populateFolhasDePontoData = async () => {
      const response = await fetchFolhaDePontoAllByMercado(mercado!);
      const data = await response.json();
      setFolhasDePonto(data);
    };
    populateFolhasDePontoData();
  }, [mercado]);

  return (
    <div>
      <h1 className="text-center text-4xl mb-5">Folhas De Ponto</h1>
      {contents}
    </div>
  );

  // TODO: folhasDePonto type
  function renderFolhasDePontoTable(folhasDePonto: IFolhaDePontoInfoModel[]) {
    return (
      <div>
        <FilterBar
          searchBar
          setMercado={setMercado}
          setSearchString={undefined}
        />
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
      </div>
    );
  }
}
