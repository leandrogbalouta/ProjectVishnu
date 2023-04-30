import { useState, useEffect } from "react";
import { createUser, fetchTiposDeUser } from "../../common/API/APICalls";
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
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import IContaInput from "../../common/Interfaces/Conta/IContaInput";
import PasswordInput from "../../components/PasswordInput";

interface TipoDeUser {
  tipo: string;
}

export default function CriarUtilizador() {
  // state
  const [tiposDeUser, setTiposDeUser] = useState<string[]>([]);
  const [estado, setEstado] = useState<string | undefined>(undefined);
  // Router
  const navigate = useNavigate();
  // misc
  const toast = useToast();
  // schema
  const schema = yup
    .object({
      username: yup.string().required("Por favor, introduza o username."),
      password: yup.string().required("Por favor, introduza uma password."),
      tipoDeUser: yup
        .string()
        .required("Por favor escolha um tipo de utilizador."),
    })
    .required();
  // end of schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IContaInput>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
  });
  const onSubmit: SubmitHandler<IContaInput> = async (data: IContaInput) => {
    AddConta(data);
  };
  // end of form
  async function AddConta(conta: IContaInput) {
    await createUser(conta)
      .then((resp) => {
        if (resp.status === 201) {
          navigate("/admin");
          if (!toast.isActive("sucesso")) {
            toast({
              id: "sucesso",
              title: `Utiliador criado com sucesso.`,
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
            title: error.response.data.title,
            position: "top-right",
            duration: 10000,
            status: "error",
            isClosable: true,
          });
        }
      });
  }
  useEffect(() => {
    // Get Mercados
    const populateTiposDeUser = async () => {
      const response = await fetchTiposDeUser();
      setTiposDeUser(response.data);
    };
    populateTiposDeUser();
  }, []);

  return (
    <div className="w-full sm:w-1/2 mx-auto">
      <p className="page-header">Criar Utilizador</p>
      <form
        className="flex flex-col min-h-0 max-h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* username field */}
        <FormControl className="mb-5 basis-2/5" isInvalid={!!errors.username}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaUser />
            </InputLeftElement>
            <Input
              id="username"
              type="text"
              placeholder="Username"
              autoComplete="blank-username"
              {...register("username", { required: true })}
            />
          </InputGroup>
          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        </FormControl>
        {/* Password field */}
        <FormControl className="mb-5" isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <PasswordInput
            id="password"
            register={register}
            label="password"
            required
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        {/* tipo de utilizador field */}
        <FormControl className="mb-5" isInvalid={!!errors.tipoDeUser}>
          <FormLabel htmlFor="mercado">Tipo de user</FormLabel>
          <InputGroup>
            <Select
              id="tiposDeUser"
              className="capitalize"
              placeholder="Tipo de user"
              {...register("tipoDeUser", { required: true })}
            >
              {tiposDeUser && (
                <>
                  {tiposDeUser.map((tipo: string) => (
                    <option value={tipo} key={tipo}>
                      {tipo}
                    </option>
                  ))}
                </>
              )}
            </Select>
          </InputGroup>
          <FormErrorMessage>{errors.tipoDeUser?.message}</FormErrorMessage>
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
