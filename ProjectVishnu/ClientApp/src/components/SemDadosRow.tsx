import { Tr } from "@chakra-ui/react";
import React, { Component } from "react";

export default function SemDadosRow() {
  return (
    <Tr>
      <td colSpan={5} className="text-center py-3 text-xl">
        Sem dados.
      </td>
    </Tr>
  );
}
