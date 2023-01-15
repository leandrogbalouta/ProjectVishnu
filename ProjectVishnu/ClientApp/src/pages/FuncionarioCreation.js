import { useNavigate } from "react-router-dom"
import React, {useEffect, useState} from 'react';
import { FilterBar } from "../components/FilterBar";
import { Layout } from "../components/Layout";
import { CreateFuncionario } from "../APICalls";


export function FuncionarioCreation() {

    const navigate = useNavigate()

    async function AddFuncionario(){
      console.log("Inside AddFuncionario")
        
      let inputs = document.querySelectorAll('#nome, #dtnascimento, #telemovel,'
        + ' #contactoemergencia, #nacionalidade, #mercado, #tipodocident,' 
        + ' #docident, #tituloresidencia, #manifestacaointeresse, #validadedocident,'
        + ' #catprof, #nif, #niss, #morada, #contratoinicio, #contratofim, #vencimentobase,'
        + ' #tiposalario, #salarioreal, #calcado, #cartaconducao, #iban')

      let funcionario = {}

      for(let i = 0; i<inputs.length; i++){
        if(inputs[i].innerHTML === "") funcionario[inputs[i].id] = null
        else funcionario[inputs[i].id] = inputs[i].innerHTML
      }
      
      console.log(funcionario)

      const resp = await CreateFuncionario(funcionario)
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
      <table className='table table-bordered table-sm' aria-labelledby="tabelLabel">
        <thead>
          <b>Criar um Funcionário</b>
        </thead>
        <tbody>
            <tr>
              <td class="font-bold p-2.5">Nome</td> 
              <td contentEditable="true" id="nome"></td>
              <td class="font-bold p-2.5">Data de Nascimento</td> 
              <td class="" contentEditable="true" id="dtnascimento"></td>
            </tr>
            <tr>
              <td class="font-bold p-2.5">Telemóvel</td>
              <td contentEditable="true" id="telemovel"></td>
              <td class="font-bold p-2.5">Contacto de emergência</td>
              <td contentEditable="true" id="contactoemergencia"></td>
            </tr>
            <tr>
              <td class="font-bold p-2.5">Nacionalidade</td>
              <td contentEditable="true" id="nacionalidade"></td>
              <td class="font-bold p-2.5">Mercado</td>
              <td contentEditable="true" id="mercado"></td>
            </tr>
            <tr>
              <td class="font-bold p-2.5">Tipo de documento de identificação</td>
              <td contentEditable="true" id="tipodocident"></td>
              <td class="font-bold p-2.5">Número do documento de identificação</td>
              <td contentEditable="true" id="docident"></td>
            </tr> 
            <tr>
              <td class="font-bold p-2.5">Título de Residência</td>
              <td contentEditable="true" id="tituloresidenica"></td>
              <td class="font-bold p-2.5">Manifestação de interesse</td>
              <td contentEditable="true" id="manifestacaointeresse"></td>
            </tr>
            <tr>
              <td class="font-bold p-2.5">Validade do documento de identificação</td> 
              <td contentEditable="true" id="validadedocident"></td>
              <td class="font-bold p-2.5">Categoria Profissional</td> 
              <td contentEditable="true" id="catprof"></td>
            </tr>
            <tr>
              <td class="font-bold p-2.5">Número de Identificação Fiscal (NIF)</td> 
              <td contentEditable="true" id="nif"></td>
              <td class="font-bold p-2.5">Número de Identificação de Segurança Social (NISS)</td> 
              <td contentEditable="true" id="niss"></td>
            </tr>
            <tr>
              <td class="font-bold p-2.5">Morada</td> 
              <td contentEditable="true" id="morada"></td>
              <td class="font-bold p-2.5">Data de ínicio de contrato</td> 
              <td contentEditable="true" id="contratoinicio"></td>
            </tr>
            <tr>
              <td class="font-bold p-2.5">Data de fim de contrato</td> 
              <td contentEditable="true" id="contratofim"></td>
              <td class="font-bold p-2.5">Vencimento base</td> 
              <td contentEditable="true" id="vencimentobase"></td>
            </tr>
            <tr>
              <td class="font-bold p-2.5">Tipo de salário</td> 
              <td contentEditable="true" id="tiposalario"></td>
              <td class="font-bold p-2.5">Salário Real</td> 
              <td contentEditable="true" id="salarioreal"></td>
            </tr>
            <tr>
              <td class="font-bold p-2.5">Calçado</td> 
              <td contentEditable="true" id="calcado"></td>
              <td class="font-bold p-2.5">Carta de condução</td> 
              <td contentEditable="true" id="cartaconducao"></td>
            </tr>
            <tr>
              <td class="font-bold p-2.5">IBAN</td> 
              <td contentEditable="true" id="iban"></td>
            </tr>
          <button type="button" class="btn btn-primary" onClick={() => AddFuncionario()}>Criar</button>
          
        </tbody>
      </table> 
      </form>
      </div>
      </Layout>
    )
}