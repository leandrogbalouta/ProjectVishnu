import IFuncionarioOutput from "../Funcionario/IFuncionarioOutput"

export default interface IFolhaDePontoOutput {
    info : FolhaDePontoInfo,
    funcWorkDays : Record<string, Record<number, number>>,
    funcionarios : IFuncionarioOutput[]
    finalValue : Record<string, number>,
    limits : number[],
    saturdays : number[],
    sundays : number[],
    holidays : number[]
}

export interface FolhaDePontoInfo {
    ano : string,
    mes : string
}
