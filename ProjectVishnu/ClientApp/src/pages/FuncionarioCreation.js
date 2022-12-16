import { useNavigate } from "react-router-dom"
import React, {useEffect, useState} from 'react';
import { FilterBar } from "../components/FilterBar";
import { Layout } from "../components/Layout";


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
      vencimentobase: '',
      tiposalario: '',
      salarioreal: '',
      calcado: '',
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
      console.log(funcionario.nome)
      
        const resp = await AddFuncionario2()
        if(resp.status === 201){
            navigate(resp.location)
        }
    }

    function AddFuncionario2(){
      console.log("DONE")
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
                  <input type={"text"} className="funcionarioInput" id="nome" name="nome" onChange={inputs} required/>
                </tr>        
                {/* <tr>
                  <label>Data de Nascimento</label>
                  <input type={"date"} name="dtnascimento" required />
                </tr>
                <tr>
                  <label>Telemóvel</label>
                  <input type={"text"} name="telemovel"required />
                </tr>
                <tr>
                  <label>Contacto de emergência</label>
                  <input type={"text"} name="contactoemergencia" required />
                </tr>
                <tr>
                  <label>Nacionalidade</label>
                  <input type={"text"} name="nacionalidade" required />
                </tr>
                <tr>
                  <label>Mercado</label>
                  <input type={"text"} name="mercado" required />
                </tr>
                <tr>
                  <label>Tipo de documento de identificação</label>
                  <input type={"text"} name="tipodocident" required />
                </tr>
                <tr>
                  <label>Número do documento de identificação</label>
                  <input type={"text"} name="docident" required />
                </tr>
                <tr>
                  <label>Título de Residência</label>
                  <input type={"text"} name="tituloresidencia" />
                </tr>
                <tr>
                  <label>Manifestação de interesse</label>
                  <input type={"text"} name="manifestacaointeresse" />
                </tr>
                <tr>
                  <label>Validade do documento de identificação</label>
                  <input type={"date"} name="validadedocident" required />
                </tr>
                <tr>
                  <label>Categoria Profissional</label>
                  <input type={"text"} name="catprof" required />
                </tr>
                <tr>
                  <label>Número de Identificação Fiscal (NIF)</label>
                  <input type={"text"} name="nif" required />
                </tr>
                <tr>
                  <label>Número de Identificação de Segurança Social (NISS)</label>
                  <input type={"text"} name="niss" required />
                </tr>
                <tr>
                  <label>Morada</label>
                  <input type={"text"} name="morada" required />
                </tr>
                <tr>
                  <label>Data de ínicio de contrato</label>
                  <input type={"date"} name="contratoinicio" required />
                </tr>
                <tr>
                  <label>Data de fim de contrato</label>
                  <input type={"date"} name="contratofim" required />
                </tr>
                <tr>
                  <label>Vencimento base</label>
                  <input type={"number"} name="vencimentobase" required />
                </tr>
                <tr>
                  <label>Tipo de salário</label>
                  <input type={"radio"} name="tiposalario" value="horario" />
                  <label for="horario">Horário</label>
                  <input type={"radio"} name="tiposalario" value="fixo" />
                  <label for="fixo">Fixo</label>
                </tr>
                <tr>
                  <label>Salário Real</label>
                  <input type={"number"} name="salarioreal" required />
                </tr>
                <tr>
                  <label>Calçado</label>
                  <input type={"number"} name="calcado" required />
                </tr>
                <tr>
                  <label>Carta de condução</label>
                  <input type={"radio"} name="cartaconducao" value="Sim" />
                  <label for="Sim">Sim</label>
                  <input type={"radio"} name="cartaconducao" value="Nao" />
                  <label for="Nao">Não</label>
                </tr>
                <tr>
                  <label>IBAN</label>
                  <input type={"text"} name="iban" required />
                </tr> */}
              <button type="button" class="btn btn-primary" onClick={() => AddFuncionario()}>Criar</button>
              
            </tbody>
          </table> 
          </form>
        </div>
      </Layout>
    )
}