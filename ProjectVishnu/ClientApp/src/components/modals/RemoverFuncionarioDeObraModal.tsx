import { useMemo, useState } from "react";
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
} from "@chakra-ui/react";
import IFuncionarioOutput from "../../common/Interfaces/Funcionario/IFuncionarioOutput";
import { removeFuncionarioDeObra } from "../../common/APICalls";

//TODO: tornar todo o código da tabela das obras universal de maneira a que isto não se repita aqui (e no index das obras)

export default function RemoverFuncionarioDeObraModal({
  funcionario,
}: {
  funcionario: IFuncionarioOutput;
}) {
  // State/hooks
  const [date, setDate] = useState<string>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // sub-component - TODO fix this
  // const DatePicker = () =>
  //   useMemo(
  //     () => (
  //       <Input
  //         type="date"
  //         value={date}
  //         onChange={(e) => setDate(e.target.value)}
  //       />
  //     ),
  //     [date]
  //   );
  // Main-component
  async function removerFuncionario() {
    await removeFuncionarioDeObra(funcionario.id, date!).then(() => {});
  }
  return (
    <>
      <Button onClick={onOpen} colorScheme="red" className="w-full sm:w-fit">
        Remover de obra
      </Button>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Remover "{funcionario.nome}" de obra</ModalHeader>
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
                  Tem a certeza que deseja remover <b>{funcionario.nome}</b> com
                  o NIF <b>{funcionario.nif}</b> da obra ativa?
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
