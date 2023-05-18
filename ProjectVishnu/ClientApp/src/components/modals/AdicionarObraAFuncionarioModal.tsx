import { useEffect, useState } from "react";
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
  Tooltip,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Input,
  useToast,
} from "@chakra-ui/react";
import IFuncionarioOutput from "../../common/Interfaces/Funcionario/IFuncionarioOutput";
import FilterBar from "../FilterBar";
import { addFuncionarioToObra, fetchObras } from "../../common/API/APICalls";
import { BsBuildingAdd } from "react-icons/bs";
import uniqid from "uniqid";
import TdState from "../tables/TdState";
import IObraOutput from "../../common/Interfaces/Obra/IObraOutput";
import { format } from "date-fns";

//TODO: tornar todo o código da tabela das obras universal de maneira a que isto não se repita aqui (e no index das obras)

export default function AdicionarObraAFuncionarioModal({
  funcionario,
  callback,
}: {
  funcionario: IFuncionarioOutput;
  callback: () => void;
}) {
  // State
  const [obras, setObras] = useState<IObraOutput[]>();
  const [mercado, setMercado] = useState(funcionario.mercado);
  const [searchString, setSearchString] = useState(null);
  const [selectedObra, setSelectedObra] = useState<IObraOutput>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [date, setDate] = useState<string>("");
  const toast = useToast();
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
      setObras(response.data);
    };
    populateObrasData();
  }, [mercado, searchString]);
  function addObraToFunc() {
    const data = format(new Date(date), "yyyy-MM-dd");
    addFuncionarioToObra(funcionario.id, selectedObra!.codigoInterno, data)
      .then(() => {
        toast({
          title: "Sucesso",
          description: `Funcionario Adicionado a obra ${selectedObra?.codigoInterno} com sucesso`,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
        callback();
        onClose();
      })
      .catch((error) => {
        toast({
          title: "Erro",
          description:
            error.response.status === 409
              ? "Por favor remova o funcionário da sua obra atual"
              : "Erro inesperado, por favor tente novamente.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      });
  }
  const DataTable = () =>
    !obras ? (
      <Spinner />
    ) : (
      <div id="table-container" className="flex-1 overflow-scroll">
        <Table className="table table-striped" aria-labelledby="tabelLabel">
          <Thead>
            <Tr className="data-table-header">
              <Th>Código interno</Th>
              <Th>Designação</Th>
              <Th>Cliente</Th>
              <Th>Chefe de obra</Th>
              <Th>Mercado</Th>
              <Th>Estado</Th>
            </Tr>
          </Thead>
          <Tbody>
            {obras.map((obra) => (
              <Tr
                className={`data-table-row ${
                  obra === selectedObra &&
                  "!bg-slate-400 border-2 border-sky-500"
                }`}
                onClick={() => setSelectedObra(obra)}
                key={uniqid()}
              >
                <Td>{obra.codigoInterno}</Td>
                <Td>{obra.designacao}</Td>
                <Td>{obra.cliente}</Td>
                <Td>{obra.chefeDeObra}</Td>
                <Td className="capitalize">{obra.mercado}</Td>
                <TdState state={obra.estado} />
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    );
  return (
    <>
      <Tooltip label="Adicionar obra a funcionario" placement="top">
        <Button onClick={onOpen} colorScheme="blue">
          <BsBuildingAdd />
        </Button>
      </Tooltip>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        size={"full"}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent className="dark:!bg-slate-800 dark:text-white flex-1 h-full">
          <ModalHeader>Escolha uma obra</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} className="flex-1 justify-between">
            <div id="table-container" className="overflow-scroll flex-1">
              <FilterBar
                mercado={mercado}
                setMercado={setMercado}
                setSearchString={setSearchString}
                searchBar
              />
              <DataTable />
            </div>
            <div className="flex flex-col gap-3 mt-3 data-panel">
              <p className="text-lg">Data de fim:</p>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            <div id="button-container" className="flex gap-3">
              <Button
                onClick={addObraToFunc}
                className="text-slate-800"
                isDisabled={!date || !selectedObra}
                colorScheme="blue"
              >
                Adicionar
              </Button>
              <Button onClick={onClose} className="text-slate-800">
                Cancelar
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
