import IFolhaDePontoInput from "./Interfaces/FolhaDePonto/IFolhaDePontoInput";
import IFuncionarioInput from "./Interfaces/Funcionario/IFuncionarioInput";
import IObraOutput from "./Interfaces/Obra/IObraOutput";

// Tipos de documento
export async function fetchTiposDocumento(): Promise<Response> {
  let path = "/api/tiposdoc";
  return fetch(path);
}
// Mercados
export async function fetchMercados(): Promise<Response> {
  let path = "/api/mercados";
  return fetch(path);
}
// Categorias Profissionais
export async function fetchCategoriasProfissionais(): Promise<Response> {
  let path = "/api/categorias-profissionais";
  return fetch(path);
}
// Funcionario
export async function fetchFuncionarios(
  filters: Record<string, string>
): Promise<Response> {
  let path = "/api/funcionarios";
  path = addFiltersToQuery(path, filters);
  return fetch(path);
}
export async function fetchFuncionario(id: string): Promise<Response> {
  const path = `/api/funcionarios/${id}`;
  return fetch(path);
}

export async function CreateFuncionario(
  funcionario: IFuncionarioInput
): Promise<Response> {
  const path = "/api/funcionarios";
  return fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(funcionario),
  });
}

export async function AddFuncionarioToObra(
  funcID: number,
  codigoInterno: string,
  date: string
): Promise<Response> {
  // TODO isto teve de ser mudado
  const path = `/api/funcionarios/${funcID}/obras?codigoInterno=${codigoInterno}&date=${date}`;
  return fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify({
    //   codigoInterno: codigoInterno,
    //   date: date,
    // }),
  });
}

export async function GetFuncionariosValidityWarningCount(): Promise<Response> {
  const path = "/api/funcionarios/validity/count";
  return fetch(path);
}

export async function GetFuncionariosValidityWarningList(): Promise<Response> {
  const path = "/api/funcionarios/validity/list";
  return fetch(path);
}

// Obra
export async function CreateObra(obra: IObraOutput): Promise<Response> {
  const path = "/api/obras";
  return fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obra),
  });
}
export async function fetchObras(
  filters?: Record<string, string>
): Promise<Response> {
  let path = "/api/obras";
  if (filters) path = addFiltersToQuery(path, filters);
  return fetch(path);
}
export async function fetchObra(codigo: string): Promise<Response> {
  const path = `/api/obras/${codigo}`;
  return fetch(path);
}
export async function AddObraToFunc(): Promise<Response> {
  throw new Error("Implementa-me 😢");
}
export async function fetchObrasForFuncionario(
  funcionarioId: string
): Promise<Response> {
  const path = `/api/obras/funcionario/${funcionarioId}`;
  return fetch(path);
}
export async function fetchFuncionariosForObra(
  codigo: string
): Promise<Response> {
  const path = `/api/obras/${codigo}/funcionarios/current`;
  return fetch(path);
}
export async function removeFuncionarioDeObra(id: number, dataDefim: string): Promise<Response> {
  const path = `/api/funcionarios/${id}/obras`;
  return fetch(path, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataDefim),
  });
}
// Folha de ponto
export async function createFolhaDePonto(
  mes: string,
  ano: string,
  workDays: number,
  codigo: string
): Promise<Response> {
  const path = `/api/obras/${codigo}/folha-de-ponto`;
  return fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mes: mes,
      ano: ano,
      workDays: workDays,
    }),
  });
}
export async function fetchFolhaDePontoByObra(
  codigo: string,
  mes: string,
  ano: string
): Promise<Response> {
  const path = `/api/obras/${codigo}/folha-de-ponto/${ano}-${mes}`;
  return fetch(path);
}
export async function fetchFolhaDePontoByMercado(
  mercado: string,
  mes: string,
  ano: string
): Promise<Response> {
  const path = `/api/folha-de-ponto/${mercado}/${ano}-${mes}`;
  return fetch(path);
}
export async function submitFolhaDePontoValues(
  codigo: string,
  mes: string,
  ano: string,
  values: IFolhaDePontoInput
): Promise<Response> {
  const path = `/api/obras/${codigo}/folha-de-ponto/${ano}-${mes}`;
  return fetch(path, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      values: values.values,
    }),
  });
}

export async function fetchFolhaDePontoAllByobra(
  codigo: string
): Promise<Response> {
  const path = `/api/obras/${codigo}/folha-de-ponto`;
  return fetch(path);
}

export async function fetchFolhaDePontoAllByMercado(
  mercado: string
): Promise<Response> {
  const path = `/api/folha-de-ponto/${mercado ?? ""}`;
  return fetch(path);
}

// Filtes
function addFiltersToQuery(
  path: string,
  filters: Record<string, String>
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
// export async function tryLogin(
//   funcionario: IFuncionarioInput
// ): Promise<Response> {
//   const path = "/api/funcionarios";
//   return fetch(path, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(funcionario),
//   });
// }
