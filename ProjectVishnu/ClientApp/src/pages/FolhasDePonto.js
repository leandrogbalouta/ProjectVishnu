import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchFolhaDePontoAllByMercado } from "../APICalls";
import { FilterBar } from '../components/FilterBar';
import { Layout } from "../components/Layout";


export function FolhasDePonto(){
    const [folhasDePonto,setFolhasDePonto] = useState(null)
    const [mercado,setMercado] = useState(null)
    const navigate = useNavigate()


    let contents = folhasDePonto === null
        ? <p><em>Loading...</em></p>
        : renderFolhasDePontoTable(folhasDePonto);

    useEffect(() => {
        const populateFolhasDePontoData = async ()=> {

            const response = await fetchFolhaDePontoAllByMercado(mercado)
            const data = await response.json()
            setFolhasDePonto(data)
        }
        populateFolhasDePontoData()

    }, [mercado])

    

    return(
        <Layout>
            <div>
                <h1 id="tabelLabel" >Folhas De Ponto</h1>
                {contents}
            </div>
        </Layout>
    )

    function renderFolhasDePontoTable(folhasDePonto) {
        return (
            <div>
              <FilterBar setMercado={setMercado} />
              <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                  <tr>
                    <th>Mes</th>
                    <th>Ano</th>
                    <th>Mercado</th>
                  </tr>
                </thead>
                <tbody>
                  {folhasDePonto.map( folhaDePonto =>
                     <tr class="hoverable-tr">
                        <td>{folhaDePonto.mes}</td>
                        <td>{folhaDePonto.ano}</td>
                        <td>{mercado}</td>
                     </tr>
                  )}
                </tbody>
              </table>
            </div>
          );
    }
}