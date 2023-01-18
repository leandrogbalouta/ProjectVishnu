import { Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FolhaDePontoTable } from "../../../../components/FolhaDePontoTable";
import { fetchFolhaDePontoByObra, submitFolhaDePontoValues } from "../../../../common/APICalls";
import IFolhaDePontoOutput from "../../../../common/Interfaces/FolhaDePonto/IFolhaDePontoOutput";
import FolhaDePontoValuesInput from "../../../../common/Interfaces/FolhaDePonto/IFolhaDePontoInput";


export default function FolhaDePontoObra(){
    const [info, setInfo] = useState<IFolhaDePontoOutput | undefined>(undefined)
    const router = useRouter();
    const data = router.query.data!.toString();
    const codigo = router.query.codigo!.toString();
    const infoState = JSON.parse(router.query.info) as IFolhaDePontoOutput
    

    // useEffect(() => {
    //     const fetchDataByObra = async () => {
    //         const [ano, mes] = data.split("-")
    //         const res = await fetchFolhaDePontoByObra(codigo, mes, ano)
    //         const jsonInfo = await res.json()
    //         setInfo(jsonInfo)
    //     }
    //     fetchDataByObra()
    // }, [])

    async function submitValues(values : FolhaDePontoValuesInput){
        const [ano, mes] = data.split("-")
        submitFolhaDePontoValues(codigo, mes, ano, values)
    }

    return(
        <div>
            <FolhaDePontoTable folhaDePontoData={infoState} submitValues={submitValues}/>
        </div>
    )
}