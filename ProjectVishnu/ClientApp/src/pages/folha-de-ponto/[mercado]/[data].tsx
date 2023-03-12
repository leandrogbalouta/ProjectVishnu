import { Layout } from "antd";
import React, { useEffect, useState, } from "react";
import { useLocation, useParams } from "react-router-dom";
import { submitFolhaDePontoValues, fetchFolhaDePontoByMercado } from "../../../common/APICalls";

export function FolhaDePonto() {
  return <></>;
    const [info, setInfo] = useState()
    const { codigo, mercado, data } = useParams()
  const { state } = useLocation();

//     let contents = info != null ?
//         renderTable() :
//         null

//     useEffect(() => {
//         if(state != undefined){
//             setInfo(state)
//             return
//         }
//         if(codigo != null) {
//             fetchDataByMercado()
//             return
//         }
//         fetchDataByObra()
//     }, [])

//     async function submitValues(){
//         const values: any = []
//         const firstDay:any = info.limits[0]
//         const endOfMonth = info!.limits[1]
//         const lastDay = info.limits[2]
//         let day = firstDay

//         info.funcionarios.forEach(func => {
//             let funcValues = { func : func, dias : [], valorFinal : null}
//             for(day; day != lastDay; day = (day + 1)%endOfMonth){
//                 if(day == 0) day = endOfMonth
//                 let hours = document.getElementById(`Func${func.id}Day${day}`).innerHTML
//                 if(hours === '') hours = 0
//                 funcValues.dias.push(
//                     {
//                         dia: day,
//                         horas: hours
//                     }
//                 )
//             }
//             //console.log(document.getElementById(`Val${func.id}`).innerHTML === '')
//             // VER SE SALARIO FINAL É DIFERENTE DO SALARIO FINAL RECEBIDO E SE FOR, ENVIAR ESSE VALOR
//             values.push(funcValues)
//         })
//         const [ano, mes] = data.split("-")
//         const res = await submitFolhaDePontoValues(codigo, mes, ano, values)
//         if(res.status == 200) fetchDataByObra()
//     }

//     async function fetchDataByMercado(){
//         const [ano, mes] = data.split("-")
//         const res = await fetchFolhaDePontoByMercado(mercado, ano, mes)
//         const jsonInfo = await res.json()
//         setInfo(jsonInfo)
//     }

//     async function fetchDataByObra(){
//         const [ano, mes] = data.split("-")
//         const res = await fetchFolhaDePontoByMercado(codigo, ano, mes)
//         const jsonInfo = await res.json()
//         setInfo(jsonInfo)
//     }

//     return {contents}



//     function renderTable(){
//         const days = getHeaderDaysColumns(info)
//         const funcRows = getFuncRows(info, days)

//         return(
//             <div>
//                 <table className='table table-bordered table-sm' aria-labelledby="tabelLabel">
//                     <thead>
//                     <tr>
//                         <th>Funcionario</th>
//                         {days}
//                         <th>Salário Final</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                         {funcRows.map(f => 
//                             <tr key={f.func.id}>
//                                 <td>{f.func.nome}</td>
//                                 {f.data}
//                                 <td id={`Val${f.func.id}`} contentEditable="true"></td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//                 <button type="button" className="btn btn-primary" onClick={() => submitValues()}>Submeter</button>
//             </div>
//         )
//     }
// }

// function getFuncRows(info, days){
//     const funcRows = []

//     info.funcionarios.forEach(func => {
//         funcRows.push(
//             {func : func, data : []}
//         )
//     })

//     funcRows.forEach(row => {
//         days.forEach(day => {
//             row.data.push(
//                 <td contentEditable="true" id={`Func${row.func.id}Day${day.props.children}`} className={getClassName(info, day.props.children)}></td>
//             )
//         })
//     })

//     return funcRows
// }

// function getHeaderDaysColumns(info){
//     const days = []
//     const firstDay = info.limits[0]
//     const endOfMonth = info.limits[1]
//     const lastDay = info.limits[2]
//     let day = firstDay
        
//     for(day; day != lastDay; day = (day + 1)%endOfMonth){
//         if(day == 0) day = endOfMonth
//         days.push(
//             <th className={getClassName(info, day)}>{day}</th>
//         )
//     }
//     days.push(<th className={getClassName(info, lastDay)}>{lastDay}</th>)

//     return days
// }

// function getClassName(info, day){
//     let className = ''
//         if(info.saturdays.includes(day)){
//             className = 'saturday-cell'
//         }else if(info.sundays.includes(day)){
//             className = 'sunday-cell'
//         }else if(info.holidays.includes(day)){
//             className = 'holiday-cell'
//         }
//     return className
}