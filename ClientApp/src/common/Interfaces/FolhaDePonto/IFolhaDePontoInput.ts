import IFuncionarioInput from "../Funcionario/IFuncionarioInput"

export default interface FolhaDePontoValuesInput{
    values : FuncDaysOfWorkInput[]
}

export interface FuncDaysOfWorkInput{
    func : IFuncionarioInput,
    dias : WorkDaysInput[],
    valorFinal? : number
}

interface WorkDaysInput{
    dia : number,
    horas : number
}