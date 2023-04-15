import { ReactNode, FC, useState, useEffect } from "react";
import IConta from "../../../common/Interfaces/IConta";
import { ContaContext } from "./ContaContext";

interface ContaContextProps {
  children: ReactNode;
}

export const ContaContextProvider: FC<ContaContextProps> = ({ children }) => {
  function getInitialState() {
    const conta = localStorage.getItem("conta");
    return conta ? JSON.parse(conta) : [];
  }
  const [conta, setConta] = useState<IConta | undefined>(getInitialState);
  useEffect(() => {
    setConta(JSON.parse(window.localStorage.getItem("conta")!));
  }, []);
  function changeConta(conta: IConta) {
    setConta(conta);
  }
  return (
    <ContaContext.Provider value={{ conta, setConta }}>
      {children}
    </ContaContext.Provider>
  );
};
