import React, { ChangeEvent, useEffect, useState } from "react";
import {
  fetchObra,
  createFolhaDePonto,
  fetchFolhaDePontoAllByobra as fetchFolhaDePontoAllByObra,
  fetchMercados,
} from "../../../common/APICalls";
import {
  Button,
  Input,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import IObraOutput from "../../../common/Interfaces/Obra/IObraOutput";
import { useRouter } from "next/router";
import IFolhaDePontoOutput from "../../../common/Interfaces/FolhaDePonto/IFolhaDePontoOutput";
import FolhaDePontoObra from "./folha-de-ponto/[data]";
import IFolhaDePontoInfoModel from "../../../common/Interfaces/FolhaDePonto/IFolhaDePontoInfoModel";

export default function Obra() {
  const router = useRouter();
  const [obra, setObra] = useState(null);
  const [folhasDePonto, setFolhasDePonto] = useState(null);
  const codigo = router.query.codigo?.toString();
  const date = new Date();
  const [data, setData] = useState(
    `${date.getFullYear()}-${date.getMonth() + 1}`
  );
  // TODO: check this
  const handleChange = (event: any) => {
    setData(event!.target!.value!);
  };

  let contents = obra === null ? <Spinner /> : renderObra(obra, folhasDePonto);

  // check this
  async function submitFolhaDePonto() {
    const monthInput = document.getElementById("date");
    const date = monthInput!.nodeValue!;
    const [ano, mes] = data.split("-");

    const resp = await createFolhaDePonto(mes, ano, codigo!);
    const respData = await resp.json();
    const location = resp.headers.get("location");
    const array = location!.split("4000"); //FIXME: fix this somehow???
    const result = array.pop();
    console.log(result);
    // double check this workin
    router.push(
      { pathname: result!, query: { info: JSON.stringify(respData) } },
      result!
    );
  }

  async function redirectToFolhaDePonto(folhaDePonto: any) {
    router.push(
      `/obras/${codigo}/folha-de-ponto/${folhaDePonto.ano}-${folhaDePonto.mes}`
    );
  }

  useEffect(() => {
    const populateObraData = async () => {
      const response = await fetchObra(codigo!);
      const data = await response.json();
      setObra(data);
    };
    const populateFolhasDePontoData = async () => {
      const response = await fetchFolhaDePontoAllByObra(codigo!);
      const data = await response.json();
      setFolhasDePonto(data);
    };
    populateObraData();
    populateFolhasDePontoData();
  }, [codigo]);

  return <div className="flex h-full w-full">{contents}</div>;

  function renderObra(obra: IObraOutput, folhasDePonto: any) {
    return (
      <div className="flex flex-col h-full w-full">
        <div className="p-3 mb-3 bg-slate-800 text-cyan-100 rounded-xl">
          <p className="text-xl font-bold ml-3">Detalhes de obra:</p>
          <div className="flex justify-between m-3 flex-wrap gap-3">
            <div>
              <p className="obra-heading">Código interno</p>
              <p>{obra.codigoInterno}</p>
            </div>
            <div>
              <p className="obra-heading">Designação</p>
              <p>{obra.designacao}</p>
            </div>
            <div>
              <p className="obra-heading">Cliente</p>
              <p>{obra.cliente}</p>
            </div>
            <div>
              <p className="obra-heading">Data de inicio</p>              
              <p>{obra.datainicio}</p>
            </div>
            <div>
              <p className="obra-heading">Mercado</p>
              <p className="capitalize">{obra.mercado}</p>
            </div>
            </div>

        </div>
        <div id="table-container" className="flex-1 overflow-scroll">
          <Table className="overflow-scroll" aria-labelledby="tabelLabel">
            <Thead>
              <Tr className="data-table-header">
                <Th>Mes</Th>
                <Th>Ano</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* TODO check folhasdeponto type */}
              {folhasDePonto &&
                folhasDePonto.map((folhaDePonto: IFolhaDePontoInfoModel) => (
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
        </div>
        <div id="create-folha-de-ponto-container">
          <label htmlFor="date">Data de início:</label>
          <div id="create-folha-de-ponto-inner-container" className="flex">
            <Input
              type="month"
              id="date"
              value={data}
              min="2018-01"
              max="2050-12"
              onChange={handleChange}
            />
            <div id="button-container">
              <Button
                colorScheme="blue"
                className="p-1"
                onClick={() => submitFolhaDePonto()}
              >
                Criar Folha de Ponto
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
