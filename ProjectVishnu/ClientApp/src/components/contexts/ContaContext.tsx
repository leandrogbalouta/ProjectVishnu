import { createContext, FC, ReactNode, useEffect, useState } from "react";
import IConta from "../../common/Interfaces/IConta";

interface ContaContextValue {
  conta: IConta | undefined;
  setConta: React.Dispatch<React.SetStateAction<IConta | undefined>>;
}

interface ContaContextProps {
  children: ReactNode;
  value: ContaContextValue;
}

const defaultContaContextValue: ContaContextValue = {
  conta: undefined,
  setConta: () => {},
};

export const ContaContext = createContext(defaultContaContextValue);

export const ContaContextProvider: FC<ContaContextProps> = ({
  children,
  value,
}) => {
  const [conta, setConta] = useState<IConta | undefined>(value.conta);
  const contextValue: ContaContextValue = {
    conta,
    setConta,
  };

  return (
    <ContaContext.Provider value={contextValue}>
      {children}
    </ContaContext.Provider>
  );
};
