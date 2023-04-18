import IContaOutput from "../../../common/Interfaces/IContaOutput";

export interface ContaContextValue {
  conta: IContaOutput | undefined;
  setConta: React.Dispatch<React.SetStateAction<IContaOutput | undefined>>;
}
