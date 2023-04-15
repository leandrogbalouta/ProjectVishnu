import IConta from "../../../common/Interfaces/IConta";

export interface ContaContextValue {
  conta: IConta | undefined;
  setConta: React.Dispatch<React.SetStateAction<IConta | undefined>>;
}
