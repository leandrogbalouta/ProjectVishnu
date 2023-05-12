import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import IFolhaDePontoOutput from "../../common/Interfaces/FolhaDePonto/IFolhaDePontoOutput";
import IFuncionarioOutput from "../../common/Interfaces/Funcionario/IFuncionarioOutput";
import FolhaDePontoValuesInput, {
  FuncDaysOfWorkInput,
} from "../../common/Interfaces/FolhaDePonto/IFolhaDePontoInput";
import IFuncionarioInput from "../../common/Interfaces/Funcionario/IFuncionarioInput";
import SemDadosRow from "../SemDadosPlaceHolder";
import SemDadosPlaceHolder from "../SemDadosPlaceHolder";

type FolhaDePontoTableProps = {
  folhaDePontoData: IFolhaDePontoOutput;
  submitValues?: (values: FolhaDePontoValuesInput) => {};
  //acrescentar as funções necessárias
};

export function AddFolhaDePontoTable({
  folhaDePontoData,
  submitValues,
}: FolhaDePontoTableProps) {
  async function formatValues() {
    const firstDay = folhaDePontoData.limits[0];
    const endOfMonth = folhaDePontoData.limits[1];
    const lastDay = folhaDePontoData.limits[2];
    let values: FolhaDePontoValuesInput = { values: [] };

    folhaDePontoData.funcionarios.forEach((func) => {
      let funcValues: FuncDaysOfWorkInput = {
        func: func as IFuncionarioInput,
        dias: [],
      };
      let day = firstDay;
      for (day; day != lastDay; day = (day + 1) % endOfMonth) {
        if (day == 0) day = endOfMonth;
        let hours: string | number = document.getElementById(
          `Func${func.id}Day${day}`
        )!.innerHTML;
        if (hours === "") hours = 0;
        else hours = Number(hours);
        funcValues.dias.push({
          dia: day,
          horas: hours,
        });
      }

      let hours: string | number = document.getElementById(
        `Func${func.id}Day${lastDay}`
      )!.innerHTML;
      if (hours === "") hours = 0;
      else hours = Number(hours);
      funcValues.dias.push({
        dia: lastDay,
        horas: hours,
      });

      // VER SE SALARIO FINAL É DIFERENTE DO SALARIO FINAL RECEBIDO E SE FOR, ENVIAR ESSE VALOR
      let finalValue: string | number = Number(
        document.getElementById(`Val${func.id}`)!.innerHTML
      );
      if (
        folhaDePontoData.finalValue!! &&
        finalValue != folhaDePontoData.finalValue[func.nif]
      )
        funcValues.valorFinal = finalValue;

      values.values.push(funcValues);
    });

    submitValues!(values);
  }

  // async function fetchDataByMercado(){
  //     const [ano, mes] = data.split("-")
  //     const res = await fetchFolhaDePontoByMercado(mercado, ano, mes)
  //     const jsonInfo = await res.json()
  //     setInfo(jsonInfo)
  // }

  // async function fetchDataByObra(){
  //     const [ano, mes] = data.split("-")
  //     const res = await fetchFolhaDePontoByMercado(codigo, ano, mes)
  //     const jsonInfo = await res.json()
  //     setInfo(jsonInfo)
  // }

  return renderTable(folhaDePontoData);

  function renderTable(folhaDePontoData: IFolhaDePontoOutput) {
    const days = getHeaderDaysColumns(folhaDePontoData);
    const funcRows = getFuncRows(folhaDePontoData, days);

    return (
      <div>
        <div className="overflow-auto py-1 pb-3">
          {funcRows && funcRows.length > 0 ? (
            <Table
              size="sm"
              variant="unstyled"
              className="ring-4 ring-slate-300 overflow-auto p-1"
              aria-labelledby="tabelLabel"
            >
              <Thead>
                <Tr>
                  <Th className="dark:bg-slate-800 bg-white ring-1 ring-slate-300 sticky left-0">
                    Funcionario
                  </Th>
                  {days}
                  <Th className="border-collapse border-2 border-slate-300">
                    Salário Final
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {Object.entries(funcRows!).map((f) => (
                  <Tr key={f[1].func.id}>
                    <Td className="data-table-row">{f[1].func.nome}</Td>
                    {f[1].data}
                    {!folhaDePontoData.finalValue && (
                      <Td
                        className="border-collapse border-2 border-slate-300"
                        id={`Val${f[1].func.id}`}
                        contentEditable={submitValues !== undefined}
                      ></Td>
                    )}
                    {folhaDePontoData.finalValue && (
                      <Td
                        className="border-collapse border-2 border-slate-300"
                        id={`Val${f[1].func.id}`}
                        contentEditable={submitValues !== undefined}
                      >
                        {
                          folhaDePontoData.finalValue[
                            f[1].func.nif as keyof Record<string, number>
                          ]
                        }
                      </Td>
                    )}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <SemDadosPlaceHolder />
          )}
        </div>
        {submitValues! && (
          <div
            id="button-container"
            className="flex flex-col sm:flex-row sm:justify-end"
          >
            <Button
              type="button"
              colorScheme="blue"
              onClick={() => formatValues()}
            >
              Submeter
            </Button>
          </div>
        )}
      </div>
    );
  }

  function getFuncRows(
    folhaData: IFolhaDePontoOutput,
    days: React.ReactElement[]
  ): { func: IFuncionarioOutput; data: React.ReactElement[] }[] {
    const funcRows: { func: IFuncionarioOutput; data: React.ReactElement[] }[] =
      [];

    folhaData.funcionarios.forEach((func) => {
      funcRows.push({ func: func, data: [] });
    });

    funcRows.forEach((row) => {
      days.forEach((day) => {
        let hours = 0;
        if (folhaData.funcWorkDays) {
          let funcNif = row.func.nif as keyof Record<
            string,
            Map<number, number>
          >;
          let daysOfFunc = folhaData.funcWorkDays[funcNif];
          let dayNumber = day.props.children as keyof Object;
          if (daysOfFunc === undefined) hours = 0;
          else hours = daysOfFunc[dayNumber] as unknown as number;
        }

        if (hours != 0) {
          row.data.push(
            <Td
              contentEditable={submitValues !== undefined}
              id={`Func${row.func.id}Day${day.props.children}`}
              className={getClassName(folhaData, day.props.children)}
            >
              {hours}
            </Td>
          );
        } else {
          row.data.push(
            <Td
              contentEditable={submitValues !== undefined}
              id={`Func${row.func.id}Day${day.props.children}`}
              className={getClassName(folhaData, day.props.children)}
            ></Td>
          );
        }
      });
    });

    return funcRows;
  }
}

function getHeaderDaysColumns(data: IFolhaDePontoOutput): React.ReactElement[] {
  const days = [];
  const firstDay = data.limits[0];
  const endOfMonth = data.limits[1];
  const lastDay = data.limits[2];
  let day = firstDay;

  for (day; day != lastDay; day = (day + 1) % endOfMonth) {
    if (day == 0) day = endOfMonth;
    days.push(<Th className={getClassName(data, day)}>{day}</Th>);
  }
  days.push(<Th className={getClassName(data, lastDay)}>{lastDay}</Th>);

  return days;
}

function getClassName(data: IFolhaDePontoOutput, day: number) {
  let className = "border-2 border-slate-300";
  if (data.saturdays.includes(day)) {
    className = className.concat(" bg-blue-300");
  } else if (data.sundays.includes(day)) {
    className = className.concat(" bg-orange-400");
  } else if (data.holidays.includes(day)) {
    className = className.concat(" bg-red-900");
  }
  return className;
}
