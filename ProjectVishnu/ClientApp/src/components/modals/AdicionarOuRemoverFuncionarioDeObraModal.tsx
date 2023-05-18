import { useMemo, useState } from "react";
import { HiOutlineUserRemove } from "react-icons/hi";
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
  Input,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import IFuncionarioOutput from "../../common/Interfaces/Funcionario/IFuncionarioOutput";
import { removeFuncionarioDeObra } from "../../common/API/APICalls";

//TODO: tornar todo o código da tabela das obras universal de maneira a que isto não se repita aqui (e no index das obras)

export default function AdicionarOuRemoverFuncionariosDeObraModal({
  funcionario,
  modo,
  callback,
}: {
  funcionario: IFuncionarioOutput;
  modo: "adicionar" | "remover";
  callback: () => void;
}) {
  // State/hooks
  const [date, setDate] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  // Todo array para isto ou wtv
  const verboInfinitivo = modo === "adicionar" ? "adicionar" : "remover";
  const verboInfinitivoMaiusculo =
    modo === "adicionar" ? "Adicionar" : "Remover";
  const verboPassado = modo === "adicionar" ? "adicionado" : "removido";
  // Main-component
  async function removerFuncionario() {
    await removeFuncionarioDeObra(funcionario.id, date!)
      .then((resp) => {
        if (resp.status !== 200) throw new Error("error");
        toast({
          title: "Sucesso.",
          description: `Funcionario ${
            modo === "adicionar" ? "adicionado" : "removido"
          } de obra com sucesso.`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        // close modal.
        callback();
        onClose();
      })
      .catch(() => {
        toast({
          title: "Erro ao remover funcionarios.",
          description:
            "Ocorreu um erro ao remover funcionario. \n Por favor tente novamente.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      });
  }
  return (
    <>
      <Tooltip
        label={`${verboInfinitivoMaiusculo} funcionario de obra`}
        placement="top"
      >
        <Button onClick={onOpen} colorScheme="red" className="w-fit">
          <HiOutlineUserRemove />
        </Button>
      </Tooltip>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {verboInfinitivoMaiusculo} "{funcionario.nome}" de obra
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="flex flex-col gap-3">
                <p className="text-lg">Data de fim:</p>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <p>
                  Tem a certeza que deseja {verboInfinitivo}{" "}
                  <b>{funcionario.nome}</b> com o NIF <b>{funcionario.nif}</b>{" "}
                  da obra ativa?
                </p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="gray" mr={3} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={() => removerFuncionario()}>
                {verboInfinitivoMaiusculo}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
