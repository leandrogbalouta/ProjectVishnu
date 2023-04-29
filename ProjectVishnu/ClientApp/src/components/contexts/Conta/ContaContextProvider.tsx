import { ReactNode, FC, useState, useEffect } from "react";
import GetConta from "../../../common/GetConta";
import IContaOutput from "../../../common/Interfaces/Conta/IContaOutput";
import { ContaContext } from "./ContaContext";

interface ContaContextProps {
  children: ReactNode;
}

export const ContaContextProvider: FC<ContaContextProps> = ({ children }) => {
  const [conta, setConta] = useState<IContaOutput | undefined>(GetConta());

  return (
    <ContaContext.Provider value={{ conta, setConta }}>
      {children}
    </ContaContext.Provider>
  );
};
