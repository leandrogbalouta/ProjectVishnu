import { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import IObraOutput from "../../common/Interfaces/Obra/IObraOutput";
import { useNavigate } from "react-router-dom";
import { createObra, fetchMercados } from "../../common/API/APICalls";
import { FaPen, FaUser, FaCalendarDay } from "react-icons/fa";
import { useGlobalToaster } from "../../components/contexts/Toast/useGlobalToaster";

export function ObraCreation() {
  const [mercados, setMercados] = useState<string[]>([]);
  const [estado, setEstado] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const { addToast, isToastActive } = useGlobalToaster();

  const schema = yup
    .object({
      designacao: yup.string().required("Por favor, introduza a designação."),
      cliente: yup.string().required("Por favor, introduza o nome do cliente."),
      estado: yup.string().required("Por favor, introduza o estado da obra"),
      datainicio: yup.date().typeError("Por favor introduza uma data válida."),
      datafim: yup.date().typeError("Por favor introduza uma data válida"),
      mercado: yup.string().required("Por favor, introduza o mercado."),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IObraOutput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IObraOutput> = async (data) => AddObra(data);
  // end of form
  async function AddObra(obra: IObraOutput) {
    await createObra(obra)
      .then((resp) => {
        if (resp.status === 201) {
          navigate("/obras");
          if (!isToastActive("sucesso")) {
            addToast({
              id: "sucesso",
              title: "Sucesso",
              description: `Obra criada com sucesso.`,
              status: "success",
            });
          }
        } else {
          throw new Error("Something mad happen.");
        }
      })
      .catch((error) => {
        if (!isToastActive("erro")) {
          addToast({
            id: "erro",
            title: "Erro",
            description: error.response.data.title,
            status: "error",
          });
        }
      });
  }
  useEffect(() => {
    // Get Mercados
    const populateMercados = async () => {
      const response = await fetchMercados();
      setMercados(response.data);
    };
    populateMercados();
  }, []);

  return (
    <div className="w-full sm:w-1/2 mx-auto">
      <p className="page-header">Criar uma Obra</p>
      <form
        className="flex flex-col min-h-0 max-h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Designação field */}
        <FormControl className="mb-5 basis-2/5" isInvalid={!!errors.designacao}>
          <FormLabel htmlFor="designacao">Designação</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaPen />
            </InputLeftElement>
            <Input
              id="designacao"
              type="text"
              placeholder="Designação"
              autoComplete="blank-designacao"
              {...register("designacao", { required: true })}
            />
          </InputGroup>
          <FormErrorMessage>{errors.designacao?.message}</FormErrorMessage>
        </FormControl>
        {/* Cliente field */}
        <FormControl className="mb-5 basis-2/5" isInvalid={!!errors.cliente}>
          <FormLabel htmlFor="cliente">Cliente</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaUser />
            </InputLeftElement>
            <Input
              id="cliente"
              type="text"
              placeholder="Cliente"
              autoComplete="blank-cliente"
              {...register("cliente", { required: true })}
            />
          </InputGroup>
          <FormErrorMessage>{errors.cliente?.message}</FormErrorMessage>
        </FormControl>
        {/* Estado field */}
        <FormControl className="mb-5" isInvalid={!!errors.estado}>
          <FormLabel htmlFor="estado">Estado</FormLabel>
          <InputGroup>
            <Select
              id="estado"
              placeholder="Estado"
              {...register("estado", { required: true })}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="em-curso">Em curso</option>
              <option value="completada">Completada</option>
              <option value="por-comecar">Por começar</option>
            </Select>
          </InputGroup>
          <FormErrorMessage>{errors.mercado?.message}</FormErrorMessage>
        </FormControl>
        {/* Data de Início field */}
        {(estado == "em-curso" || estado == "completada") && (
          <FormControl className="mb-5" isInvalid={!!errors.datainicio}>
            <FormLabel htmlFor="datainicio">Data de Início</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaCalendarDay color="#000E31" />
              </InputLeftElement>
              <Input
                id="datainicio"
                type="date"
                placeholder="Data de ínicio de obra"
                autoComplete="blank-datainicio"
                {...register("datainicio", { required: false })}
              />
            </InputGroup>
            <FormErrorMessage>{errors.datainicio?.message}</FormErrorMessage>
          </FormControl>
        )}

        {/* Data de fim field */}
        {estado == "completada" && (
          <FormControl className="mb-5" isInvalid={!!errors.datafim}>
            <FormLabel htmlFor="datafim">Data de Fim</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaCalendarDay color="#000E31" />
              </InputLeftElement>
              <Input
                id="datafim"
                type="date"
                placeholder="Data de fim de obra"
                autoComplete="blank-datafim"
                {...register("datafim", { required: false })}
              />
            </InputGroup>
            <FormErrorMessage>{errors.datafim?.message}</FormErrorMessage>
          </FormControl>
        )}
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
                  w
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
        <div id="button-container" className="flex sm:justify-end gap-2">
          <Button
            size="lg"
            className="mt-3 w-full sm:w-auto bg-teal-200 text-slate-800"
            onClick={() => navigate("/obras")}
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
