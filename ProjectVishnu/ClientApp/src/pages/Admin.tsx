import { Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import { useEffect, useContext } from "react";
import { ContaContext } from "../components/contexts/Conta/ContaContext";
import { useNavigate } from 'react-router-dom';
import Role from '../common/Role';

export function Admin() {
  const role = useContext(ContaContext).conta?.tipoDeUser;
  const navigate = useNavigate();
  useEffect(() => {
    if (role != Role.Admin) navigate("/");
  }, []);
  return (
    <div className="flex gap-3 flex-col sm:flex-row">
      <div className="flex-1">
        <div id="table-container" className="overflow-x-scroll flex-1">
          <Table className="table table-striped" aria-labelledby="tabelLabel">
            <Thead>
              <Tr className="data-table-header">
                <Th>TODO</Th>
                <Th>Criar</Th>
                <Th>Funcionarios.</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr className="[&>*]:!text-center">
                <Td>Shabba</Td>
                <Td>Rankss</Td>
                <Td>sas</Td>
              </Tr>
            </Tbody>
          </Table>
        </div>
      </div>
      <div className="flex-1">
        <div id="table-container" className="overflow-x-scroll flex-1">
          <Table className="table table-striped" aria-labelledby="tabelLabel">
            <Thead>
              <Tr className="data-table-header">
                <Th>TODO</Th>
                <Th>Criar</Th>
                <Th>Funcionarios.</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr className="[&>*]:!text-center">
                <Td>Shabba</Td>
                <Td>Rankss</Td>
                <Td>sas</Td>
              </Tr>
            </Tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
