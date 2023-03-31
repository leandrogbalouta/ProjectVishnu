import { Button } from "@chakra-ui/react";
import { BsArrowLeftShort } from "react-icons/bs";
import notFound from "./../img/404.svg";
import AppRoutes from '../common/AppRoutes';
export default function Custom404() {
  return (
    <>
      <div className="h-full m-auto my-20 [&>*]:mx-auto [&>*]:text-center">
        <p className="text-2xl">Página não encontrada</p>
        <img src={notFound} alt="not found image" />
        <p>Lamentamos mas não foi possível encontrar a página que procura.</p>
      </div>
      <div id="button-container" className="ml-auto">
        <Button colorScheme="blue" leftIcon={<BsArrowLeftShort  />} onClick={() => AppRoutes.navigate("/")}>
          <p>Voltar</p>
        </Button>
      </div>
    </>
  );
}
