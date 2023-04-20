import IContaOutput from "../../../common/Interfaces/Conta/IContaOutput";

export interface ContaContextValue {
  conta: IContaOutput | undefined;
  setConta: React.Dispatch<React.SetStateAction<IContaOutput | undefined>>;
}
