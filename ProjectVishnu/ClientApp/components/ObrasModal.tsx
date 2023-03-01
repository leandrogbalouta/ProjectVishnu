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
  } from '@chakra-ui/react'
import IFuncionarioOutput from "../common/Interfaces/Funcionario/IFuncionarioOutput";
import FilterBar from "./FilterBar";
import IObraOutput from "../common/Interfaces/Obra/IObraOutput";
import { AddFuncionarioToObra, AddObraToFunc, fetchObras } from "../common/APICalls";

//TODO: tornar todo o código da tabela das obras universal de maneira a que isto não se repita aqui (e no index das obras)

export default function ObrasModal(funcionario : IFuncionarioOutput){
    const [obras, setObras] = useState(null);
    const [mercado, setMercado] = useState(funcionario.mercado);
    const [searchString, setSearchString] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure()

    let contents = !obras ? <Spinner /> : renderObrasTable(obras);

    useEffect(() => {
      const filters = Object.assign(
        {},
        {estado : "em-curso"},
        mercado === null ? null : { mercado: mercado },
        searchString === null ? null : { valor: searchString }
      );
  
      const populateObrasData = async () => {
        const response = await fetchObras(filters);
        const data = await response.json();
        setObras(data);
      };
      populateObrasData();
    }, [mercado, searchString])

    return (
      <>
        <Button
          onClick={onOpen}
          colorScheme="blue"
        >
          Adicionar a Obra
        </Button>

        <Modal closeOnOverlayClick={false} isOpen={isOpen} size={"full"} onClose={onClose}>
          <ModalOverlay />
          <ModalContent  className="dark:!bg-slate-800 dark:text-white">
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
              <Button colorScheme='blue' mr={3}>
                Save
              </Button>
              <Button onClick={onClose} className="text-slate-800">Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )

    function renderObrasTable(Obras: IObraOutput[]) {
      return (
        <div id="table-container" className="overflow-x-scroll flex-1">
          <Table className="table table-striped" aria-labelledby="tabelLabel">
            <Thead>
              <Tr className="data-table-header">
                <Th>Código interno</Th>
                <Th>Designação</Th>
                <Th>Cliente</Th>
                <Th>Mercado</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Obras.map((obra) => (
                <Tr
                  className="data-table-row"
                  onClick={() => {addObraToFunc(obra.codigoInterno)}}
                  key={obra.codigoInterno}
                >
                  <Td>{obra.codigoInterno}</Td>
                  <Td>{obra.designacao}</Td>
                  <Td>{obra.cliente}</Td>
                  <Td className="capitalize">{obra.mercado}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </div>
      );
    }

    function addObraToFunc(codigoInterno : string){
      const date = new Date();
      let day = date.getDate()
      let month = date.getMonth()+1
      let year = date.getFullYear()

      let today = `${year}-${month}-${day}`

      AddFuncionarioToObra(funcionario.id, codigoInterno, today)
    }
}
