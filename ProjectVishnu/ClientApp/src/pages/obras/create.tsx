import React, { useState, useEffect } from "react";
import { CreateObra, fetchMercados } from "../../common/APICalls";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  useToast,
} from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import IObraOutput from "../../common/Interfaces/Obra/IObraOutput";
import { FaUser, FaPen, FaCalendarDay } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function ObraCreation() {
  // state
  const [mercados, setMercados] = useState<string[]>([]);
  const [estado, setEstado] = useState<string | undefined>(undefined)
  // Router
  const navigate = useNavigate();
  // misc
  const toast = useToast();
  // schema
  const schema = yup
    .object({
      designacao: yup.string().required("Por favor, introduza a designação."),
      cliente: yup.string().required("Por favor, introduza o nome do cliente."),
      estado: yup.string().required("Por favor, introduza um estado da obra"),
      datainicio: yup.date().typeError("Por favor introduza uma data válida."),
      datafim: yup.date().typeError("Por favor introduza uma data válida"),
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
    const resp = await CreateObra(obra);
    if (resp.status === 201) {
      navigate("/obras");
      if (!toast.isActive("sucesso")) {
        toast({
          id: "sucesso",
          title: `Obra criada com sucesso.`,
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
            title: 'Ocorreu um erro ao criar uma nova obra.',
            position: "top-right",
            duration: 10000,
            status: "error",
            isClosable: true,
          });
        })
      }
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
                <option value="em-curso">
                  Em curso
                </option>
                <option value="completada">
                  Completada
                </option>
                <option value="por-comecar">
                  Por começar
                </option>
              </Select>
            </InputGroup>
            <FormErrorMessage>{errors.mercado?.message}</FormErrorMessage>
          </FormControl>
        {/* Data de Início field */}
        {(estado == "em-curso" || estado == "completada") &&
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
        }
        
        {/* Data de fim field */}
        {estado == "completada" &&
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
        }
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
