import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  fetchFolhaDePontoByMercado,
  submitFolhaDePontoValues,
} from "../../../common/APICalls";
import IFolhaDePontoOutput from "../../../common/Interfaces/FolhaDePonto/IFolhaDePontoOutput";
import { FolhaDePontoTable } from "../../../components/FolhaDePontoTable";

export default function FolhaDePonto() {
  const [info, setInfo] = useState<IFolhaDePontoOutput | undefined>(undefined)
  const router = useRouter();
  const data = router.query.data!.toString();;
  const mercado = router.query.mercado!.toString();;

  useEffect(() => {
    const fetchDataByMercado = async () => {
      const [ano, mes] = data.split("-");
      const res = await fetchFolhaDePontoByMercado(mercado, mes, ano);
      const jsonInfo = await res.json();
      setInfo(jsonInfo);
    }

    fetchDataByMercado();
  }, []);

  return(
    <div>
        {info && <FolhaDePontoTable folhaDePontoData={info}/>}
    </div>
  )
  
}