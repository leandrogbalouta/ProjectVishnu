import IFuncionarioOutput from "./IFuncionarioOutput";

export default interface IFuncionarioInput {
  nome: string;
  dtnascimento: Date | undefined;
  telemovel: string;
  contactoemergencia: string;
  nacionalidade: string;
  mercado: string;
  tipodocident: string;
  docident: string;
  tituloresidencia: string | undefined;
  manifestacaointeresse: string | undefined;
  validadedocident: Date | undefined;
  catprof: string;
  nif: string;
  niss: string;
  morada: string;
  contratoinicio: Date | undefined;
  contratofim: Date | undefined;
  vencimentobase: number;
  tiposalario: string;
  salarioreal: number;
  calcado: number | undefined;
  cartaconducao: boolean;
  iban: string;
}