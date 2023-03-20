import { Button, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GetFuncionariosValidityWarningCount,
  GetFuncionariosValidityWarningList,
  fetchFuncionarios,
} from "../../common/APICalls";
import FilterBar from "../../components/FilterBar";
import FuncionariosTable from "../../components/tables/FuncionariosTable";

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState();
  const [mercado, setMercado] = useState(null);
  const [searchString, setSearchString] = useState(null);
  const [warningCount, setWarningCount] = useState(0);
  const [isWarningList, setWarningList] = useState<boolean>(false);
  const navigate = useNavigate();

  async function redirectToFuncionarioCreation() {
    navigate("/funcionarios/create");
  }

  let contents = !funcionarios ? (
    <Spinner size="xl" className="m-auto" />
  ) : (
    <FuncionariosTable funcionarios={funcionarios} />
  );
  useEffect(() => {
    (async () => [populateData()])();
  }, [mercado, searchString]);

  async function populateData() {
    const filters = Object.assign(
      {},
      mercado === null ? null : { mercado: mercado },
      searchString === null ? null : { nome: searchString }
    );

    populateFuncionariosData(filters);
    GetWarningCount();
  }

  return (
    <div className="flex flex-col flex-1 h-full">
      <h1 className="text-center text-4xl mb-5">Funcionarios</h1>
      <FilterBar
        setMercado={setMercado}
        setSearchString={setSearchString}
        searchBar
      />
      {warningCount > 0 && !isWarningList && (
        <div
          className="select-none flex flex-col p-3 my-3 justify-center rounded-lg border-4 border-red-900 bg-red-300 text-black text-2xl font-bold hover:bg-red-400 cursor-pointer text-center"
          onClick={() => {
            GetWarningList();
          }}
        >
          <p>
            {warningCount === 1
              ? `Foi encontrado ${warningCount} funcionario `
              : `Foram encontrados ${warningCount} funcionarios `}
            com documentos de identificação prestes a expirar.
          </p>
          <p> Clique aqui para ver a lista.</p>
        </div>
      )}
      {isWarningList && (
        <div
          className="select-none flex justify-center p-3 my-3 rounded-lg border-4 border-blue-900 bg-slate-300 text-black text-2xl font-bold hover:bg-slate-400  cursor-pointer "
          onClick={() => {
            setWarningList(false);
            populateData();
          }}
        >
          Voltar à listagem global de funcionários
        </div>
      )}
      {contents}
      <div id="button-container" className="flex justify-end mt-3">
        <Button
          onClick={() => redirectToFuncionarioCreation()}
          colorScheme="blue"
        >
          Criar
        </Button>
      </div>
    </div>
  );
  async function populateFuncionariosData(filters: Record<string, string>) {
    const response = await fetchFuncionarios(filters).then((res) => res.json());
    setFuncionarios(response);
  }

  async function GetWarningCount() {
    const response = await GetFuncionariosValidityWarningCount().then((res) =>
      res.json()
    );
    setWarningCount(response);
  }

  async function GetWarningList() {
    const response = await GetFuncionariosValidityWarningList().then((res) =>
      res.json()
    );
    setFuncionarios(response);
    setWarningList(true);
  }
}
