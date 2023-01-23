import React, { useState, useEffect } from "react";
import {
  CreateFuncionario,
  fetchCategoriasProfissionais,
  fetchMercados,
  fetchTiposDocumento,
} from "../../common/APICalls";
import {
  Input,
  Button,
  FormControl,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  FormLabel,
  Divider,
  Checkbox,
  Stack,
  Radio,
  RadioGroup,
  InputRightAddon,
  Select,
  InputLeftAddon,
} from "@chakra-ui/react";
import IFuncionarioInput from "../../common/Interfaces/Funcionario/IFuncionarioInput";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Spinner } from "@chakra-ui/react";
import {
  FaCalendarAlt,
  FaCreditCard,
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
  // Form
  const schema = yup
    .object({
      nome: yup.string().required("Por favor, introduza o nome."),
      dtnascimento: yup
        .date()
        .nullable()
        .notRequired()
        .transform((value) => (isNaN(value) ? undefined : value)),
      telemovel: yup
        .string()
        .required("Por favor, introduza o número de telefone."),
      contactoemergencia: yup
        .string()
        .required("Por favor, introduza o contacto de emergência."),
      nacionalidade: yup
        .string()
        .required("Por favor, introduza a nacionalidade."),
      mercado: yup.string().required("Por favor, introduza o mercado (país)."),
      tipodocident: yup
        .string()
        .required("Por favor, introduza o tipo de documento de identificação."),
      docident: yup
        .string()
        .required("Por favor, introduza o  número de identificação."),
      validadedocident: yup
        .date()
        .nullable()
        .notRequired()
        .transform((value) => (isNaN(value) ? undefined : value)),
      catprof: yup
        .string()
        .required("Por favor, introduza a categoria profissional."),
      nif: yup.string().required("Por favor, introduza o NIF."),
      niss: yup.string().required("Por favor, introduza o NISS."),
      morada: yup
        .string()
        .required("Por favor, introduza o endereço de morada."),
      contratoinicio: yup
        .date()
        .nullable()
        .notRequired()
        .transform((value) => (isNaN(value) ? undefined : value)),
      contratofim: yup
        .date()
        .nullable()
        .notRequired()
        .transform((value) => (isNaN(value) ? undefined : value)),
      vencimentobase: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .min(1, "Mínimo €1")
        .max(999999, "Máximo €999.999")
        .required("Por favor, introduza o vencimento base."),
      tiposalario: yup
        .string()
        .required("Por favor, introduza o tipo de salário"),
      salarioreal: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .min(1, "Mínimo €1")
        .max(999999, "Máximo €999.999")
        .required("Por favor, introduza o salário real."),
      calcado: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .min(20, "Mínimo 20")
        .max(999999, "Máximo 50"),
      cartaconducao: yup.boolean(),
      iban: yup.string().required("Por favor, introduza o IBAN"),
      passaporte: yup.string(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFuncionarioInput>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
  });
  const onSubmit: SubmitHandler<IFuncionarioInput> = async (data: any) => {
    try {
      AddFuncionario(data);
    } catch (error) {}
  };
  // Hooks
  const [tipodocidentState, setTipodocidentState] = useState<string>("");
  // Data from db
  const [categoriasProfissionais, setCategoriasProfissionais] = useState<any[]>(
    []
  );
  const [tiposDeDocumento, setTiposDeDocumento] = useState<any[]>([]);
  const [mercados, setMercados] = useState<string[]>([]);
  // UseEffect
  useEffect(() => {
      // TODO se calhar mudar a maneira como isto é executado..
      // Get Tipos de documento
      const populateTiposDocInt = async () => {
        const response = await fetchTiposDocumento()
        const data = await response.json()
        setTiposDeDocumento(data)
      }
      // Get Categorias profissionais
      const populateCategoriasProfissionais = async () => {
        const response = await fetchCategoriasProfissionais();
        const data = await response.json();
        setCategoriasProfissionais(data);
      };
      // Get Mercados
      const populateMercados = async () => {
        const response = await fetchMercados();
        const data = await response.json();
        setMercados(data);
      };
      
      // run 'em
      populateCategoriasProfissionais();
      populateMercados();
      populateTiposDocInt()
  },[]);
  // Component
  async function AddFuncionario(funcionario: IFuncionarioInput) {
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
      <form
        className="flex flex-col min-h-0 max-h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div
          id="form-inputs-container"
          className="grid sm:grid-cols-2 gap-x-10 gap-y-1 min-h-1 max-h-full overflow-scroll px-1"
        >
          {/* nome field */}
          <FormControl className="mb-5 basis-2/5" isInvalid={!!errors.nome}>
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
                type="date"
                placeholder="Data de Nascimento"
                autoComplete="blank-dtnascimento"
                {...register("dtnascimento")}
              />
            </InputGroup>
            <FormErrorMessage>{errors.dtnascimento?.message}</FormErrorMessage>
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
          <FormControl className="mb-5" isInvalid={!!errors.contactoemergencia}>
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
            <FormErrorMessage>{errors.nacionalidade?.message}</FormErrorMessage>
          </FormControl>
          {/* mercado field */}
          <FormControl className="mb-5" isInvalid={!!errors.mercado}>
            <FormLabel htmlFor="mercado">Mercado</FormLabel>
            <InputGroup>
              <Select
                id="mercado"
                className="capitalize"
                placeholder="Mercado"
                {...register("mercado", { required: true })}
              >
                {mercados && (
                  <>
                    {mercados.map((mercado: string) => (
                      <option value={mercado} key={mercado}>{mercado}</option>
                    ))}
                  </>
                )}
              </Select>
            </InputGroup>
            <FormErrorMessage>{errors.mercado?.message}</FormErrorMessage>
          </FormControl>
          {/* tipodocident field */}
          <FormControl className="mb-5" isInvalid={!!errors.tipodocident}>
            <FormLabel htmlFor="tipodocident">
              Tipo de documento de identificação
            </FormLabel>
            <InputGroup>
              <Select
                id="tipodocident"
                placeholder="Tipo de Documento de Identificação"
                {...register("tipodocident", { required: true })}
                value={tipodocidentState}
                onChange={(e) => setTipodocidentState(e.target.value)}
              >
                {tiposDeDocumento && (
                  <>
                    {tiposDeDocumento.map((tipoDoc: any) => (
                      <option value={tipoDoc.sigla} key={tipoDoc.sigla}>{tipoDoc.designacao}</option>
                    ))}
                  </>
                )}
              </Select>
            </InputGroup>
            <FormErrorMessage>{errors.tipodocident?.message}</FormErrorMessage>
          </FormControl>
          {/* Se tipo de documento for 'demontrar interesse' mostrat input passaporte */}
          {tipodocidentState! == "MI" && (
            <>
              {/* passaporte field */}
              <FormControl className="mb-5">
                <FormLabel htmlFor="passaporte">Passaporte</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FaMoneyBillAlt color="#000E31" />}
                  />
                  <Input
                    id="passaporte"
                    type="text"
                    placeholder="Passaporte"
                    autoComplete="blank-passaporte"
                    {...register("passaporte")}
                  />
                </InputGroup>
              </FormControl>
            </>
          )}
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
                type="date"
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
              <Select
                id="catprof"
                placeholder="Categoria Profissional"
                {...register("catprof", { required: true })}
              >
                {categoriasProfissionais && (
                  <>
                    {categoriasProfissionais.map((categoria: any) => (
                      <option value={categoria.codigo} key={categoria.codigo}>{categoria.nomenclatura}</option>
                    ))}
                  </>
                )}
              </Select>
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
                type="date"
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
            <FormLabel htmlFor="contratofim">Data de fim de Contrato</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FaCalendarAlt color="#000E31" />}
              />
              <Input
                id="contratofim"
                type="date"
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
            <FormLabel htmlFor="salarioreal" className="flex flex-col">Salário Real</FormLabel>
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
              <RadioGroup defaultValue="0">
                <Stack spacing={5} direction="row">
                  <Radio
                    colorScheme="blue"
                    value="1"
                    id="cartaconducao"
                    {...register("cartaconducao", { required: true })}
                  >
                    Sim
                  </Radio>
                  <Radio
                    colorScheme="red"
                    value="0"
                    {...register("cartaconducao", { required: true })}
                  >
                    Não
                  </Radio>
                </Stack>
              </RadioGroup>
            </InputGroup>
            <FormErrorMessage>{errors.cartaconducao?.message}</FormErrorMessage>
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
        <Divider />
        <div id="button-container" className="flex sm:justify-end">
          <Button
            type="submit"
            size="lg"
            colorScheme="blue"
            className="mt-3 w-full sm:w-auto"
          >
            Criar
          </Button>
        </div>
      </form>
    </>
  );
}
