
import IFuncionarioInput from "./Interfaces/Funcionario/IFuncionarioInput";
import IObraOutput from "./Interfaces/Obra/IObraOutput";
export async function fetchFuncionarios(filters: Record<string, string>) {
  var path = "/api/funcionarios";
  path = addFiltersToQuery(path, filters);
  return fetch(path);
}

export async function fetchFuncionario(id: string) {
  const path = `/api/funcionarios/${id}`;
  return fetch(path);
}

export async function CreateFuncionario(functionario: IFuncionarioInput) {
  const path = "/api/funcionarios";
  return fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(functionario),
  });
}

export async function CreateObra(obra: IObraOutput) {
  const path = "/api/obras";
  return fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obra),
  });
}

export async function fetchObras(filters: Record<string, string>) {
  var path = "/api/obras";
  path = addFiltersToQuery(path, filters);
  return fetch(path);
}

export async function fetchObra(codigo: string) {
  const path = `/api/obras/${codigo}`;
  return fetch(path);
}

export async function createFolhaDePonto(
  mes: string,
  ano: string,
  codigo: string
) {
  const path = `/api/obras/${codigo}/folha-de-ponto`;
  return fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mes: mes,
      ano: ano,
    }),
  });
}

export async function fetchFolhaDePontoByObra(
  codigo: string,
  mes: string,
  ano: string
) {
  const path = `/api/obras/${codigo}/folha-de-ponto/${ano}-${mes}`;
  return fetch(path);
}

export async function fetchFolhaDePontoByMercado(
  mercado: string,
  mes: number,
  ano: number
) {
  const path = `/api/folha-de-ponto/${mercado}/${ano}-${mes}`;
  return fetch(path);
}
// TODO check valus type
export async function submitFolhaDePontoValues(
  codigo: string,
  mes: number,
  ano: number,
  values: any
) {
  const path = `/api/obras/${codigo}/folha-de-ponto/${ano}-${mes}`;

  console.log(values);
  return fetch(path, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      values: values,
    }),
  });
}

export async function fetchFolhaDePontoAllByobra(codigo: string) {
  const path = `/api/obras/${codigo}/folha-de-ponto`;
  return fetch(path);
}

export async function fetchFolhaDePontoAllByMercado(mercado: string) {
  const path = `/api/folha-de-ponto/${mercado ?? ''}`;
  console.log("pa: " + path);
  return fetch(path);
}

function addFiltersToQuery(path: string, filters: Record<string, String>) {
  var size = Object.keys(filters).length;
  if (size > 0) {
    var i = 1;
    path = path.concat("?");
    Object.keys(filters).forEach((key) => {
      var hasPrev = false;
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
