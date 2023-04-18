import { useState, useContext } from "react";
import { BsPower } from "react-icons/bs";
import {
  ModalFooter,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { SlPower } from "react-icons/sl";
import { ContaContext } from "./contexts/Conta/ContaContext";
import { useNavigate } from "react-router-dom";

export default function LogoutModal() {
  const [loggingOut, setLoggingOut] = useState<boolean>();
  const navigate = useNavigate();
  const { onClose, isOpen, onOpen } = useDisclosure();
  const { setConta } = useContext(ContaContext);
  async function logout() {
    setLoggingOut(true);
    localStorage.removeItem("conta");
    setConta(undefined);
    navigate("/");
  }
  return (
    <>
      <button
        id="logout"
        title="open-settings"
        type="button"
        className="text-orange-400 hover:text-orange-600 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1"
        onClick={onOpen}
      >
        <SlPower className="h-5 w-5" />
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(3px)" bg="blackAlpha.300" />
        <ModalContent className="h-full !m-0 sm:h-[unset] sm:!mt-16 sm:max-h-[80%]">
          <ModalHeader className="flex m-0 my-auto [&>*]:my-auto gap-2">
            <BsPower className="!text-red-500" />
            Logout
          </ModalHeader>
          <ModalCloseButton className="!hidden md:!block" />
          <ModalBody className="text-center fs-4 !p-0 mb-3 mx-3 overflow-auto">
            <h3 className="text-xl pt-3">Tem a certeza que prentende</h3>
            <h3 className="p-0 text-xl">terminar sessão?</h3>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              isLoading={loggingOut}
              colorScheme="red"
              onClick={async () => await logout()}
            >
              Terminar sessão!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
