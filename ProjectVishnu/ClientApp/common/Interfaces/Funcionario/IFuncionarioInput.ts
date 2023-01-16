export default interface IFuncionarioInput {
  nome: string;
  dtnascimento: string | undefined;
  telemovel: string;
  contactoemergencia: string;
  nacionalidade: string;
  mercado: string;
  tipodocident: string;
  docident: string;
  tituloresidencia: string | undefined;
  manifestacaointeresse: string | undefined;
  validadedocident: string | undefined;
  catprof: string;
  nif: string;
  niss: string;
  Morada: string;
  contratoinicio: string | undefined;
  contratofim: string | undefined;
  vencimentobase: number;
  tiposalario: string;
  salarioreal: number;
  calcado: number | undefined;
  cartaconducao: string;
  iban: string;
}
