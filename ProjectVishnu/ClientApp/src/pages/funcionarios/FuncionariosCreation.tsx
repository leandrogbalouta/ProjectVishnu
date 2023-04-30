// TODO in case u need an IBAN - IE64IRCE92050112345678
import React, { useState, useEffect } from "react";
import {
  createFuncionario,
  fetchCategoriasProfissionais,
  fetchMercados,
  fetchTiposDocumento,
} from "../../common/API/APICalls";
import {
  Input,
  Button,
  FormControl,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  FormLabel,
  Divider,
  Stack,
  Radio,
  RadioGroup,
  Select,
  useToast,
  Switch,
} from "@chakra-ui/react";
import IFuncionarioInput from "../../common/Interfaces/Funcionario/IFuncionarioInput";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaCreditCard,
  FaGlobe,
  FaIdCard,
  FaMapMarkerAlt,
  FaMoneyBillAlt,
  FaPhone,
  FaPhoneAlt,
  FaShoePrints,
  FaUser,
} from "react-icons/fa";

export default function FuncionarioCreation() {
  // Hooks
  const [tipodocidentState, setTipodocidentState] = useState<string>(" ");
  // Data from db
  const [categoriasProfissionais, setCategoriasProfissionais] = useState<any[]>(
    []
  );
  const navigate = useNavigate();
  const [tiposDeDocumento, setTiposDeDocumento] = useState<any[]>([]);
  const [mercados, setMercados] = useState<string[]>([]);
  const toast = useToast();
  // Form
  const schema = yup
    .object({
      nome: yup.string().required("Por favor, introduza o nome."),
      dtnascimento: yup
        .string()
        .transform((value, originalValue) => (value = originalValue))
        .nullable()
        .required("Por favor, introduza a data de nascimento."),
      //.transform((value) => (isNaN(value) ? undefined : value)),
      telemovel: yup
        .string()
        .required("Por favor, introduza o número de telefone."),
      contactoemergencia: yup
        .string()
        .required("Por favor, introduza o contacto de emergência."),
      nacionalidade: yup
        .string()
        .required("Por favor, introduza a nacionalidade."),
      mercado: yup.string().required("Por favor, introduza o mercado."),
      tipodocident: yup
        .string()
        .required("Por favor, introduza o tipo de documento de identificação."),
      docident: yup
        .string()
        .required("Por favor, introduza o  número de identificação."),
      validadedocident: yup
        .string()
        .transform((value, originalValue) => (value = originalValue))
        .required(
          "Por favor, introduza a data de expiração do documento de identificação"
        ),
      //.transform((value) => (isNaN(value) ? undefined : value)),
      catprof: yup
        .string()
        .required("Por favor, introduza a categoria profissional."),
      nif: yup
        .string()
        .matches(/[0-9]+/, "NIF inválido.")
        .length(9, "NIF consiste em 9 dígitos.")
        .required("Por favor, introduza o NIF."),
      niss: yup
        .string()
        .matches(/[0-9]+/, "NISS inválido.")
        .length(11, "NISS consiste em 11 dígitos.")
        .required("Por favor, introduza o NISS."),
      morada: yup
        .string()
        .required("Por favor, introduza o endereço de morada."),
      contratoinicio: yup
        .string()
        .transform((value, originalValue) => (value = originalValue))
        .required("Por favor, introduza a data de início."),
      //.transform((value) => (isNaN(value) ? undefined : value)),
      contratofim: yup
        .string()
        .transform((value, originalValue) => (value = originalValue))
        .required("Por favor, introduza a data de término."),
      //.transform((value) => (isNaN(value) ? undefined : value)),
      vencimentobase: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .min(1, "Mínimo €1")
        .max(999999, "Máximo €999.999")
        .required("Por favor, introduza o vencimento base."),
      tiposalario: yup
        .string()
        .required("Por favor, introduza o tipo de salário."),
      salarioreal: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .min(1, "Mínimo €1")
        .max(999999, "Máximo €999.999")
        .required("Por favor, introduza o salário real."),
      calcado: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .typeError("Tamanho inválido.")
        .min(20, "Mínimo 20")
        .max(50, "Máximo 50"),
      cartaconducao: yup.boolean(),
      iban: yup
        .string()
        .min(16, "IBAN consiste em 16 caracteres.")
        .max(34)
        .matches(/^([A-Z]{2})(\d{2})([A-Z\d]+)$/)
        .required("Por favor, introduza o IBAN."),
      passaporte: yup.string().when("tipodocident", {
        is: (tipodocident: string) => tipodocident === "MI",
        then: yup
          .string()
          .required("Por favor introduza o número do seu passaporte."),
      }),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFuncionarioInput>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
  });
  const onSubmit: SubmitHandler<IFuncionarioInput> = async (
    data: IFuncionarioInput
  ) => {
    AddFuncionario(data);
  };
  // UseEffect
  useEffect(() => {
    // Get Tipos de documento
    const populateTiposDocInt = async () => {
      const response = await fetchTiposDocumento();
      setTiposDeDocumento(response.data);
    };
    // Get Categorias profissionais
    const populateCategoriasProfissionais = async () => {
      const response = await fetchCategoriasProfissionais();
      setCategoriasProfissionais(response.data);
    };
    // Get Mercados
    const populateMercados = async () => {
      const response = await fetchMercados();
      setMercados(response.data);
    };

    // run 'em
    populateCategoriasProfissionais();
    populateMercados();
    populateTiposDocInt();
  }, []);
  // Component
  async function AddFuncionario(funcionario: IFuncionarioInput) {
    await createFuncionario(funcionario)
      .then((resp) => {
        if (resp.status === 201) {
          navigate("/funcionarios");
          if (!toast.isActive("sucesso")) {
            toast({
              id: "sucesso",
              title: `Funcionário criado com sucesso.`,
              position: "top-right",
              duration: 5000,
              status: "success",
              isClosable: true,
            });
          }
        } else {
          if (!toast.isActive("erro")) {
            toast({
              id: "erro",
              title: resp.headers["title"],
              position: "top-right",
              duration: 10000,
              status: "error",
              isClosable: true,
            });
          }
        }
      })
      .catch(() => {});
  }

  return (
    <>
      <h1 className="page-header">Criar um Funcionário</h1>
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
              <InputLeftElement pointerEvents="none">
                <FaUser />
              </InputLeftElement>
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
              <InputLeftElement pointerEvents="none">
                <FaCalendarAlt color="#000E31" />
              </InputLeftElement>
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
              <InputLeftElement pointerEvents="none">
                <FaPhone color="#000E31" />
              </InputLeftElement>
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
              <InputLeftElement pointerEvents="none">
                <FaPhoneAlt color="#000E31" />
              </InputLeftElement>
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
              <InputLeftElement pointerEvents="none">
                <FaGlobe color="#000E31" />{" "}
              </InputLeftElement>
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
                      <option value={mercado} key={mercado}>
                        {mercado}
                      </option>
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
                      <option value={tipoDoc.sigla} key={tipoDoc.sigla}>
                        {tipoDoc.designacao}
                      </option>
                    ))}
                  </>
                )}
              </Select>
            </InputGroup>
            <FormErrorMessage>{errors.tipodocident?.message}</FormErrorMessage>
          </FormControl>
          {/* Se tipo de documento for 'demontrar interesse' mostrat input passaporte */}
          {tipodocidentState! === "MI" && (
            <>
              {/* passaporte field */}
              <FormControl className="mb-5" isInvalid={!!errors.passaporte}>
                <FormLabel htmlFor="passaporte">Passaporte</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FaMoneyBillAlt color="#000E31" />
                  </InputLeftElement>
                  <Input
                    id="passaporte"
                    type="text"
                    placeholder="Passaporte"
                    autoComplete="blank-passaporte"
                    {...register("passaporte")}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.passaporte?.message}
                </FormErrorMessage>
              </FormControl>
            </>
          )}
          {/* docident field */}
          <FormControl className="mb-5" isInvalid={!!errors.docident}>
            <FormLabel htmlFor="docident">
              Número do documento de identificação
            </FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaIdCard color="#000E31" />
              </InputLeftElement>
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
              <InputLeftElement pointerEvents="none">
                <FaCalendarAlt color="#000E31" />
              </InputLeftElement>
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
                      <option value={categoria.codigo} key={categoria.codigo}>
                        {categoria.nomenclatura}
                      </option>
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
              <InputLeftElement pointerEvents="none">
                <FaIdCard color="#000E31" />
              </InputLeftElement>
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
              <InputLeftElement pointerEvents="none">
                <FaIdCard color="#000E31" />
              </InputLeftElement>
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
              <InputLeftElement pointerEvents="none">
                <FaMapMarkerAlt color="#000E31" />
              </InputLeftElement>
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
              <InputLeftElement pointerEvents="none">
                <FaMapMarkerAlt color="#000E31" />
              </InputLeftElement>
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
              <InputLeftElement pointerEvents="none">
                <FaCalendarAlt color="#000E31" />
              </InputLeftElement>
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
              <InputLeftElement pointerEvents="none">
                <FaMoneyBillAlt color="#000E31" />
              </InputLeftElement>
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
              <RadioGroup defaultValue="horario">
                <Stack spacing={5} direction="row">
                  <Radio
                    colorScheme="blue"
                    value="horario"
                    id="tiposalario"
                    {...register("tiposalario", { required: true })}
                  >
                    Horário
                  </Radio>
                  <Radio
                    colorScheme="blue"
                    value="fixo"
                    {...register("tiposalario", { required: true })}
                  >
                    Fixo
                  </Radio>
                </Stack>
              </RadioGroup>
            </InputGroup>
            <FormErrorMessage>{errors.tiposalario?.message}</FormErrorMessage>
          </FormControl>
          {/* salarioreal field */}
          <FormControl className="mb-5" isInvalid={!!errors.salarioreal}>
            <FormLabel htmlFor="salarioreal" className="flex flex-col">
              Salário Real
            </FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaMoneyBillAlt color="#000E31" />
              </InputLeftElement>
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
              <InputLeftElement pointerEvents="none">
                <FaShoePrints color="#000E31" />
              </InputLeftElement>
              <Input
                id="calcado"
                type="text"
                placeholder="Calçado"
                autoComplete="blank-calcado"
                {...register("calcado")}
              />
            </InputGroup>
            <FormErrorMessage>{errors.calcado?.message}</FormErrorMessage>
          </FormControl>
          {/* cartaconducao field */}
          <FormControl className="mb-5" isInvalid={!!errors.cartaconducao}>
            <FormLabel htmlFor="cartaconducao">Carta de condução</FormLabel>

            <InputGroup className="flex flex-col">
              <Switch
                id="cartaconducao"
                size="lg"
                {...register("cartaconducao", { required: true })}
              />
            </InputGroup>
            <FormErrorMessage>{errors.cartaconducao?.message}</FormErrorMessage>
          </FormControl>
          {/* iban field */}
          <FormControl className="mb-5" isInvalid={!!errors.iban}>
            <FormLabel htmlFor="iban">IBAN</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaCreditCard color="#000E31" />
              </InputLeftElement>
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
