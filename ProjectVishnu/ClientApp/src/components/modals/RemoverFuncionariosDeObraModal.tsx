import { useMemo, useState, useContext } from "react";
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
  Tooltip
} from "@chakra-ui/react";
import IFuncionarioOutput from "../../common/Interfaces/Funcionario/IFuncionarioOutput";
import { removeFuncionarioDeObra } from "../../common/API/APICalls";
import { useGlobalToaster } from "../contexts/Toast/useGlobalToaster";

//TODO: tornar todo o código da tabela das obras universal de maneira a que isto não se repita aqui (e no index das obras)

export default function RemoverFuncionariosDeObraModal({
  funcionario,
  callback,
}: {
  funcionario: IFuncionarioOutput;
  callback: () => void;
}) {
  // State/hooks
  const [date, setDate] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { addToast } = useGlobalToaster();

  const closeModal = () => {
    onClose();
    callback();
  };
  async function removerFuncionario() {
    await removeFuncionarioDeObra(funcionario.id, date!)
      .then(() => {
        addToast({
          title: "Sucesso.",
          description: `Funcionario removido de obra com sucesso.`,
          status: "success",
        });
        callback();
        onClose();
      })
      .catch(() => {
        addToast({
          title: "Erro ao remover funcionarios.",
          description:
            "Ocorreu um erro ao remover funcionario. \n Por favor tente novamente.",
          status: "error",
        });
      });
  }
  return (
    <>
      <Tooltip label={`remover funcionario de obra`} placement="top">
        <Button onClick={onOpen} colorScheme="red" className="w-fit">
          <HiOutlineUserRemove />
        </Button>
      </Tooltip>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Remover {funcionario.nome} de obra</ModalHeader>
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
                  Tem a certeza que deseja remover
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
                Remover
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
