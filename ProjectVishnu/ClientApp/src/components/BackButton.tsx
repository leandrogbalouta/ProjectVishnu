import { Button } from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

export default function BackButton({ href}:{ href:string}) {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate(href)}
      colorScheme="blue"
      className="w-fit"
    >
      <AiOutlineArrowLeft />
      <p>Voltar</p>
    </Button>
  );
}
