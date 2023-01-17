import React, { useState } from "react";
import { CreateFuncionario } from "../../common/APICalls";
import { Input, Button } from "@chakra-ui/react";
import IFuncionarioInput from "../../common/Interfaces/Funcionario/IFuncionarioInput";
import { useRouter } from "next/router";
export default function FuncionarioCreation() {
  // Hooks
  const router = useRouter();
  // State
  const [nome, setNome] = useState("");
  const [dtnascimento, setDtnascimento] = useState("");
  const [telemovel, setTelemovel] = useState("");
  const [contactoemergencia, setContactoemergencia] = useState("");
  const [nacionalidade, setNacionalidade] = useState("");
  const [mercado, setMercado] = useState("");
  const [tipodocident, setTipodocident] = useState("");
  const [docident, setDocident] = useState("");
  const [tituloresidenica, setTituloresidenica] = useState("");
  const [manifestacaointeresse, setManifestacaointeresse] = useState("");
  const [validadedocident, setValidadedocident] = useState("");
  const [catprof, setCatprof] = useState("");
  const [nif, setNif] = useState("");
  const [niss, setNiss] = useState("");
  const [morada, setMorada] = useState("");
  const [contratoinicio, setContratoinicio] = useState("");
  const [contratofim, setContratofim] = useState("");
  const [vencimentobase, setVencimentobase] = useState("");
  const [tiposalario, setTiposalario] = useState("");
  const [salarioreal, setSalarioreal] = useState("");
  const [calcado, setCalcado] = useState("");
  const [cartaconducao, setCartaconducao] = useState("");
  const [iban, setIban] = useState("");

  async function AddFuncionario() {
    // Init funcionario
    const funcionario: IFuncionarioInput = {
      nome: nome,
      dtnascimento: dtnascimento,
      telemovel: telemovel,
      contactoemergencia: contactoemergencia,
      nacionalidade: nacionalidade,
      mercado: mercado,
      tipodocident: tipodocident,
      docident: docident,
      tituloresidencia: tituloresidenica,
      manifestacaointeresse: manifestacaointeresse,
      validadedocident: validadedocident,
      catprof: catprof,
      nif: nif,
      niss: niss,
      Morada: morada,
      contratoinicio: contratoinicio,
      contratofim: contratofim,
      vencimentobase: parseInt(vencimentobase),
      tiposalario: tiposalario,
      salarioreal: parseInt(salarioreal),
      calcado: parseInt(calcado),
      cartaconducao: cartaconducao,
      iban: iban,
    };
console.log(funcionario);
    const resp = await CreateFuncionario(funcionario);
    if (resp.status === 201) {
      const location = resp!.headers!.get("location")!.toLowerCase();
      const array = location.split("api");
      const result = array.pop();
      router.push(result!);
    }
  }

  return (
    <div className="h-full w-full">
      <h1 className="text-center text-4xl mb-5">Criar um Funcionário</h1>
      <form className="max-h-[80%] overflow-auto">
        <div className="grid grid-cols-2 gap-20">
          <div className="ml-10">
            <label htmlFor="nome">Nome</label>
            <Input
              type="text"
              name="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <label htmlFor="dtnascimento">Data de Nascimento</label>
            <Input
              type="date"
              name="dtnascimento"
              value={dtnascimento}
              onChange={(e) => setDtnascimento(e.target.value)}
            />

            <label htmlFor="telemovel">Telemóvel</label>
            <Input
              type="tel"
              name="telemovel"
              value={telemovel}
              onChange={(e) => setTelemovel(e.target.value)}
            />

            <label htmlFor="contactoemergencia">Contacto de emergência</label>
            <Input
              type="text"
              name="contactoemergencia"
              value={contactoemergencia}
              onChange={(e) => setContactoemergencia(e.target.value)}
            />

            <label htmlFor="nacionalidade">Nacionalidade</label>
            <Input
              type="text"
              name="nacionalidade"
              value={nacionalidade}
              onChange={(e) => setNacionalidade(e.target.value)}
            />

            <label htmlFor="mercado">Mercado</label>
            <Input
              type="text"
              name="mercado"
              value={mercado}
              onChange={(e) => setMercado(e.target.value)}
            />

            <label htmlFor="tipodocident">Tipo de documento de identificação</label>
            <Input
              type="text"
              name="tipodocident"
              value={tipodocident}
              onChange={(e) => setTipodocident(e.target.value)}
            />

            <label htmlFor="docident">Número do documento de identificação</label>
            <Input
              type="text"
              name="docident"
              value={docident}
              onChange={(e) => setDocident(e.target.value)}
            />

            <label htmlFor="tituloresidenica">Título de Residência</label>
            <Input
              type="text"
              name="tituloresidenica"
              value={tituloresidenica}
              onChange={(e) => setTituloresidenica(e.target.value)}
            />

            <label htmlFor="manifestacaointeresse">Manifestação de interesse</label>
            <Input
              type="text"
              name="manifestacaointeresse"
              value={manifestacaointeresse}
              onChange={(e) => setManifestacaointeresse(e.target.value)}
            />

            <label htmlFor="validadedocident">
              Validade do documento de identificação
            </label>
            <Input
              type="date"
              name="validadedocident"
              value={validadedocident}
              onChange={(e) => setValidadedocident(e.target.value)}
            />

            <label htmlFor="catprof">Categoria Profissional</label>
            <Input
              type="text"
              name="catprof"
              value={catprof}
              onChange={(e) => setCatprof(e.target.value)}
            />
          </div>
          <div className="mr-10">
          <label htmlFor="nif">Número de Identificação Fiscal (NIF)</label>
            <Input
              type="text"
              name="nif"
              value={nif}
              onChange={(e) => setNif(e.target.value)}
            />

            <label htmlFor="niss">
              Número de Identificação de Segurança Social (NISS)
            </label>
            <Input
              type="text"
              name="niss"
              value={niss}
              onChange={(e) => setNiss(e.target.value)}
            />

            <label htmlFor="morada">Morada</label>
            <Input
              type="text"
              name="morada"
              value={morada}
              onChange={(e) => setMorada(e.target.value)}
            />

            <label htmlFor="contratoinicio">Data de ínicio de contrato</label>
            <Input
              type="date"
              name="contratoinicio"
              value={contratoinicio}
              onChange={(e) => setContratoinicio(e.target.value)}
            />
            <label htmlFor="conTratofim">Data de fim de Contrato</label>
            <Input
              type="date"
              name="contratofim"
              value={contratofim}
              onChange={(e) => setContratofim(e.target.value)}
            />

            <label htmlFor="vencimentobase">Vencimento base</label>
            <Input
              type="text"
              name="vencimentobase"
              value={vencimentobase}
              onChange={(e) => setVencimentobase(e.target.value)}
            />

            <label htmlFor="tiposalario">Tipo de salário</label>
            <Input
              type="text"
              name="tiposalario"
              value={tiposalario}
              onChange={(e) => setTiposalario(e.target.value)}
            />

            <label htmlFor="salarioreal">Salário Real</label>
            <Input
              type="text"
              name="salarioreal"
              value={salarioreal}
              onChange={(e) => setSalarioreal(e.target.value)}
            />

            <label htmlFor="calcado">Calçado</label>
            <Input
              type="text"
              name="calcado"
              value={calcado}
              onChange={(e) => setCalcado(e.target.value)}
            />

            <label htmlFor="salarioreal">Carta de condução</label>
            <Input
              type="text"
              name="cartaconducao"
              value={cartaconducao}
              onChange={(e) => setCartaconducao(e.target.value)}
            />

            <label htmlFor="iban">IBAN</label>
            <Input
              type="text"
              name="iban"
              value={iban}
              onChange={(e) => setIban(e.target.value)}
            />
          </div>
        </div>

        <Button className='mt-5' onClick={() => AddFuncionario()}>Criar</Button>
      </form>
    </div>
  );
}
