import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { fetchObra, createFolhaDePonto } from '../APICalls';
import { varKinds } from "ajv/dist/compile/codegen";

export function Obra() {
    const [obra, setObra] = useState(null)
    const codigo = useParams()
    const navigate = useNavigate()

    const date = new Date()
    
    const [data, setData] = useState(`${date.getFullYear()}-${date.getMonth()+1}`)
    

    const handleChange = (event) => {
        setData(event.target.value)
    } 

    let contents = obra === null ?
        <p>Loading...</p> :
        renderObra(obra)

        

    async function submitFolhaDePonto(){
        const monthInput = document.getElementById('date')
        const date = monthInput.value
        const [ano, mes] = date.split("-")

        const resp = await createFolhaDePonto(mes, ano, codigo.codigo)
        const data = await resp.json()
        const location = resp.headers.get("location")
        const array = location.split("api")
        const result = array.pop();
        console.log(result)
        navigate(result, {state : data})
    }

    useEffect(() => {
        const populateObraData = async ()=> {
            const response = await fetchObra(codigo.codigo);
            const data = await response.json();
            setObra(data)
        }
        populateObraData()
    }, [])

    return (
        <Layout>
            <div>
                {contents}
            </div>
        </Layout>
    )

    function renderObra(obra){
        return (
            <div>
                <label for="start">Start date:</label>
                    <input type="month" id="date" value={data} min="2018-01" max="2050-12" onChange={handleChange}></input>
                <button type="button" className="btn btn-primary" onClick={() => submitFolhaDePonto()}>Criar Folha de Ponto</button>
            </div>
        )
    }
}