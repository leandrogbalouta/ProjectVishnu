import { Td } from "@chakra-ui/react";

interface StateMapping {
  [key: string]: {
    estado: string;
    classe: string;
  };
}
const states: StateMapping = {
  "por-comecar": {
    classe: "bg-slate-100",
    estado: "Por começar",
  },
  "completada": {
    classe: "bg-emerald-300",
    estado: "Completada",
  },
  "em-curso": {
    classe: "bg-cyan-300",
    estado: "Em curso",
  },
};
export default function TdState({ state }: { state: string }) {
  const stateData = states[state] ?? { classe: "", estado: "" };
  return <Td className={"text-black ".concat(stateData.classe)}>{stateData.estado}</Td>;
}
