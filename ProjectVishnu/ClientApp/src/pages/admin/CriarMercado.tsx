import { useState, useEffect } from "react";
import { CreateUser, fetchTiposDeUser } from "../../common/APICalls";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  useToast,
} from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaCalendarDay, FaGlobe, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import IContaInput from "../../common/Interfaces/Conta/IContaInput";
import IMercado from "../../common/Interfaces/Mercado/IMercado";
import { RxLetterCaseCapitalize } from "react-icons/rx";

export default function CriarMercado() {
  // state
  const [estado, setEstado] = useState<string | undefined>(undefined);
  // Router
  const navigate = useNavigate();
  // misc
  const toast = useToast();
  // schema
  const schema = yup
    .object({
      nome: yup.string().required("Por favor, introduza o nome do mercado."),
      sigla: yup
        .string()
        .required("Por favor, introduza a sigla para o mercado."),
      diaInicio: yup.date().typeError("Por favor introduza um dia de inicio."),
      diaFim: yup.date().typeError("Por favor introduza um dia de fim"),
    })
    .required();
  // end of schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IMercado>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
  });
  const onSubmit: SubmitHandler<IMercado> = async (data: IMercado) => {};
  // end of form
  async function AddConta(conta: IContaInput) {
    const resp = await CreateUser(conta);
    if (resp.status === 201) {
      navigate("/admin");
      if (!toast.isActive("sucesso")) {
        toast({
          id: "sucesso",
          title: `Mercado criado com sucesso.`,
          position: "top-right",
          duration: 5000,
          status: "success",
          isClosable: true,
        });
      }
    } else {
      if (!toast.isActive("erro")) {
        resp.json().then((res) => {
          toast({
            id: "erro",
            title: "Ocorreu um erro ao criar mercado.",
            position: "top-right",
            duration: 10000,
            status: "error",
            isClosable: true,
          });
        });
      }
    }
  }
  useEffect(() => {}, []);

  return (
    <div className="w-full sm:w-1/2 mx-auto">
      <p className="page-header">Criar Mercado</p>
      <form
        className="flex flex-col min-h-0 max-h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* nome field */}
        <FormControl className="mb-5 basis-2/5" isInvalid={!!errors.nome}>
          <FormLabel htmlFor="nome">Nome</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaGlobe />
            </InputLeftElement>
            <Input
              id="nome"
              type="text"
              placeholder="Nome"
              autoComplete="blank-nome"
              {...register("nome", { required: true })}
            />
          </InputGroup>
          <FormErrorMessage>{errors?.nome?.message}</FormErrorMessage>
        </FormControl>
        {/* Sigla field */}
        <FormControl className="mb-5 basis-2/5" isInvalid={!!errors.sigla}>
          <FormLabel htmlFor="sigla">Sigla</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <RxLetterCaseCapitalize />
            </InputLeftElement>
            <Input
              id="sigla"
              type="text"
              placeholder="Nome"
              autoComplete="blank-nome"
              {...register("sigla", { required: true })}
            />
          </InputGroup>
          <FormErrorMessage>{errors?.nome?.message}</FormErrorMessage>
        </FormControl>
        {/* Dia de Início field */}
        <FormControl className="mb-5" isInvalid={!!errors.diaInicio}>
          <FormLabel htmlFor="diaInicio">Dia de Início</FormLabel>

          <NumberInput defaultValue={1} maxW={31} min={10}>
            <NumberInputField {...register("diaInicio", { required: false })} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>

          <FormErrorMessage>{errors.diaInicio?.message}</FormErrorMessage>
        </FormControl>

        {/* Dia de fim field */}
        <FormControl className="mb-5" isInvalid={!!errors.diaFim}>
          <FormLabel htmlFor="diaFim">Dia de Fim</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaCalendarDay color="#000E31" />
            </InputLeftElement>
            <Input
              id="diaFim"
              type="number"
              min="1"
              max="31"
              placeholder="Dia de fim de obra"
              autoComplete="blank-diaFim"
              {...register("diaFim", { required: false })}
            />
          </InputGroup>
          <FormErrorMessage>{errors.diaFim?.message}</FormErrorMessage>
        </FormControl>
        <div id="button-container" className="flex sm:justify-end gap-2">
          <Button
            size="lg"
            className="mt-3 w-full sm:w-auto bg-teal-200 text-slate-800"
            onClick={() => navigate("/admin")}
          >
            Voltar
          </Button>
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
    </div>
  );
}
