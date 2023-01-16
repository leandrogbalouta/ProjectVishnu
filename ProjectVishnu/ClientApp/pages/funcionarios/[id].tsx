import { Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { fetchFuncionario } from "../../common/APICalls";
import IFuncionarioOutput from "../../common/Interfaces/Funcionario/IFuncionarioOutput";
import { useRouter } from "next/router";

export default function Funcionario() {
  const [funcionario, setFuncionario] = useState(undefined);
  const router = useRouter();
  const id = router.query.id!.toString();

  let contents =
    funcionario === undefined ? <Spinner /> : renderFuncionario(funcionario);

  useEffect(() => {
    const populateFuncionarioData = async () => {
      const response = await fetchFuncionario(id);
      if (response.status == 200) {
        const data = await response.json();
        console.log(data);
        setFuncionario(data);
      } else if (response.status == 204) {
        setFuncionario(undefined);
      } else {
      }
    };
    populateFuncionarioData();
  }, []);

  return <div>{contents}</div>;

  function renderFuncionario(funcionario: IFuncionarioOutput) {
    return (
      <div>
        {!funcionario && <div>Não foi possível encontrar o funcionario</div>}
        {funcionario && (
          <div>
            <div className="funcionario-main-info">Main info</div>
            <table className="table table-striped" aria-labelledby="tabelLabel">
              <tbody>
                <tr>
                  <td className="font-bold p-2.5">Nif</td>
                  <td className="text-right p-2.5">{funcionario.nif}</td>
                  <td className="font-bold p-2.5">Niss</td>
                  <td className="text-right p-2.5">{funcionario.niss}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}
