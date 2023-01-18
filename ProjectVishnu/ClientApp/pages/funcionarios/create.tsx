import React, { useState } from "react";
import { CreateFuncionario } from "../../common/APICalls";
import {
  Input,
  Button,
  FormControl,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  FormLabel,
} from "@chakra-ui/react";
import IFuncionarioInput from "../../common/Interfaces/Funcionario/IFuncionarioInput";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import {
  FaCalendarAlt,
  FaCreditCard,
  FaFileSignature,
  FaGlobe,
  FaGlobeEurope,
  FaHome,
  FaIdCard,
  FaMapMarkerAlt,
  FaMoneyBillAlt,
  FaPhone,
  FaPhoneAlt,
  FaShoePrints,
  FaUser,
  FaUserTie,
} from "react-icons/fa";
export default function FuncionarioCreation() {
  // Hooks
  const router = useRouter();
  // State
  // Might not be needed...
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
  // Form
  const schema = yup
    .object({
      nome: yup.string().required("Por favor, introduza o nome."),
      dtnascimento: yup.string(),
      telemovel: yup.string().required("Por favor, introduza o número de telefone."),
      contactoemergencia: yup
        .string()
        .required("Por favor, introduza o contacto de emergência."),
      nacionalidade: yup.string().required("Por favor, introduza a nacionalidade."),
      mercado: yup.string().required("Por favor, introduza o mercado (país)."),
      tipodocident: yup
        .string()
        .required("Por favor, introduza o tipo de documento de identificação."),
      docident: yup
        .string()
        .required("Por favor, introduza o  número de identificação."),
      tituloresidencia: yup.string(),
      manifestacaointeresse: yup.string(),
      validadedocident: yup.string(),
      catprof: yup
        .string()
        .required("Por favor, introduza a categoria profissional."),
      nif: yup.string().required("Por favor, introduza o NIF."),
      niss: yup.string().required("Por favor, introduza o NISS."),
      morada: yup.string().required("Por favor, introduza o endereço de morada."),
      contratoinicio: yup.string(),
      contratofim: yup.string(),
      vencimentobase: yup.number().required("Por favor, introduza o salário base."),
      tiposalario: yup.string().required("Por favor, introduza o tipo de salário"),
      salarioreal: yup.number().required("Por favor, introduza salário real"),
      calcado: yup.number(),
      cartaconducao: yup
        .string()
        .required("Por favor, introduza o número da carta de condução"),
      iban: yup.string().required("Por favor, introduza o IBAN"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFuncionarioInput>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<IFuncionarioInput> = async (data) => {
    try {
      await axios
        .post(
          "/api/",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              withCredentials: true,
              funcionario: "",
            },
          }
        )
        .then((response) => {
          // Response here is a token if valid or unauthorized if invalid.
        });
    } catch (error) {}
    // Make the button stop spinning.
  };
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
      morada: morada,
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
    <>
      <h1 className="text-center text-4xl mb-5">Criar um Funcionário</h1>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex-1 overflow-auto">
          <div id="shabba" className="grid sm:grid-cols-2 gap-x-10 gap-y-1">
            {/* nome field */}
            <FormControl className="mb-5" isInvalid={!!errors.nome}>
              <FormLabel htmlFor="nome">Nome</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FaUser />} />
                <Input
                  id="nome"
                  type="text"
                  placeholder="Nome"
                  autoComplete="blank-nome"
                  {...register("nome", { required: true })}
                />
              </InputGroup>
              <FormErrorMessage>{errors.nome?.message}</FormErrorMessage>
            </FormControl>
            {/* dtnascimento field */}
            <FormControl className="mb-5" isInvalid={!!errors.dtnascimento}>
              <FormLabel htmlFor="dtnascimento">Data de Nascimento</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaCalendarAlt color="#000E31" />}
                />
                <Input
                  id="dtnascimento"
                  type="text"
                  placeholder="Data de Nascimento"
                  autoComplete="blank-dtnascimento"
                  {...register("dtnascimento")}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.dtnascimento?.message}
              </FormErrorMessage>
            </FormControl>
            {/* telemovel field */}
            <FormControl className="mb-5" isInvalid={!!errors.telemovel}>
              <FormLabel htmlFor="telemovel">Telemóvel</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaPhone color="#000E31" />}
                />
                <Input
                  id="telemovel"
                  type="text"
                  placeholder="Telemovel"
                  autoComplete="blank-telemovel"
                  {...register("telemovel", { required: true })}
                />
              </InputGroup>
              <FormErrorMessage>{errors.telemovel?.message}</FormErrorMessage>
            </FormControl>
            {/* contactoemergencia field */}
            <FormControl
              className="mb-5"
              isInvalid={!!errors.contactoemergencia}
            >
              <FormLabel htmlFor="contactoemergencia">
                Contacto de emergência
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaPhoneAlt color="#000E31" />}
                />
                <Input
                  id="contactoemergencia"
                  type="text"
                  placeholder="Contacto de Emergência"
                  autoComplete="blank-contactoemergencia"
                  {...register("contactoemergencia", { required: true })}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.contactoemergencia?.message}
              </FormErrorMessage>
            </FormControl>

            {/* nacionalidade field */}
            <FormControl className="mb-5" isInvalid={!!errors.nacionalidade}>
              <FormLabel htmlFor="nacionalidade">Nacionalidade</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaGlobe color="#000E31" />}
                />
                <Input
                  id="nacionalidade"
                  type="text"
                  placeholder="Nacionalidade"
                  autoComplete="blank-nacionalidade"
                  {...register("nacionalidade", { required: true })}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.nacionalidade?.message}
              </FormErrorMessage>
            </FormControl>
            {/* mercado field */}
            <FormControl className="mb-5" isInvalid={!!errors.mercado}>
              <FormLabel htmlFor="mercado">Mercado</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaGlobeEurope color="#000E31" />}
                />
                <Input
                  id="mercado"
                  type="text"
                  placeholder="Mercado"
                  autoComplete="blank-mercado"
                  {...register("mercado", { required: true })}
                />
              </InputGroup>
              <FormErrorMessage>{errors.mercado?.message}</FormErrorMessage>
            </FormControl>
            {/* tipodocident field */}
            <FormControl className="mb-5" isInvalid={!!errors.tipodocident}>
              <FormLabel htmlFor="tipodocident">
                Tipo de documento de identificação
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaIdCard color="#000E31" />}
                />
                <Input
                  id="tipodocident"
                  type="text"
                  placeholder="Tipo de Documento de Identificação"
                  autoComplete="blank-tipodocident"
                  {...register("tipodocident", { required: true })}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.tipodocident?.message}
              </FormErrorMessage>
            </FormControl>
            {/* docident field */}
            <FormControl className="mb-5" isInvalid={!!errors.docident}>
              <FormLabel htmlFor="docident">
                Número do documento de identificação
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaIdCard color="#000E31" />}
                />
                <Input
                  id="docident"
                  type="text"
                  placeholder="Documento de Identificação"
                  autoComplete="blank-docident"
                  {...register("docident", { required: true })}
                />
              </InputGroup>
              <FormErrorMessage>{errors.docident?.message}</FormErrorMessage>
            </FormControl>
            {/* tituloresidencia field */}
            <FormControl className="mb-5" isInvalid={!!errors.tituloresidencia}>
              <FormLabel htmlFor="tituloresidenica">
                Título de Residência
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaHome color="#000E31" />}
                />
                <Input
                  id="tituloresidencia"
                  type="text"
                  placeholder="Título de Residência"
                  autoComplete="blank-tituloresidencia"
                  {...register("tituloresidencia")}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.tituloresidencia?.message}
              </FormErrorMessage>
            </FormControl>
            {/* manifestacaointeresse field */}
            <FormControl
              className="mb-5"
              isInvalid={!!errors.manifestacaointeresse}
            >
              <FormLabel htmlFor="manifestacaointeresse">
                Manifestação de interesse
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaFileSignature color="#000E31" />}
                />
                <Input
                  id="manifestacaointeresse"
                  type="text"
                  placeholder="Manifestação de Interesse"
                  autoComplete="blank-manifestacaointeresse"
                  {...register("manifestacaointeresse")}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.manifestacaointeresse?.message}
              </FormErrorMessage>
            </FormControl>
            {/* validadedocident field */}
            <FormControl className="mb-5" isInvalid={!!errors.validadedocident}>
              <FormLabel htmlFor="validadedocident">
                Validade do documento de identificação
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaCalendarAlt color="#000E31" />}
                />
                <Input
                  id="validadedocident"
                  type="text"
                  placeholder="Validade do Documento de Identificação"
                  autoComplete="blank-validadedocident"
                  {...register("validadedocident")}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.validadedocident?.message}
              </FormErrorMessage>
            </FormControl>
            {/* catprof field */}
            <FormControl className="mb-5" isInvalid={!!errors.catprof}>
              <FormLabel htmlFor="catprof">Categoria Profissional</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaUserTie color="#000E31" />}
                />
                <Input
                  id="catprof"
                  type="text"
                  placeholder="Categoria Profissional"
                  autoComplete="blank-catprof"
                  {...register("catprof", { required: true })}
                />
              </InputGroup>
              <FormErrorMessage>{errors.catprof?.message}</FormErrorMessage>
            </FormControl>
            {/* nif field */}
            <FormControl className="mb-5" isInvalid={!!errors.nif}>
              <FormLabel htmlFor="nif">
                Número de Identificação Fiscal (NIF)
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaIdCard color="#000E31" />}
                />
                <Input
                  id="nif"
                  type="text"
                  placeholder="NIF"
                  autoComplete="blank-nif"
                  {...register("nif", { required: true })}
                />
              </InputGroup>
              <FormErrorMessage>{errors.nif?.message}</FormErrorMessage>
            </FormControl>
            {/* niss field */}
            <FormControl className="mb-5" isInvalid={!!errors.niss}>
              <FormLabel htmlFor="niss">
                Número de Identificação de Segurança Social (NISS)
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaIdCard color="#000E31" />}
                />
                <Input
                  id="niss"
                  type="text"
                  placeholder="NISS"
                  autoComplete="blank-niss"
                  {...register("niss", { required: true })}
                />
              </InputGroup>
              <FormErrorMessage>{errors.niss?.message}</FormErrorMessage>
            </FormControl>
            {/* Morada field */}
            <FormControl className="mb-5" isInvalid={!!errors.morada}>
              <FormLabel htmlFor="morada">Morada</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaMapMarkerAlt color="#000E31" />}
                />
                <Input
                  id="Morada"
                  type="text"
                  placeholder="Morada"
                  autoComplete="blank-Morada"
                  {...register("morada", { required: true })}
                />
              </InputGroup>
              <FormErrorMessage>{errors.morada?.message}</FormErrorMessage>
            </FormControl>
            {/* contratoinicio field */}
            <FormControl className="mb-5" isInvalid={!!errors.contratoinicio}>
              <FormLabel htmlFor="contratoinicio">
                Data de ínicio de contrato
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaMapMarkerAlt color="#000E31" />}
                />
                <Input
                  id="contratoinicio"
                  type="text"
                  placeholder="Data de ínicio de contrato"
                  autoComplete="blank-contratoinicio"
                  {...register("contratoinicio", { required: true })}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.contratoinicio?.message}
              </FormErrorMessage>
            </FormControl>
            {/* contratofim field */}
            <FormControl className="mb-5" isInvalid={!!errors.contratofim}>
              <FormLabel htmlFor="contratofim">
                Data de fim de Contrato
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaCalendarAlt color="#000E31" />}
                />
                <Input
                  id="contratofim"
                  type="text"
                  placeholder="Data de fim de Contrato"
                  autoComplete="blank-contratofim"
                  {...register("contratofim", { required: true })}
                />
              </InputGroup>
              <FormErrorMessage>{errors.contratofim?.message}</FormErrorMessage>
            </FormControl>
            {/* vencimentobase field */}
            <FormControl className="mb-5" isInvalid={!!errors.vencimentobase}>
              <FormLabel htmlFor="vencimentobase">Vencimento base</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaMoneyBillAlt color="#000E31" />}
                />
                <Input
                  id="vencimentobase"
                  type="text"
                  placeholder="Vencimento base"
                  autoComplete="blank-vencimentobase"
                  {...register("vencimentobase", { required: true })}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.vencimentobase?.message}
              </FormErrorMessage>
            </FormControl>
            {/* tiposalario field */}
            <FormControl className="mb-5" isInvalid={!!errors.tiposalario}>
              <FormLabel htmlFor="tiposalario">Tipo de salário</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaMoneyBillAlt color="#000E31" />}
                />
                <Input
                  id="tiposalario"
                  type="text"
                  placeholder="Tipo de salário"
                  autoComplete="blank-tiposalario"
                  {...register("tiposalario", { required: true })}
                />
              </InputGroup>
              <FormErrorMessage>{errors.tiposalario?.message}</FormErrorMessage>
            </FormControl>
            {/* salarioreal field */}
            <FormControl className="mb-5" isInvalid={!!errors.salarioreal}>
              <FormLabel htmlFor="salarioreal">Salário Real</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaMoneyBillAlt color="#000E31" />}
                />
                <Input
                  id="salarioreal"
                  type="text"
                  placeholder="Salário Real"
                  autoComplete="blank-salarioreal"
                  {...register("salarioreal", { required: true })}
                />
              </InputGroup>
              <FormErrorMessage>{errors.salarioreal?.message}</FormErrorMessage>
            </FormControl>
            {/* calcado field */}
            <FormControl className="mb-5" isInvalid={!!errors.calcado}>
              <FormLabel htmlFor="calcado">Calçado</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaShoePrints color="#000E31" />}
                />
                <Input
                  id="calcado"
                  type="text"
                  placeholder="Calçado"
                  autoComplete="blank-calcado"
                  {...register("calcado", { required: true })}
                />
              </InputGroup>
              <FormErrorMessage>{errors.calcado?.message}</FormErrorMessage>
            </FormControl>
            {/* cartaconducao field */}
            <FormControl className="mb-5" isInvalid={!!errors.cartaconducao}>
              <FormLabel htmlFor="cartaconducao">Carta de condução</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaIdCard color="#000E31" />}
                />
                <Input
                  id="cartaconducao"
                  type="text"
                  placeholder="Carta de condução"
                  autoComplete="blank-cartaconducao"
                  {...register("cartaconducao", { required: true })}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.cartaconducao?.message}
              </FormErrorMessage>
            </FormControl>
            {/* iban field */}
            <FormControl className="mb-5" isInvalid={!!errors.iban}>
              <FormLabel htmlFor="iban">IBAN</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaCreditCard color="#000E31" />}
                />
                <Input
                  id="iban"
                  type="text"
                  placeholder="IBAN"
                  autoComplete="blank-iban"
                  {...register("iban", { required: true })}
                />
              </InputGroup>
              <FormErrorMessage>{errors.iban?.message}</FormErrorMessage>
            </FormControl>
            {/* End of form */}
          </div>
        </div>
        <div id="button-container" className="flex justify-end">
          <Button type="submit" className="mb-5" onClick={() => AddFuncionario()}>
            Criar
          </Button>
        </div> 
      </form>
    </>
  );
}
