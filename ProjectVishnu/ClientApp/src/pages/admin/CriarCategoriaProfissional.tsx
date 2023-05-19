import {
  createCategoriaProfissional,
  createUser,
} from "../../common/API/APICalls";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ICategoriaProfissional } from "../../common/Interfaces";
import Role from "../../common/Role";
import { useGlobalToaster } from "../../components/contexts/Toast/useGlobalToaster";

export default function CriarCategoriaProfissinal() {
  // Router
  const navigate = useNavigate();
  // misc
  const { addToast, isToastActive } = useGlobalToaster();
  // schema
  const schema = yup
    .object({
      codigo: yup
        .string()
        .required("Por favor, introduza o codigo de categoria profissional.")
        .max(7, "Por favor não exceda 7 caracteres."),
      nomenclatura: yup
        .string()
        .required("Por favor, introduza o nome da categoria profissional."),
    })
    .required();
  // end of schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICategoriaProfissional>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
  });
  const onSubmit: SubmitHandler<ICategoriaProfissional> = async (
    data: ICategoriaProfissional
  ) => {
    AddCategoriaProfissional(data);
  };
  // end of form
  async function AddCategoriaProfissional(
    categoriaProfissional: ICategoriaProfissional
  ) {
    await createCategoriaProfissional(categoriaProfissional)
      .then((resp) => {
        if (resp.status === 201) {
          navigate("/admin");
          if (!isToastActive("sucesso")) {
            addToast({
              id: "sucesso",
              title: "Sucesso",
              description: `Categoria profissional criado com sucesso.`,
              status: "success",
            });
          }
        } else {
          throw new Error("Something mad happen.");
        }
      })
      .catch(() => {
        if (!isToastActive("erro")) {
          addToast({
            title: "erro",
            description: "Ocorreu um erro ao criar categoria profissional.",
            status: "error",
          });
        }
      });
  }
  return (
    <div className="w-full sm:w-1/2 mx-auto">
      <p className="page-header">Criar Categoria Profissional</p>
      <form
        className="flex flex-col min-h-0 max-h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* codigo field */}
        <FormControl className="mb-5 basis-2/5" isInvalid={!!errors.codigo}>
          <FormLabel htmlFor="codigo">Código</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaUser />
            </InputLeftElement>
            <Input
              id="codigo"
              type="text"
              placeholder="Código"
              autoComplete="blank-nome"
              {...register("codigo", { required: true })}
            />
          </InputGroup>
          <FormErrorMessage>{errors?.codigo?.message}</FormErrorMessage>
        </FormControl>
        {/* nome field */}
        <FormControl
          className="mb-5 basis-2/5"
          isInvalid={!!errors.nomenclatura}
        >
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
              {...register("nomenclatura", { required: true })}
            />
          </InputGroup>
          <FormErrorMessage>{errors?.nomenclatura?.message}</FormErrorMessage>
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
