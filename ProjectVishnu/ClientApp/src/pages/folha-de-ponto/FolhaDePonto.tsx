import { useEffect, useState } from "react";
import { AddFolhaDePontoTable } from "../../components/tables/AddFolhaDePontoTable";
import { fetchFolhaDePontoByMercado, fetchFolhaDePontoByObra, submitFolhaDePontoValues } from "../../common/API/APICalls";
import IFolhaDePontoOutput from "../../common/Interfaces/FolhaDePonto/IFolhaDePontoOutput";
import FolhaDePontoValuesInput from "../../common/Interfaces/FolhaDePonto/IFolhaDePontoInput";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { resize } from "@motionone/dom";


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
        setInfo(res.data)
    }
    async function fetchDataByObra(){
        const [ano, mes] = data!.split("-")
        const res = await fetchFolhaDePontoByObra(codigo!, mes, ano)
        setInfo(res.data)
    }
    async function fetchDataByMercado(){
        const [ano, mes] = data!.split("-")
        const res = await fetchFolhaDePontoByMercado(mercado!, mes, ano)
        setInfo(res.data)
    }
    return(
        <div>
            {info && codigo && <AddFolhaDePontoTable folhaDePontoData={info} submitValues={submitValues}/>}
            {info && mercado && <AddFolhaDePontoTable folhaDePontoData={info}/>}
        </div>
    )
}