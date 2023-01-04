import { useNavigate } from "react-router-dom"
import React, {useEffect, useState} from 'react';
import { FilterBar } from "../components/FilterBar";
import { Layout } from "../components/Layout";
import { CreateFuncionario } from "../APICalls";


export function FuncionarioCreation() {

    const [funcionario, setFuncionario] = useState({
      nome: '',
      dtnascimento: '',
      telemovel: '',
      contactoemergencia: '',
      nacionalidade: '',
      mercado: '',
      tipodocident: '',
      docident: '',
      tituloresidencia: null,
      manifestacaointeresse: null,
      validadedocident: '',
      catprof: '',
      nif: '',
      niss: '',
      morada: '',
      contratoinicio: '',
      contratofim: '',
      vencimentobase: 0,
      tiposalario: '',
      salarioreal: 0,
      calcado: null,
      cartaconducao: '',
      iban: ''
    })
    const navigate = useNavigate()
    
    const inputs = element => {
      if(element.target.value === "") element.target.value = null
      setFuncionario({...funcionario, [element.target.name]: element.target.value})
    }

    async function AddFuncionario(){
      console.log("Inside AddFuncionario")
        funcionario.contratofim = funcionario.contratofim.replace('-','/').replace('-','/')
        funcionario.contratoinicio = funcionario.contratoinicio.replace('-','/').replace('-','/')
        funcionario.dtnascimento = funcionario.dtnascimento.replace('-','/').replace('-','/')
        funcionario.validadedocident = funcionario.validadedocident.replace('-','/').replace('-','/')

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
        <ul class="errorMessages"></ul>
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <b>Criar um Funcionário</b>
        </thead>
        <tbody>
          
            <tr>
              <label>Nome</label>
              <input type={"text"}  name="nome" maxlength={200} onChange={inputs} required/>
            </tr>        
             <tr>
              <label>Data de Nascimento</label>
              <input type={"date"} name="dtnascimento" onChange={inputs} required />
            </tr>
            <tr>
              <label>Telemóvel</label>
              <input type={"text"} name="telemovel" maxlength={15} onChange={inputs} required />
            </tr>
            <tr>
              <label>Contacto de emergência</label>
              <input type={"text"} name="contactoemergencia" maxlength={15} onChange={inputs} required />
            </tr>
            <tr>
              <label>Nacionalidade</label>
              <input type={"text"} name="nacionalidade" maxlength={20} onChange={inputs} required />
            </tr>
            <tr>
              <label>Mercado</label>
              <input type={"text"} name="mercado" onChange={inputs} required />
            </tr>
            <tr>
              <label>Tipo de documento de identificação</label>
              <input type={"text"} name="tipodocident" maxlength={30} onChange={inputs} required />
            </tr>
            <tr>
              <label>Número do documento de identificação</label>
              <input type={"text"} name="docident" maxlength={15} onChange={inputs} required />
            </tr>
            <tr>
              <label>Título de Residência</label>
              <input type={"text"} name="tituloresidencia" maxlength={20} onChange={inputs}/>
            </tr>
            <tr>
              <label>Manifestação de interesse</label>
              <input type={"text"} name="manifestacaointeresse" maxlength={20} onChange={inputs} />
            </tr>
            <tr>
              <label>Validade do documento de identificação</label>
              <input type={"date"} name="validadedocident" onChange={inputs} required />
            </tr>
            <tr>
              <label>Categoria Profissional</label>
              <input type={"text"} name="catprof" maxlength={7} onChange={inputs} required />
            </tr>
            <tr>
              <label>Número de Identificação Fiscal (NIF)</label>
              <input type={"text"} name="nif" maxlength={15} onChange={inputs} required />
            </tr>
            <tr>
              <label>Número de Identificação de Segurança Social (NISS)</label>
              <input type={"text"} name="niss" maxlength={15} onChange={inputs} required />
            </tr>
            <tr>
              <label>Morada</label>
              <input type={"text"} name="morada" maxlength={200} onChange={inputs} required />
            </tr>
            <tr>
              <label>Data de ínicio de contrato</label>
              <input type={"date"} name="contratoinicio" onChange={inputs} required />
            </tr>
            <tr>
              <label>Data de fim de contrato</label>
              <input type={"date"} name="contratofim" onChange={inputs} required />
            </tr>
            <tr>
              <label>Vencimento base</label>
              <input type={"number"} name="vencimentobase" onChange={inputs} required />
            </tr>
            <tr>
              <label>Tipo de salário</label>
              <input type={"radio"} name="tiposalario" value="horario" onChange={inputs}/>
              <label for="horario">Horário</label>
              <input type={"radio"} name="tiposalario" value="fixo" onChange={inputs}/>
              <label for="fixo">Fixo</label>
            </tr>
            <tr>
              <label>Salário Real</label>
              <input type={"number"} name="salarioreal" onChange={inputs} required />
            </tr>
            <tr>
              <label>Calçado</label>
              <input type={"number"} name="calcado" onChange={inputs} />
            </tr>
            <tr>
              <label>Carta de condução</label>
              <input type={"radio"} name="cartaconducao" value="Sim" onChange={inputs}/>
              <label for="Sim">Sim</label>
              <input type={"radio"} name="cartaconducao" value="Nao" onChange={inputs}/>
              <label for="Nao">Não</label>
            </tr>
            <tr>
              <label>IBAN</label>
              <input type={"text"} name="iban" maxlength={30} required onChange={inputs}/>
            </tr> 
          <button type="button" class="btn btn-primary" onClick={() => AddFuncionario()}>Criar</button>
          
        </tbody>
      </table> 
      </form>
      </div>
      </Layout>
    )
}