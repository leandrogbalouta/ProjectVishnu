import React, { useState, useEffect } from 'react';
import { fetchObras } from '../APICalls';
import { FilterBar } from '../components/FilterBar';
import { Layout } from '../components/Layout';
import { useNavigate } from 'react-router-dom';

export function Obras() {

    const [obras, setObras] = useState(null)
    const [mercado, setMercado] = useState(null)
    const [searchString, setSearchString] = useState(null)
    const navigate = useNavigate();

    async function redirectToObra(codigo){
        navigate(`/obras/${codigo}`)
    }

    let contents = obras === null
            ? <p><em>Loading...</em></p>
            : renderObrasTable(obras);

    useEffect(() => {
        const filters = Object.assign({},
            mercado === null ? null : {mercado : mercado},
            searchString === null ? null : {nome : searchString})

        const populateObrasData = async ()=> {

            const response = await fetchObras(filters);
            const data = await response.json();
            setObras(data);
        }
        populateObrasData()
        
    }, [mercado, searchString])

    return (
        <Layout>
            <div>
                <h1 id="tabelLabel" >Obras</h1>
                {contents}
            </div>
        </Layout>
    )

    function renderObrasTable(Obras) {
        return (
            <div>
                <FilterBar setMercado={setMercado} setSearchString={setSearchString} />
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Código interno</th>
                            <th>Designação</th>
                            <th>Cliente</th>
                            <th>Mercado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Obras.map(obra =>
                            <tr class="hoverable-tr" onClick={() => redirectToObra(obra.codigoInterno)} key={obra.codigoInterno}>
                                <td>{obra.codigoInterno}</td>
                                <td>{obra.designacao}</td>
                                <td>{obra.cliente}</td>
                                <td>{obra.mercado}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}
