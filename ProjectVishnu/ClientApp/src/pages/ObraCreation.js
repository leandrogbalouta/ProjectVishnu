import { useNavigate } from "react-router-dom"
import React, {useEffect, useState} from 'react';
import { FilterBar } from "../components/FilterBar";
import { Layout } from "../components/Layout";
import { CreateObra } from "../APICalls";


export function ObraCreation() {

    const [obra, setObra] = useState({
        designacao : "",
        cliente : "",
        datainicio : "",
        mercado : ""
      })
      const navigate = useNavigate()
      
      const inputs = element => {
        if(element.target.value === "") element.target.value = null
        setObra({...obra, [element.target.name]: element.target.value})
      }

      async function AddObra(){
        obra.datainicio = obra.datainicio.replace('-','/').replace('-','/')

        const resp = await CreateObra(obra)
        if(resp.status === 201){
            const location = resp.headers.get("location").toLowerCase()
            const array = location.split("api")
            const result = array.pop();
              
            navigate(result)
          }
      }

      return(
        <Layout>
            <div>
      <form>
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <b>Criar uma Obra</b>
        </thead>
        <tbody>          
            <tr>
                <label>Designação</label>
                <input type={"text"} name="designacao" onChange={inputs} required/>
            </tr> 
            <tr>
                <label>Cliente</label>
                <input type={"text"} name="cliente" onChange={inputs} required/>
            </tr>
            <tr>
                <label>Data de Início</label>
                <input type={"date"} name="datainicio" onChange={inputs} required/>
            </tr>
            <tr>
                <label>Mercado</label>
                <input type={"text"} name="mercado" onChange={inputs} required/>
            </tr>
            <button type="button" class="btn btn-primary" onClick={() => AddObra()}>Criar</button>
        </tbody>
        </table>
        </form>
        </div>
    </Layout>
      )
}