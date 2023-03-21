import { useEffect, useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import FilterBar from "../FilterBar";
import IObraOutput from "../../common/Interfaces/Obra/IObraOutput";
import { fetchFuncionarios } from "../../common/APICalls";
import FuncionariosTable from "../tables/FuncionariosTable";

//TODO: tornar todo o código da tabela das obras universal de maneira a que isto não se repita aqui (e no index das obras)

export default function FuncioanriosModal({ obra }: { obra: IObraOutput }) {
  // State
  const [funcionarios, setFuncionarios] = useState(null);
  const [mercado, setMercado] = useState(obra.mercado);
  const [searchString, setSearchString] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Effect
  useEffect(() => {
    const filters = Object.assign(
      {},
      { estado: "em-curso" },
      mercado === null ? null : { mercado: mercado },
      searchString === null ? null : { valor: searchString }
    );
    // Misc
    const populateFuncioariosData = async () => {
      const response = await fetchFuncionarios(filters);
      const data = await response.json();
      setFuncionarios(data);
    };
    populateFuncioariosData();
  }, [mercado, searchString]);
  function addObraToFunc(codigoInterno: string) {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let today = `${year}-${month}-${day}`;

    // AddFuncionarioToObra(funcionario.id, codigoInterno, today);
  }
  const contents = !funcionarios ? (
    <Spinner />
  ) : (
    <FuncionariosTable funcionarios={funcionarios} />
  );
  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="blue"
        className="w-fit [&>*]:text-xl"
      >
        <AiOutlineUserAdd />
      </Button>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        size={"full"}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent className="dark:!bg-slate-800 dark:text-white">
          <ModalHeader>Escolha o/os funcionarios</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FilterBar
              mercado={mercado}
              setMercado={setMercado}
              setSearchString={setSearchString}
              searchBar
            />
            {contents}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Guardar
            </Button>
            <Button onClick={onClose} className="text-slate-800">
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
