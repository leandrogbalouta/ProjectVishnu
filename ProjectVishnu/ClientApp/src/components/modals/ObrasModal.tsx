import React, { useEffect, useState } from "react";
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
  Table,
  Tr,
  Thead,
  Th,
  Tbody,
  Td,
  Spinner,
} from "@chakra-ui/react";
import IFuncionarioOutput from "../../common/Interfaces/Funcionario/IFuncionarioOutput";
import FilterBar from "../FilterBar";
import IObraOutput from "../../common/Interfaces/Obra/IObraOutput";
import {
  AddFuncionarioToObra,
  AddObraToFunc,
  fetchObras,
} from "../../common/APICalls";
import ObrasTable from "../tables/ObrasTable";
import RemoverFuncionarioDeObraModal from "./RemoverFuncionarioDeObraModal";

//TODO: tornar todo o código da tabela das obras universal de maneira a que isto não se repita aqui (e no index das obras)

export default function ObrasModal({
  funcionario,
}: {
  funcionario: IFuncionarioOutput;
}) {
  // State
  const [obras, setObras] = useState(null);
  const [mercado, setMercado] = useState(funcionario.mercado);
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
    const populateObrasData = async () => {
      const response = await fetchObras(filters);
      const data = await response.json();
      setObras(data);
    };
    populateObrasData();
  }, [mercado, searchString]);
  function addObraToFunc(codigoInterno: string) {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let today = `${year}-${month}-${day}`;

    AddFuncionarioToObra(funcionario.id, codigoInterno, today)
      .then(res => {
        if(res.status === 409) alert("Por favor remova o funcionário da sua obra atual")
      })
  }
  const contents = !obras ? (
    <Spinner />
  ) : (
    <>
      <ObrasTable obras={obras} dataOnRowClick={addObraToFunc}/>
    </>
  );
  return (
    <>
      <Button onClick={onOpen} colorScheme="blue">
        Adicionar a Obra
      </Button>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        size={"full"}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent className="dark:!bg-slate-800 dark:text-white">
          <ModalHeader>Escolha uma obra</ModalHeader>
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
            <Button onClick={onClose} className="text-slate-800">
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
