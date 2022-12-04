import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { fetchFuncionario } from '../APICalls';
import { Layout } from '../components/Layout';

export function Funcionario() {
    const [funcionario, setFuncionario] = useState(null)
    const id = useParams()

    let contents = funcionario === null
        ? <p><em>Loading...</em></p>
        : renderFuncionario(funcionario);

    useEffect(() => {
        const populateFuncionarioData = async ()=> {
            const response = await fetchFuncionario(id.id);
            const data = await response.json();
            setFuncionario(data)
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
            </div>
        )
    }
}