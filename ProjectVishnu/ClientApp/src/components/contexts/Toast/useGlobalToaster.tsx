import { useToast } from "@chakra-ui/react";

export const useGlobalToaster = () => {
  const toaster = useToast();
  // types are: "success", "info", "warning", "error"
  const addToast = ({
    id,
    title,
    description,
    status,
  }: {
    id?: string;
    title: string;
    description: string;
    status: "success" | "error";
  }) => {
    toaster({
      id: id ?? "toasty",
      title: title,
      description: description,
      status: status,
      position: "top-right",
      isClosable: true,
      duration: 5000,
    });
  };
  const isToastActive = (toast: string) => toaster.isActive(toast);
  return { addToast, isToastActive };
};
