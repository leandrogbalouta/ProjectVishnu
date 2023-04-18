import { useEffect, useState, useContext } from "react";
import { RiUserFill } from "react-icons/ri";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  FormErrorMessage,
  InputGroup,
  Input,
  InputLeftElement,
  Button,
  FormControl,
} from "@chakra-ui/react";

import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import AuthenticationPanel from "../components/AuthenticationPanel";
import { tryLogin } from "../common/APICalls";
import IConta from "../common/Interfaces/IConta";
import useAuth from "../auth/useAuth";

export default function Login() {
  const [loggingIn, setLoggingIn] = useState<boolean>();
  const [invalidLogin, setInvalidLogin] = useState<boolean>();
  const navigate = useNavigate();
  const { conta, setConta } = useAuth()

  console.log("login")

  type Inputs = {
    username: string;
    password: string;
  };


  const schema = yup
    .object({
      username: yup.string().required("Please enter your user name."),
      password: yup.string().required("Please enter your password."),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // In case it's on, deactivate invalidLogin message
    setLoggingIn(true);
    setInvalidLogin(false);
    tryLogin(data.username, data.password)
      .then((response) => {
        // Response here is a token if valid or unauthorized if invalid.
        if (response.status === 200) {
          setLoggingIn(false);
          response.json().then((resp: IConta) => {
            setConta(resp);
            localStorage.setItem("conta", JSON.stringify(resp));
            navigate("/");
          });
        } else {
          setInvalidLogin(true);
          setLoggingIn(false);
        }
      })
      .catch(() => {
        setInvalidLogin(true);
        setLoggingIn(false);
      });
    // Make the button stop spinning.
  };
  // effect, if user logged in (token valid) redirect to homepage
  useEffect(() => {
    if (conta) navigate("/");
  });
  return (
    <AuthenticationPanel>
      <form
        id="login-form"
        onSubmit={handleSubmit(onSubmit)}
        className="my-4 mx-5"
      >
        {/* UserName field */}
        <FormControl
          className="mb-5"
          isInvalid={!!errors.username || invalidLogin}
        >
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<RiUserFill color="#000E31" />}
            />
            <Input
              id="username"
              type="text"
              placeholder="Username"
              autoComplete="blank-username"
              autoFocus
              {...register("username", { required: true })}
            />
          </InputGroup>
          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        </FormControl>
        {/* Password field */}
        <FormControl
          isInvalid={!!errors.password || invalidLogin}
          className="mb-5"
        >
          <PasswordInput<Inputs>
            id="password"
            register={register}
            label="password"
            required
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={invalidLogin}>
          <FormErrorMessage className="flex flex-col !text-start ml-1 !items-start gap-1">
            <p>The credentials you provided were incorrect.</p>
            <p>Please re-input your credentials and try again.</p>
          </FormErrorMessage>
        </FormControl>
        <div className="flex justify-end mt-2">
          <Button
            colorScheme={"blue"}
            type="submit"
            className="w-full sm:w-[unset]"
            isLoading={loggingIn}
          >
            Sign In
          </Button>
        </div>
        <Link
          to="/forgot-password"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Forgot Password?
        </Link>
      </form>
    </AuthenticationPanel>
  );
}
