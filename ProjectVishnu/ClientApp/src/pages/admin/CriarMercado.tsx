import { pt } from "date-fns/locale";
import { createMercado } from "../../common/API/APICalls";
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
import { RxLetterCaseCapitalize } from "react-icons/rx";
import { DateFormatter, DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { IMercadoOutput, IMercadoInput } from "../../common/Interfaces/Mercado";

export default function CriarMercado() {
  const navigate = useNavigate();
  const toast = useToast();
  const january = new Date("jan-99")
  // schema
  const schema = yup
    .object({
      nome: yup.string().required("Por favor, introduza o nome do mercado."),
      sigla: yup
        .string()
        .required("Por favor, introduza a sigla para o mercado.")
        .length(2, "Uma sigla consiste em 2 caracteres"),
      dateRange: yup
        .mixed<DateRange>()
        .required("Por favor introduza um ciclo.")
        .test(
          "is-to-valid-date",
          "Por favor introdiza um ciclo válido.",
          (value) => {
            return !value || !!value!.to;
          }
        ),
    })
    .required();
  // end of schema
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IMercadoInput>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
  });
  const onSubmit: SubmitHandler<IMercadoInput> = async (
    data: IMercadoInput
  ) => {
    console.log(data);
    const mercado: IMercadoOutput = { 
      name: data.nome,
      sigla: data.sigla,
      diaInicio: data.dateRange!.from!.getDate(),
      diaFim: data.dateRange!.to!.getDate(),
    };
    AddMercado(mercado);
  };
  // end of form
  async function AddMercado(mercado: IMercadoOutput) {
    await createMercado(mercado)
      .then((resp) => {
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
          throw new Error("Something mad happen.");
        }
      })
      .catch((error) => {
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
      });
  }
  // Formatter day picker
  const formatCaption: DateFormatter = (month) => {
    const monthNumber = month.getMonth();
    return <>Mês {monthNumber}</>;
  };

  return (
    <div className="w-full h-full px-3 sm:px-8 flex flex-col">
      <p className="page-header">Criar Mercado</p>
      <form className="flex flex-col flex-1 w-fit mx-auto" onSubmit={handleSubmit(onSubmit)}>
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
              placeholder="Sigla"
              autoComplete="blank-sigla"
              {...register("sigla", { required: true })}
            />
          </InputGroup>
          <FormErrorMessage>{errors?.sigla?.message}</FormErrorMessage>
        </FormControl>
        <div className="flex flex-1 sm:justify-end">
          {/* Range */}
          <FormControl
            className="mb-5 md:mb-0 flex flex-col sm:basis-0"
            isInvalid={!!errors.dateRange}
          >
            <FormLabel htmlFor="sigla">Ciclo</FormLabel>
            <div className="!flex flex-col justify-end mx-auto sm:mx-0">
              <div className="!flex flex-col ring-slate-200 ring-2 rounded-xl !px-3 py-7 !text-xl [&>th]:!p-12 w-fit">
                <Controller
                  name="dateRange"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <DayPicker
                      id="test"
                      mode="range"
                      onSelect={onChange}
                      disableNavigation
                      numberOfMonths={2}
                      formatters={{ formatCaption }}
                      locale={pt}
                      selected={value}
                      className="!m-0"
                      defaultMonth={new Date(2015, 1)}
                    />
                  )}
                />
              </div>
              <FormErrorMessage>{errors?.dateRange?.message}</FormErrorMessage>
            </div>
          </FormControl>
        </div>

        <div
          id="button-container"
          className="flex sm:justify-end gap-2 mt-auto"
        >
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
