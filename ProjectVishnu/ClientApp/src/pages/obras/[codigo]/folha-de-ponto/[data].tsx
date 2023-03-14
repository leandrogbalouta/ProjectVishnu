import { Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FolhaDePontoTable } from "../../../../components/FolhaDePontoTable";
import { fetchFolhaDePontoByMercado, fetchFolhaDePontoByObra, submitFolhaDePontoValues } from "../../../../common/APICalls";
import IFolhaDePontoOutput from "../../../../common/Interfaces/FolhaDePonto/IFolhaDePontoOutput";
import FolhaDePontoValuesInput from "../../../../common/Interfaces/FolhaDePonto/IFolhaDePontoInput";
import { useNavigate, useParams, useLocation } from 'react-router-dom';


export default function FolhaDePonto(){
    const [info, setInfo] = useState<IFolhaDePontoOutput | undefined>(undefined)
    const navigate = useNavigate();
    const { codigo, mercado, data } = useParams()
    const { state } = useLocation();
    const infoState = state !== undefined ? state as IFolhaDePontoOutput : undefined
    
    useEffect(() => {
        if(infoState !== null){
            setInfo(infoState)
            return
        }
        if(codigo != null) {
            fetchDataByObra()
            return
        }
        fetchDataByMercado()
    }, [])



    async function submitValues(values : FolhaDePontoValuesInput){
        const [ano, mes] = data!.split("-")
        const res = await submitFolhaDePontoValues(codigo!, mes, ano, values)
        const jsonInfo = await res.json()
        setInfo(jsonInfo)
    }

    async function fetchDataByObra(){
        console.log("fetch")
        const [ano, mes] = data!.split("-")
        const res = await fetchFolhaDePontoByObra(codigo!, mes, ano)
        const jsonInfo = await res.json()
        setInfo(jsonInfo)
    }

    async function fetchDataByMercado(){
        const [ano, mes] = data!.split("-")
        const res = await fetchFolhaDePontoByMercado(mercado!, mes, ano)
        const jsonInfo = await res.json()
        setInfo(jsonInfo)
    }

    return(
        <div>
            {info && codigo && <FolhaDePontoTable folhaDePontoData={info} submitValues={submitValues}/>}
            {info && mercado && <FolhaDePontoTable folhaDePontoData={info}/>}
        </div>
    )
}