import React, {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchFuncionarios } from '../APICalls';
import { FilterBar } from '../components/FilterBar';
import { Layout } from '../components/Layout';

export function Funcionarios(){
  const [funcionarios, setFuncionarios] = useState(null)
  const [mercado, setMercado] = useState(null)
  const [searchString, setSearchString] = useState(null)
  const navigate = useNavigate()

    async function redirectToFuncionario(id) {
      navigate(`/funcionarios/${id}`)
    }

    async function redirectToFuncionarioCreation(){
      navigate("funcionarios/create")
    }

    let contents = funcionarios === null
        ? <p><em>Loading...</em></p>
        : renderFuncionariosTable(funcionarios);

    useEffect(() => {

        const filters = Object.assign({},
            mercado === null ? null : {mercado : mercado},
            searchString === null ? null : {nome : searchString})

        const populateFuncionariosData = async ()=> {

            const response = await fetchFuncionarios(filters);
            const data = await response.json();
            setFuncionarios(data)
        }
        populateFuncionariosData()
        
    }, [mercado, searchString])

    return (
      <Layout>
        <div>
          <h1 id="tabelLabel" >Funcionarios</h1>
          {contents}
        </div>
      </Layout>
    );


    function renderFuncionariosTable(funcionarios) {
      return (
        <div>
          <FilterBar setMercado={setMercado} setSearchString={setSearchString}/>
          <button type="button" class="btn btn-primary" onClick={() => redirectToFuncionarioCreation}>Criar</button>
          <table className='table table-striped' aria-labelledby="tabelLabel">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Nif</th>
                <th>Niss</th>
                <th>Mercado</th>
              </tr>
            </thead>
            <tbody>
              {funcionarios.map(funcionario =>
                <tr class="hoverable-tr" onClick={() => redirectToFuncionario(funcionario.id)} key={funcionario.nome}>
                  <td>{funcionario.nome}</td>
                  <td>{funcionario.nif}</td>
                  <td>{funcionario.niss}</td>
                  <td>{funcionario.mercado}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      );
    }
    

}

