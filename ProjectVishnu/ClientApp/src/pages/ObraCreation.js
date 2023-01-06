import { useNavigate } from "react-router-dom"
import React, {useEffect, useState} from 'react';
import { FilterBar } from "../components/FilterBar";
import { Layout } from "../components/Layout";
import { CreateObra } from "../APICalls";


export function ObraCreation() {

      const navigate = useNavigate()

      async function AddObra(){
        const inputs =  document.querySelectorAll('#designacao, #cliente, #datainicio, #mercado')

        let obra = {}

        for(let i = 0; i<inputs.length; i++){
          if(inputs[i].innerHTML === "") obra[inputs[i].id] = null
          else obra[inputs[i].id] = inputs[i].innerHTML
        }
                 
        const resp = await CreateObra(obra)
        if(resp.status === 201){
            const splitLocation =  resp.headers.get("location").split('OB')
            const location = splitLocation[0].toLowerCase() + "OB" +splitLocation[1]

            const array = location.split("api")
            const result = array.pop();
              
            navigate(result)
          }
      }

      return(
        <Layout>
            <div>
      <table className='table table-bordered table-sm' aria-labelledby="tabelLabel">
        <thead>
          <b>Criar uma Obra</b>
        </thead>
        <tbody>          
            <tr>
              <td class="font-bold p-2.5">Designação</td> 
              <td contentEditable="true" id="designacao"></td>
              <td class="font-bold p-2.5">Cliente</td> 
              <td contentEditable="true" id="cliente"></td>
              <td class="font-bold p-2.5">Data de Início</td> 
              <td contentEditable="true" id="datainicio"></td>
              <td class="font-bold p-2.5">Mercado</td> 
              <td contentEditable="true" id="mercado"></td>
            </tr>
            <button type="button" class="btn btn-primary" onClick={() => AddObra()}>Criar</button>
        </tbody>
        </table>
        </div>
    </Layout>
      )
}