import { Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";

export function Admin() {
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
