import React, { useEffect, } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Layout } from "../components/Layout";

export function FolhaDePonto(){
    const { obraID, } = useParams()
    const {state} = useLocation()

    useEffect(() => {
        console.log("in fdp")
        console.log(state)
    }, [])

    return(
        <Layout>
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                <tr>
                    <th>Funcionario</th>
                    {}
                    <th>Mercado</th>
                </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </Layout>
    )
}