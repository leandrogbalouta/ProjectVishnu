import { ReactNode, FC, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import GetConta from "../../../common/GetConta";
import IContaOutput from "../../../common/Interfaces/Conta/IContaOutput";
import { ContaContext } from "./ContaContext";

interface ContaContextProps {
  children: ReactNode;
}

export const ContaContextProvider: FC<ContaContextProps> = ({ children }) => {
  const [conta, setConta] = useState<IContaOutput | undefined>();
  const location = useLocation();
  useEffect(() => {
    const cnt = GetConta();
    if (cnt) setConta(cnt);
  },[location])
  return (
    <ContaContext.Provider value={{ conta, setConta }}>
      {children}
    </ContaContext.Provider>
  );
};
