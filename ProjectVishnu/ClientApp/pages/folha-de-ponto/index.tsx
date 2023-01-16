import { Spinner, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchFolhaDePontoAllByMercado } from "../../common/APICalls";
import FilterBar  from "../../components/FilterBar";

export default function FolhasDePonto() {
  const [folhasDePonto, setFolhasDePonto] = useState(null);
  const [mercado, setMercado] = useState<string | null>(null);
  const router = useRouter();

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
      <h1 id="tabelLabel">Folhas De Ponto</h1>
      {contents}
    </div>
  );

  // TODO folhasDePonto type
  function renderFolhasDePontoTable(folhasDePonto: any) {
    return (
      <div>
        <FilterBar
          setMercado={setMercado}
          setSearchString={undefined}
          searchBar={undefined}
        />
        <Table className="" aria-labelledby="tabelLabel">
          <Thead>
            <Tr>
              <Th>Mes</Th>
              <Th>Ano</Th>
              <Th>Mercado</Th>
            </Tr>
          </Thead>
          <Tbody>
            {/* TODO check folhasdeponto type */}
            {folhasDePonto.map((folhaDePonto: any) => (
              <Tr
                className="hoverable-tr"
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
