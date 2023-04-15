import {ContaContextValue} from "./ContaContextValue";
import { createContext } from 'react';

const defaultContaContextValue: ContaContextValue = {
  conta: undefined,
  setConta: () => {},
};

export const ContaContext = createContext(defaultContaContextValue);
