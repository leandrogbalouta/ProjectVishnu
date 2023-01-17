import IFuncionarioOutput from "../Funcionario/IFuncionarioOutput"

export default interface IFolhaDePontoOutput {
    info : FolhaDePontoInfo,
    funcWorkDays : Map<string, Map<number, number>>,
    funcionarios : IFuncionarioOutput[]
    finalValue : Map<string, number>,
    limits : number[],
    saturdays : number[],
    sundays : number[],
    holidays : number[]
}

export interface FolhaDePontoInfo {
    ano : string,
    mes : string
}
