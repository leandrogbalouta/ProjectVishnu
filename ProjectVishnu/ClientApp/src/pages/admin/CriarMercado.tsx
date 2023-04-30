import { useState, useEffect } from "react";
import { pt } from "date-fns/locale";
import { createUser } from "../../common/API/APICalls";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { FaGlobe } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import IContaInput from "../../common/Interfaces/Conta/IContaInput";
import IMercado from "../../common/Interfaces/Mercado/IMercado";
import { RxLetterCaseCapitalize } from "react-icons/rx";
import { DateFormatter, DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function CriarMercado() {
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
      dateRange: yup.string().required("Por favor introduza uma range."),
    })
    .required();
  // end of schema
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IMercado>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
  });
  const onSubmit: SubmitHandler<IMercado> = async (data: IMercado) => {};
  // end of form
  async function AddConta(conta: IContaInput) {
    const resp = await createUser(conta);
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
        toast({
          id: "erro",
          title: "Ocorreu um erro ao criar mercado.",
          position: "top-right",
          duration: 10000,
          status: "error",
          isClosable: true,
        });
      }
    }
  }
  useEffect(() => {}, []);
  // Formatter day picker
  const formatCaption: DateFormatter = () => {
    // Remove month
    return <></>;
  };

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
        <FormControl
          className="mb-5 basis-2/5 flex flex-col w-full"
          isInvalid={!!errors.dateRange}
        >
          <FormLabel htmlFor="sigla">Sigla</FormLabel>
          <div className="!flex !m-auto flex-col w-full">
            <div className="!flex !m-auto flex-col w-full ring-slate-200 ring-2 rounded-xl !p-3 !text-xl [&>th]:!p-12">
              <Controller
                name="dateRange"
                control={control}
                render={({
                  field: { onChange, value, name },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <DayPicker
                    id="test"
                    mode="range"
                    onSelect={onChange}
                    disableNavigation
                    formatters={{ formatCaption }}
                    locale={pt}
                    selected={value}
                    className="!m-auto"
                  />
                )}
              />
            </div>
            <FormErrorMessage>{errors?.dateRange?.message}</FormErrorMessage>
          </div>
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
