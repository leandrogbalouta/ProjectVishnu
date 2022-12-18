import React, { useEffect, } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Layout } from "../components/Layout";

export function FolhaDePonto(){
    const { codigo, mercado, data } = useParams()
    const {state} = useLocation()

    let contents = state != null ?
        renderTable() :
        null

    useEffect(() => {
        console.log("in fdp")
        console.log(state)
    }, [])

    return(
        <Layout>
            {contents}
        </Layout>
    )

    function renderTable(){
        
        const days = []
        const firstDay = state.limits[0]
        const endOfMonth = state.limits[1]
        const lastDay = state.limits[2]
        let day = firstDay
        
        for(day; day != lastDay; day = (day + 1)%endOfMonth){
            let className = ''
            if(state.saturdays.includes(day)){
                className = 'saturday-cell'
            }else if(state.sundays.includes(day)){
                className = 'sunday-cell'
            }else if(state.holidays.includes(day)){
                className = 'holiday-cell'
            }
            if(day == 0) day = endOfMonth
            days.push(
                <th className={className}>{day}</th>
            )
            
        }
        let className = ''
        if(state.saturdays.includes(day)){
            className = 'saturday-cell'
        }else if(state.sundays.includes(day)){
            className = 'sunday-cell'
        }else if(state.holidays.includes(day)){
            className = 'holiday-cell'
        }
        days.push(<th className={className}>{lastDay}</th>)
        
        const funcRows = []

        state.funcionarios.forEach(func => {
            funcRows.push(
                {func : func.nome, data : []}
            )
        })

        funcRows.forEach(row => {
            days.forEach(day => {
                row.data.push(
                    <td><input key={`${row.func}${day.props.children}`}></input></td>
                )
            })
        })

        console.log(funcRows)
        return(
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                <tr>
                    <th>Funcionario</th>
                    {days}
                    <th>Salário Final</th>
                </tr>
                </thead>
                <tbody>
                    {state.funcionarios.map(func => 
                        <tr key={func.nome}>
                            <td>{func.nome}</td>
                            {days.map(day => 
                                <td>
                                    <input className="tableInput" type="text" key={`${func.nome}${day.props.children}`}></input>
                                </td>
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }
}