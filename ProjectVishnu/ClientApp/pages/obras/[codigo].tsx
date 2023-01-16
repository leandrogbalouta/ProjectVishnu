import React, { ChangeEvent, useEffect, useState } from "react";
import { fetchObra, createFolhaDePonto } from "../../common/APICalls";
import { Button, Input, Spinner } from "@chakra-ui/react";
import IObraOutput from "../../common/Interfaces/Obra/IObraOutput";
import { useRouter } from 'next/router';

export default function Obra() {
  const router = useRouter();
  const [obra, setObra] = useState(null);
  const codigo = router.query.codigo?.toString();
  const date = new Date();
  const [data, setData] = useState(
    `${date.getFullYear()}-${date.getMonth() + 1}`
  );
  // TODO check this
  const handleChange = (event: any) => {
    setData(event!.target!.value!);
  };

  let contents = obra === null ? <Spinner/> : renderObra(obra);

  // check this
  async function submitFolhaDePonto() {
    const monthInput = document.getElementById("date");
    const date = monthInput!.nodeValue!;
    const [ano, mes] = date.split("-");

    const resp = await createFolhaDePonto(Number(mes), Number(ano), codigo!);
    const data = await resp.json();
    const location = resp.headers.get("location");
    const array = location!.split("api");
    const result = array.pop();
    console.log(result);
    // double check this workin
    router.push(result!, { query: data });
  }

  useEffect(() => {
    const populateObraData = async () => {
      const response = await fetchObra(codigo!);
      const data = await response.json();
      setObra(data);
    };
    populateObraData();
  }, []);

  return <div>{contents}</div>;

  function renderObra(obra: IObraOutput) {
    return (
      <div>
        <label htmlFor="date">Start date:</label>
        <Input
          type="month"
          id="date"
          value={data}
          min="2018-01"
          max="2050-12"
          onChange={handleChange}
        />
        <Button
          type="button"
          className="btn btn-primary"
          onClick={() => submitFolhaDePonto()}
        >
          Criar Folha de Ponto
        </Button>
      </div>
    );
  }
}
