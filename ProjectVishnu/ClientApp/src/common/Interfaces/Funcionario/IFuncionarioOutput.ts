export default interface IFuncionarioOutput {
  id: number;
  nome: string;
  dtnascimento: string | undefined;
  telemovel: string;
  contactoemergencia: string;
  nacionalidade: string;
  mercado: string;
  tipodocident: string;
  docident: string;
  passaporte: string | undefined;
  validadedocident: string | undefined;
  catprof: string;
  nif: string;
  niss: string;
  morada: string;
  contratoinicio: string | undefined;
  contratofim: string | undefined;
  vencimentobase: number;
  tiposalario: string;
  salarioreal: number;
  calcado: number | undefined;
  cartaconducao: boolean;
  iban: string;
}