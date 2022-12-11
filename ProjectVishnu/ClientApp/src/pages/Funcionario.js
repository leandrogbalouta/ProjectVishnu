import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { fetchFuncionario } from '../APICalls';
import { Layout } from '../components/Layout';

export function Funcionario() {
    const [funcionario, setFuncionario] = useState(undefined)
    const id = useParams()

    let contents = funcionario === undefined
        ? <p><em>Loading...</em></p>
        : renderFuncionario(funcionario);

    useEffect(() => {
        const populateFuncionarioData = async ()=> {
            const response = await fetchFuncionario(id.id);
            if(response.status == 200){
                const data = await response.json();
                console.log(data)
                setFuncionario(data)
            }
            else if(response.status == 204) {
                setFuncionario(null)
            }
            else{

            }        
        }
        populateFuncionarioData()
    }, [])
    
    return (
        <Layout>
            <div>
                {contents}
            </div>
        </Layout>
        
    )

    function renderFuncionario(funcionario){
        return (
            <div>
                {!funcionario && <div>Não foi possível encontrar o funcionario</div> }
                {funcionario && 
                    <div>
                        <div class = "funcionario-main-info">
                            Main info
                        </div>
                        <table className='table table-striped' aria-labelledby="tabelLabel">
                            <tbody>
                                <tr>
                                    <td class="font-bold p-2.5">Nif</td> 
                                    <td class="text-right p-2.5">{funcionario.nif}</td> 
                                    <td class="font-bold p-2.5">Niss</td> 
                                    <td class="text-right p-2.5">{funcionario.niss}</td> 
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>}
            </div>
        )
    }
}