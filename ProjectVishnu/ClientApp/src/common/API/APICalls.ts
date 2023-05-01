import axios, { AxiosInstance, AxiosResponse } from "axios";
import { ICategoriaProfissional } from "../Interfaces";
import { IContaInput } from "../Interfaces/Conta";
import { FolhaDePontoValuesInput } from "../Interfaces/FolhaDePonto";
import { IFuncionarioInput } from "../Interfaces/Funcionario";
import { IMercadoOutput } from "../Interfaces/Mercado";
import { IObraOutput } from "../Interfaces/Obra";



const instance: AxiosInstance = axios.create({
  baseURL: "/api/",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("DKMToken")}`
  },
});
// Instance related
export function changeInstanceToken(token: string) {
  instance.defaults.headers["Authorization"] = `Bearer ${token}`;
  //instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
// Tipos de documento
export function fetchTiposDocumento(): Promise<AxiosResponse> {
  return instance.get("/tiposdoc");
}

// Mercados
export function fetchMercados(): Promise<AxiosResponse> {
  return instance.get("/mercados");
}

export function createMercado(mercado: IMercadoOutput): Promise<AxiosResponse> {
  return instance.post("/mercados", mercado);
}

// Categorias Profissionais
export function fetchCategoriasProfissionais(): Promise<AxiosResponse> {
  return instance.get("/categorias-profissionais");
}
export function createCategoriaProfissional(
  categoriaProfissional: ICategoriaProfissional
): Promise<AxiosResponse> {
  return instance.post("/categorias-profissionais", categoriaProfissional);
}
// Funcionario
export function fetchFuncionarios(
  filters: Record<string, string>
): Promise<AxiosResponse> {
  const queryParams = new URLSearchParams(filters).toString();
  return instance.get(`/funcionarios?${queryParams}`);
}

export function fetchFuncionario(id: string): Promise<AxiosResponse> {
  return instance.get(`/funcionarios/${id}`);
}

export function createFuncionario(
  funcionario: IFuncionarioInput
): Promise<AxiosResponse> {
  return instance.post("/funcionarios", funcionario);
}

export function addFuncionarioToObra(
  funcID: number,
  codigoInterno: string,
  date: string
): Promise<AxiosResponse> {
  const path = `/funcionarios/${funcID}/obras`;
  const body = { codigoInterno, date };
  return instance.post(path, body);
}

export function getFuncionariosValidityWarningCount(): Promise<AxiosResponse> {
  return instance.get("/funcionarios/validity/count");
}

export function getFuncionariosValidityWarningList(): Promise<AxiosResponse> {
  return instance.get("/funcionarios/validity/list");
}

// Obra
export function createObra(obra: IObraOutput): Promise<AxiosResponse> {
  return instance.post("/obras", obra);
}

export function fetchObras(
  filters?: Record<string, string>
): Promise<AxiosResponse> {
  const queryParams = new URLSearchParams(filters).toString();
  const path = `/obras${queryParams ? `?${queryParams}` : ""}`;
  return instance.get(path);
}

export function fetchObra(codigo: string): Promise<AxiosResponse> {
  return instance.get(`/obras/${codigo}`);
}

export function addObraToFunc(): Promise<AxiosResponse> {
  return Promise.reject(new Error("Not implemented"));
}

export function fetchObrasForFuncionario(
  funcionarioId: string
): Promise<AxiosResponse> {
  return instance.get(`/obras/funcionario/${funcionarioId}`);
}

export async function fetchFuncionariosForObra(
  codigo: string
): Promise<AxiosResponse> {
  const path = `obras/${codigo}/funcionarios/current`;
  return instance.get(path);
}

export async function removeFuncionarioDeObra(
  id: number,
  dataDefim: string
): Promise<AxiosResponse> {
  const path = `funcionarios/${id}/obras`;
  return instance.put(path, { dataDefim });
}

export async function uploadFilesToObra(
  codigo: string,
  formData : FormData
){
  instance.defaults.headers["Content-Type"] = 'multipart/form-data';
  const path = `obras/${codigo}/upload`
  console.log(formData.getAll('files'))

  return instance.post(path, formData)
}

// Folha de ponto
export async function createFolhaDePonto(
  mes: string,
  ano: string,
  workDays: number,
  codigo: string
): Promise<AxiosResponse> {
  const path = `obras/${codigo}/folha-de-ponto`;
  return instance.post(path, { mes, ano, workDays });
}

export async function fetchFolhaDePontoByObra(
  codigo: string,
  mes: string,
  ano: string
): Promise<AxiosResponse> {
  const path = `obras/${codigo}/folha-de-ponto/${ano}-${mes}`;
  return instance.get(path);
}

export async function fetchFolhaDePontoByMercado(
  mercado: string,
  mes: string,
  ano: string
): Promise<AxiosResponse> {
  const path = `folha-de-ponto/${mercado}/${ano}-${mes}`;
  return instance.get(path);
}

export async function submitFolhaDePontoValues(
  codigo: string,
  mes: string,
  ano: string,
  values: FolhaDePontoValuesInput
): Promise<AxiosResponse> {
  const path = `obras/${codigo}/folha-de-ponto/${ano}-${mes}`;
  return instance.put(path, { values: values.values });
}

export async function fetchFolhaDePontoAllByobra(
  codigo: string
): Promise<AxiosResponse> {
  const path = `obras/${codigo}/folha-de-ponto`;
  return instance.get(path);
}

export async function fetchFolhaDePontoAllByMercado(
  mercado: string
): Promise<AxiosResponse> {
  const path = `folha-de-ponto/${mercado ?? ""}`;
  return instance.get(path);
}

// Filters
function addFiltersToQuery(
  path: string,
  filters: Record<string, string>
): string {
  let size = Object.keys(filters).length;
  if (size > 0) {
    let i = 1;
    path = path.concat("?");
    Object.keys(filters).forEach((key) => {
      let hasPrev = false;
      if (filters[key] != null) {
        path = path.concat(`${key}=${filters[key]}`);
        hasPrev = true;
      }
      if (i < size) path = path.concat("&");
      i++;
    });
  }
  return path;
}
export async function createUser(user: IContaInput): Promise<AxiosResponse> {
  const path = "contas/create";
  return instance.post(path, {
    username: user.username,
    password: user.password,
    tipoDeUser: user.tipoDeUser,
  });
}

// Tipos de User
export async function fetchTiposDeUser(): Promise<AxiosResponse> {
  let path = "tipos-de-user/";
  return instance.get(path);
}

// DO NOT NEED TOKEN/INSTANCE
// Auth
export async function tryLogin(
  username: string,
  password: string
): Promise<AxiosResponse<string>> {
  const path = "contas/login";
  return instance.post(path, {
    username: username,
    password: password,
  });
}
