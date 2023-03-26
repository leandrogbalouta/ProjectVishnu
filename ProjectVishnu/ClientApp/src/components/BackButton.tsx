import { Button } from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import AppRoutes from "../common/AppRoutes";

export default function BackButton({ href}:{ href:string}) {
  return (
    <Button
      onClick={() => AppRoutes.navigate(href)}
      colorScheme="blue"
      className="w-fit"
    >
      <AiOutlineArrowLeft />
      <p>Voltar</p>
    </Button>
  );
}
