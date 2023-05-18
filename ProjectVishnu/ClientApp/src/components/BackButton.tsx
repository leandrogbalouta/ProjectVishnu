import { Button } from "@chakra-ui/react";
import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

interface Params extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href: string;
}

export default function BackButton({ href, ...rest}: Params) {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate(href)}
      colorScheme="blue"
      {...rest}
      className={`w-fit ${rest.className }`}
    >
      <p>Voltar</p>
    </Button>
  );
}
