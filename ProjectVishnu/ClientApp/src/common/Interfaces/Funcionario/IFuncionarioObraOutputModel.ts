import IFuncionarioOutput from './IFuncionarioOutput';
export default interface IFuncionarioObraOutputModel {
  funcionario: IFuncionarioOutput;
  dataInicio: string | undefined;
  dataFim: string | undefined;
}
