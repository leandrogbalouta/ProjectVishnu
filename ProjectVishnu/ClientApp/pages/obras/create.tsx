import React, { useState, useEffect } from "react";
import { CreateObra, fetchMercados } from "../../common/APICalls";
import { useRouter } from "next/router";
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
import { FaUser, FaPen, FaCalendarDay } from "react-icons/fa";

export default function ObraCreation() {
  // state
  const [mercados, setMercados] = useState<string[]>([]);
  // schema
  const schema = yup
    .object({
      designacao: yup.string().required("Por favor, introduza a designação."),
      cliente: yup.string().required("Por favor, introduza o nome do cliente."),
      datainicio: yup.date().typeError("Por favor introduza uma data válida.").required("Por favor, introduza a data de início."),
      mercado: yup.string().required("Por favor, introduza o mercado."),
    })
    .required();
  // end of schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IObraOutput>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
  });
  const onSubmit: SubmitHandler<IObraOutput> = async (data: IObraOutput) => {
    AddObra(data);
  };
  // end of form
  async function AddObra(obra: IObraOutput) {
    const router = useRouter();

    const resp = await CreateObra(obra);
    if (resp.status === 201) {
      const splitLocation = resp.headers.get("location")!.split("OB");
      const location = splitLocation[0].toLowerCase() + "OB" + splitLocation[1];

      const array = location.split("api");
      const result = array.pop();

      router.push(result!);
    }
  }
  useEffect(() => {
    // Get Mercados
    const populateMercados = async () => {
      const response = await fetchMercados();
      const data = await response.json();
      setMercados(data);
    };
    populateMercados();
  }, []);

  return (
    <div>
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
          <FormLabel htmlFor="designacao">Cliente</FormLabel>
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
        {/* Data de Início field */}
        <FormControl className="mb-5" isInvalid={!!errors.datainicio}>
          <FormLabel htmlFor="datainicio">Data de Início</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaCalendarDay color="#000E31" />
            </InputLeftElement>
            <Input
              id="datainicio"
              type="date"
              placeholder="Data de ínicio de contrato"
              autoComplete="blank-datainicio"
              {...register("datainicio", { required: true })}
            />
          </InputGroup>
          <FormErrorMessage>{errors.datainicio?.message}</FormErrorMessage>
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
    </div>
  );
}
