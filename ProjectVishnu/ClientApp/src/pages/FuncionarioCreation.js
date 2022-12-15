import { useNavigate } from "react-router-dom"
import React, {useState} from 'react';


export function FuncionarioCreation() {
  const inputs = document.querySelectorAll("input")
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

    inputs.forEach(element => {
      element.addEventListener('change', (event)=>{
        setFuncionario({ element : event.target.value})
      })
    })


    async function AddFuncionario(){
      console.log(funcionario.nome)
      
        const resp = await AddFuncionario()
        if(resp.status === 201){
            navigate(resp.location)
        }
    }

    

    return(
      <form>
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <b>Criar um Funcionário</b>
        </thead>
        <tbody>
          
            <div>
              <label>Nome</label>
              <input type={"text"} className="funcionarioInput" id="nome" name="nome" value={funcionario.nome} required/>
            </div>        
            <div>
              <label>Data de Nascimento</label>
              <input type={"date"} name="dtnascimento" required />
            </div>
            <div>
              <label>Telemóvel</label>
              <input type={"text"} name="telemovel"required />
            </div>
            <div>
              <label>Contacto de emergência</label>
              <input type={"text"} name="contactoemergencia" required />
            </div>
            <div>
              <label>Nacionalidade</label>
              <input type={"text"} name="nacionalidade" required />
            </div>
            <div>
              <label>Mercado</label>
              <input type={"text"} name="mercado" required />
            </div>
            <div>
              <label>Tipo de documento de identificação</label>
              <input type={"text"} name="tipodocident" required />
            </div>
            <div>
              <label>Número do documento de identificação</label>
              <input type={"text"} name="docident" required />
            </div>
            <div>
              <label>Título de Residência</label>
              <input type={"text"} name="tituloresidencia" />
            </div>
            <div>
              <label>Manifestação de interesse</label>
              <input type={"text"} name="manifestacaointeresse" />
            </div>
            <div>
              <label>Validade do documento de identificação</label>
              <input type={"date"} name="validadedocident" required />
            </div>
            <div>
              <label>Categoria Profissional</label>
              <input type={"text"} name="catprof" required />
            </div>
            <div>
              <label>Número de Identificação Fiscal (NIF)</label>
              <input type={"text"} name="nif" required />
            </div>
            <div>
              <label>Número de Identificação de Segurança Social (NISS)</label>
              <input type={"text"} name="niss" required />
            </div>
            <div>
              <label>Morada</label>
              <input type={"text"} name="morada" required />
            </div>
            <div>
              <label>Data de ínicio de contrato</label>
              <input type={"date"} name="contratoinicio" required />
            </div>
            <div>
              <label>Data de fim de contrato</label>
              <input type={"date"} name="contratofim" required />
            </div>
            <div>
              <label>Vencimento base</label>
              <input type={"number"} name="vencimentobase" required />
            </div>
            <div>
              <label>Tipo de salário</label>
              <input type={"radio"} name="tiposalario" value="horario" />
              <label for="horario">Horário</label>
              <input type={"radio"} name="tiposalario" value="fixo" />
              <label for="fixo">Fixo</label>
            </div>
            <div>
              <label>Salário Real</label>
              <input type={"number"} name="salarioreal" required />
            </div>
            <div>
              <label>Calçado</label>
              <input type={"number"} name="calcado" required />
            </div>
            <div>
              <label>Carta de condução</label>
              <input type={"radio"} name="cartaconducao" value="Sim" />
              <label for="Sim">Sim</label>
              <input type={"radio"} name="cartaconducao" value="Nao" />
              <label for="Nao">Não</label>
            </div>
            <div>
              <label>IBAN</label>
              <input type={"text"} name="iban" required />
            </div>
          <button type="button" class="btn btn-primary" onClick={() => AddFuncionario()}>Criar</button>
          
        </tbody>
      </table> 
      </form>
    )
}