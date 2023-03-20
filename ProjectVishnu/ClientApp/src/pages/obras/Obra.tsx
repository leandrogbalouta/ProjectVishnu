import React, { ChangeEvent, useEffect, useState } from "react";
import {
  fetchObra,
  createFolhaDePonto,
  fetchFolhaDePontoAllByobra as fetchFolhaDePontoAllByObra,
  fetchMercados,
  fetchFuncionariosForObra,
} from "../../common/APICalls";
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
import IObraOutput from "../../common/Interfaces/Obra/IObraOutput";
import IFolhaDePontoOutput from "../../common/Interfaces/FolhaDePonto/IFolhaDePontoOutput";
import FolhaDePontoObra from "../folha-de-ponto/FolhaDePonto";
import IFolhaDePontoInfoModel from "../../common/Interfaces/FolhaDePonto/IFolhaDePontoInfoModel";
import { useNavigate, useParams } from "react-router-dom";
import FuncionariosTable from "../../components/FuncionariosTable";
import IFuncionarioObraOutputModel from "../../common/Interfaces/Funcionario/IFuncionarioObraOutputModel";
import FuncionariosPorObraTable from "../../components/FuncionariosPorObraTable";

export default function Obra() {
  const navigate = useNavigate();
  const [obra, setObra] = useState(null);
  const [folhasDePonto, setFolhasDePonto] = useState(null);
  const [funcionarios, setFuncionarios] = useState<
    IFuncionarioObraOutputModel[]
  >([]);
  const { codigo } = useParams();
  const date = new Date();
  const [data, setData] = useState(
    `${date.getFullYear()}-${date.getMonth() + 1}`
  );
  const [workDays, setWorkDays] = useState(1)
  // TODO: check this
  const handleDateChange = (event: any) => {
    setData(event!.target!.value!);
  };
  const handleWorkDaysChange = (event: any) => {
    setWorkDays(event!.target!.value!);
  }

  let contents = obra === null ? <Spinner /> : renderObra(obra, folhasDePonto);

  // check this
  async function submitFolhaDePonto() {
    if(workDays < 1 || workDays > 31){} //TODO: THROW ALERT
    const monthInput = document.getElementById("date");
    const date = monthInput!.nodeValue!;
    const [ano, mes] = data.split("-");

    const resp = await createFolhaDePonto(mes, ano, workDays, codigo!);
    const respData = await resp.json();
    const location = resp.headers.get("location");
    const result = location?.split(`${codigo}/`)[1];
    console.log(`Location here ${result}`);
    navigate(result!, { state: respData });
  }

  async function redirectToFolhaDePonto(folhaDePonto: any) {
    navigate(
      `/obras/${codigo}/folha-de-ponto/${folhaDePonto.ano}-${folhaDePonto.mes}`
    );
  }

  useEffect(() => {
    (async () => {
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
      const populateFuncionarios = async () => {
        const response = await fetchFuncionariosForObra(codigo!);
        const data = await response.json();
        setFuncionarios(data);
      };
      await populateObraData();
      await populateFuncionarios();
      await populateFolhasDePontoData();
    })();
  }, [codigo]);

  return <div className="flex h-full w-full">{contents}</div>;

  function renderObra(obra: IObraOutput, folhasDePonto: any) {
    return (
      <div className="flex flex-col h-full w-full">
        <div className="p-6 mb-3 bg-slate-800 text-cyan-100 rounded-xl">
          <p className="text-xl font-bold ">Detalhes de obra:</p>
          <div className="flex justify-between flex-wrap gap-3">
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
            <div>
              <p className="obra-heading">Estado</p>
              <p className="capitalize">{obra.estado}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row flex-1 gap-3">
          <div
            id="table-container"
            className="flex-1 gap-6 p-6 mb-3 bg-slate-800 rounded-xl flex flex-col overflow-auto"
          >
            <p className="text-lg font-bold text-cyan-100">Folhas de ponto:</p>
            <div className="flex-1 bg-white dark:bg-inherit">
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
                    folhasDePonto.map(
                      (folhaDePonto: IFolhaDePontoInfoModel) => (
                        <Tr
                          className="data-table-row"
                          key={`${folhaDePonto.ano}${folhaDePonto.mes}`}
                          onClick={() => redirectToFolhaDePonto(folhaDePonto)}
                        >
                          <Td>{folhaDePonto.mes}</Td>
                          <Td>{folhaDePonto.ano}</Td>
                        </Tr>
                      )
                    )}
                </Tbody>
              </Table>
            </div>
          </div>
          <div
            id="table-container"
            className="flex-3 gap-6 p-6 mb-3 bg-slate-800 rounded-xl flex flex-col overflow-auto"
          >
            <p className="text-lg font-bold text-cyan-100">Funcionarios:</p>
            <div className="flex-1 bg-white dark:bg-inherit">
              <FuncionariosPorObraTable funcionarios={funcionarios} />
            </div>
          </div>
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
              onChange={handleDateChange}
            />
            <Input
              type="number"
              id="workDays"
              value={workDays}
              min="1"
              max="31"
              onChange={handleWorkDaysChange}
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
