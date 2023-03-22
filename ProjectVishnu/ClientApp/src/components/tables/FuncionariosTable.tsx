import { Table, Thead, Tr, Th, Tbody, Td, Checkbox } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import IFuncionarioOutput from "../../common/Interfaces/Funcionario/IFuncionarioOutput";
import AppRoutes from "../../common/AppRoutes";
import SemDadosRow from "../SemDadosRow";
import { useEffect } from "react";

interface Props {
  funcionarios: IFuncionarioOutput[];
  selectable?: true; 
  funcionariosIdList: number[]; // TODO custom hook or similar
  funcionariosIdListSetter?: any; // TODO change this to dispatch or the right type.
}
export default function FuncionariosTable({ funcionarios, selectable, funcionariosIdList, funcionariosIdListSetter }: Props) {
  const navigate = useNavigate();
  useEffect(() => {
    if (selectable && !(funcionariosIdList && funcionariosIdListSetter)) {
      throw new Error("If you mark the table as selectable, you must set funcionariosIdList and funcionariosIdListSetter");
    }
  },[])
  const addToFuncionariosList = (id: number) => { 
    funcionariosIdListSetter((funcionariosIdList: number[]) => [...funcionariosIdList!, id]); 
  }
  const removeFuncionarioFromList = (id: number) => { 
    funcionariosIdListSetter((funcionariosIdList: number[]) => [...funcionariosIdList.filter(funcId => funcId != id)]); 
  }
  return (
    <div id="table-container" className="overflow-x-scroll flex-1">
      <Table className="table table-striped" aria-labelledby="tabelLabel">
        <Thead>
          <Tr className="data-table-header">
            {selectable &&
              <Th>#</Th>
            }
            <Th>Nome</Th>
            <Th>Nif</Th>
            <Th>Niss</Th>
            <Th>Mercado</Th>
          </Tr>
        </Thead>
        <Tbody>
          {funcionarios && funcionarios.length > 0 ? (
            funcionarios.map((funcionario) => (
              <Tr
                className="data-table-row"
                key={funcionario.nif}
              >
                {selectable && 
                  <Td className="!border-r-slate-100">
                    <Checkbox className="bg-white rounded" onChange={(e) => e.target.checked ? addToFuncionariosList(funcionario.id) : removeFuncionarioFromList(funcionario.id)}/>
                  </Td>
                }
                <Td onClick={() => redirectToFuncionario(funcionario.id)}>{funcionario.nome}</Td>
                <Td onClick={() => redirectToFuncionario(funcionario.id)}>{funcionario.nif}</Td>
                <Td onClick={() => redirectToFuncionario(funcionario.id)}>{funcionario.niss}</Td>
                <Td onClick={() => redirectToFuncionario(funcionario.id)} className="capitalize">{funcionario.mercado}</Td>
              </Tr>
            ))
          ) : (
            <SemDadosRow />
          )}
        </Tbody>
      </Table>
    </div>
  );
  async function redirectToFuncionario(id: number) {
    navigate(`/funcionarios/${id}`);
  }
}
