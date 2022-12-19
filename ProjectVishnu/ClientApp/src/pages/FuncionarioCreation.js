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
      tituloresidencia: '',
      manifestacaointeresse: '',
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
      calcado: 0,
      cartaconducao: '',
      iban: ''
    })
    const navigate = useNavigate()


    useEffect(() => {
      //const inputs = document.querySelectorAll("input")
      
      // const changeHandler = e => {
      //   setAllValues({...allValues, [e.target.name]: e.target.value})
      // }

      // inputs.forEach(element => {
      //   element.addEventListener('change', (event)=>{
      //     setFuncionario({...funcionario, [element.target.name] : element.target.value})
      //   })
      // })
      
    }, [])
    
    const inputs = element => {
      console.log("HERE")
      setFuncionario({...funcionario, [element.target.name]: element.target.value})
    }

    async function AddFuncionario(){
      console.log(funcionario)
      
        const resp = await CreateFuncionario(funcionario)
        if(resp.status === 201){
            navigate(resp.location)
        }
    }
    
    return(
      <Layout>
      <div>
      <form>
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <b>Criar um Funcionário</b>
        </thead>
        <tbody>
          
            <tr>
              <label>Nome</label>
              <input type={"text"} name="nome" onChange={inputs} required/>
            </tr>        
             <tr>
              <label>Data de Nascimento</label>
              <input type={"date"} name="dtnascimento" onChange={inputs} required />
            </tr>
            <tr>
              <label>Telemóvel</label>
              <input type={"text"} name="telemovel" onChange={inputs} required />
            </tr>
            <tr>
              <label>Contacto de emergência</label>
              <input type={"text"} name="contactoemergencia" onChange={inputs} required />
            </tr>
            <tr>
              <label>Nacionalidade</label>
              <input type={"text"} name="nacionalidade" onChange={inputs} required />
            </tr>
            <tr>
              <label>Mercado</label>
              <input type={"text"} name="mercado" onChange={inputs} required />
            </tr>
            <tr>
              <label>Tipo de documento de identificação</label>
              <input type={"text"} name="tipodocident" onChange={inputs} required />
            </tr>
            <tr>
              <label>Número do documento de identificação</label>
              <input type={"text"} name="docident" onChange={inputs} required />
            </tr>
            <tr>
              <label>Título de Residência</label>
              <input type={"text"} name="tituloresidencia" onChange={inputs}/>
            </tr>
            <tr>
              <label>Manifestação de interesse</label>
              <input type={"text"} name="manifestacaointeresse" onChange={inputs} />
            </tr>
            <tr>
              <label>Validade do documento de identificação</label>
              <input type={"date"} name="validadedocident" onChange={inputs} required />
            </tr>
            <tr>
              <label>Categoria Profissional</label>
              <input type={"text"} name="catprof" onChange={inputs} required />
            </tr>
            <tr>
              <label>Número de Identificação Fiscal (NIF)</label>
              <input type={"text"} name="nif" onChange={inputs} required />
            </tr>
            <tr>
              <label>Número de Identificação de Segurança Social (NISS)</label>
              <input type={"text"} name="niss" onChange={inputs} required />
            </tr>
            <tr>
              <label>Morada</label>
              <input type={"text"} name="morada" onChange={inputs} required />
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
              <input type={"number"} name="calcado" onChange={inputs} required />
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
              <input type={"text"} name="iban" required onChange={inputs}/>
            </tr> 
          <button type="button" class="btn btn-primary" onClick={() => AddFuncionario()}>Criar</button>
          
        </tbody>
      </table> 
      </form>
      </div>
      </Layout>
    )
}