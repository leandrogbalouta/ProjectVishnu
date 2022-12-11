import { useNavigate } from "react-router-dom"

export function FuncionarioCreation() {

    const navigate = useNavigate()

    async function AddFuncionario(){
        const resp = await AddFuncionario()
        if(resp.status == 201){
            navigate(resp.location)
        }
    }

    return(
      <div>
        
        <button type="button" class="btn btn-primary" onClick={() => AddFuncionario()}>Criar</button>
      </div>  
    )
}