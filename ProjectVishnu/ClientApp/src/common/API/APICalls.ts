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
    Authorization: `Bearer ${localStorage.getItem("DKMToken")}`,
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
export function fetchMercado(
  nome: string
): Promise<AxiosResponse<IMercadoOutput>> {
  return instance.get(`/mercados/${nome}`);
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
export function getPastObrasFuncionario(
  funcId: number
): Promise<AxiosResponse> {
  return instance.get(`/funcionarios/${funcId}/obras/past`);
}
export function getCurrentObraFuncionario(
  funcId: number
): Promise<AxiosResponse> {
  return instance.get(`/funcionarios/${funcId}/obras/current`);
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
  date: string
): Promise<AxiosResponse> {
  const path = `funcionarios/${id}/obras`;
  return instance.put(path, JSON.stringify(date));
}

export async function uploadFilesToObra(codigo: string, files: File[]) {
  const path = `obras/${codigo}/autos-medicao/upload`;
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }

  try {
    const response = await instance.post(path, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    // Handle the error appropriately
    console.error("Error uploading files to Obra:", error);
    throw error;
  }
}

export async function getAutosMedicao(codigo: string) {
  return instance.get(`obras/${codigo}/autos-medicao`);
}
export async function deleteAutoMedicao(codigo: string, fileName: string) {
  return instance.delete(`obras/${codigo}/autos-medicao/${fileName}`);
}
export async function downloadAutoMedicao(codigo: string, fileName: string) {
  return instance.get(`obras/${codigo}/autos-medicao/${fileName}`, {
    responseType: "blob",
  });
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
