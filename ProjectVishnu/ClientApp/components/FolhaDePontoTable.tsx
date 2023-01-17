import React, { useEffect, useState, } from "react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td
} from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { fetchFolhaDePontoByMercado, submitFolhaDePontoValues } from "../common/APICalls";
import IFolhaDePontoOutput from "../common/Interfaces/FolhaDePonto/IFolhaDePontoOutput";
import IFuncionarioOutput from "../common/Interfaces/Funcionario/IFuncionarioOutput";

type FolhaDePontoTableProps = {
    folhaDePontoData : IFolhaDePontoOutput,
    submitValues? : () => {}
    //acrescentar as funções necessárias
}

export function FolhaDePontoTable({ folhaDePontoData, submitValues } : FolhaDePontoTableProps){

    
    // async function submitValues() {
    //     // TODO check values type
    //     const values: any[] = []
    //     const firstDay = info.limits[0]
    //     // const firstDay = info.limits[0] what was this doin'???
    //     const endOfMonth = info.limits[1]
    //     const lastDay = info.limits[2]
    //     let day = firstDay

    //     info.funcionarios.forEach(func => {
    //         let funcValues = { func : func, dias : [], valorFinal : null}
    //         for(day; day != lastDay; day = (day + 1)%endOfMonth){
    //             if(day == 0) day = endOfMonth
    //             let hours = document.getElementById(`Func${func.id}Day${day}`).innerHTML
    //             if(hours === '') hours = 0
    //             funcValues.dias.push(
    //                 {
    //                     dia: day,
    //                     horas: hours
    //                 }
    //             )
    //         }
    //         //console.log(document.getElementById(`Val${func.id}`).innerHTML === '')
    //         // VER SE SALARIO FINAL É DIFERENTE DO SALARIO FINAL RECEBIDO E SE FOR, ENVIAR ESSE VALOR
    //         values.push(funcValues)
    //     })
    //     const [ano, mes] = data.split("-")
    //     const res = await submitFolhaDePontoValues(codigo, mes, ano, values)
    //     if(res.status == 200) fetchDataByObra()
    // }

    // async function fetchDataByMercado(){
    //     const [ano, mes] = data.split("-")
    //     const res = await fetchFolhaDePontoByMercado(mercado, ano, mes)
    //     const jsonInfo = await res.json()
    //     setInfo(jsonInfo)
    // }

    // async function fetchDataByObra(){
    //     const [ano, mes] = data.split("-")
    //     const res = await fetchFolhaDePontoByMercado(codigo, ano, mes)
    //     const jsonInfo = await res.json()
    //     setInfo(jsonInfo)
    // }

    return(
        renderTable(folhaDePontoData)
    )

    function renderTable(folhaDePontoData : IFolhaDePontoOutput){
        const days = getHeaderDaysColumns(folhaDePontoData)
        const funcRows = getFuncRows(folhaDePontoData, days)

        return(
            <div>
                <Table size='sm' variant='unstyled' className='border-collapse border-slate-500 border-4' aria-labelledby="tabelLabel">
                    <Thead>
                    <Tr>
                        <Th className="border-collapse border-2 border-slate-300">Funcionario</Th>
                        {days}
                        <Th className="border-collapse border-2 border-slate-300">Salário Final</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {funcRows.map(f => 
                            <Tr key={f.func.id}>
                                <Td className="border-collapse border-2 border-slate-300">{f.func.nome}</Td>
                                {f.data}
                                <Td className="border-collapse border-2 border-slate-300" id={`Val${f.func.id}`} contentEditable={submitValues !== undefined}></Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
                {/* <button type="button" className="btn btn-primary" onClick={() => submitValues()}>Submeter</button> */}
            </div>
        )
    }

    function getFuncRows(data : IFolhaDePontoOutput, days : React.ReactElement[]) : {func : IFuncionarioOutput, data : React.ReactElement[]}[]{
        const funcRows : {func : IFuncionarioOutput, data : React.ReactElement[]}[] = []
    
        console.log(data)
        data.funcionarios.forEach(func => {
            funcRows.push(
                {func : func, data : []}
            )
        })
    
        funcRows.forEach(row => {
            days.forEach(day => {
                row.data.push(
                    <Td contentEditable={submitValues !== undefined} id={`Func${row.func.id}Day${day.props.children}`} className={getClassName(data, day.props.children)}></Td>
                )
            })
        })
    
        return funcRows
    }
}

function getHeaderDaysColumns(data : IFolhaDePontoOutput) : React.ReactElement[]{
    const days = []
    const firstDay = data.limits[0]
    const endOfMonth = data.limits[1]
    const lastDay = data.limits[2]
    let day = firstDay
        
    for(day; day != lastDay; day = (day + 1)%endOfMonth){
        if(day == 0) day = endOfMonth
        days.push(
            <Th className={getClassName(data, day)}>{day}</Th>
        )
    }
    days.push(<Th className={getClassName(data, lastDay)}>{lastDay}</Th>)

    return days
}

function getClassName(data : IFolhaDePontoOutput, day : number){
    let className = 'border-2 border-slate-300'
        if(data.saturdays.includes(day)){
            className = className.concat(' bg-blue-300')
        }else if(data.sundays.includes(day)){
            className = className.concat(' bg-orange-400')
        }else if(data.holidays.includes(day)){
            className = className.concat(' bg-red-900')
        }
    return className
}