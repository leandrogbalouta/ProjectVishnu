import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../components/Layout";
import { fetchObra } from '../APICalls';

export function Obra() {
    const [obra, setObra] = useState(null)
    const codigo = useParams()

    let contents = obra === null ?
        <p>Loading...</p> :
        renderObra(obra)

    useEffect(() => {
        const populateObraData = async ()=> {
            const response = await fetchObra(codigo.codigo);
            const data = await response.json();
            setObra(data)
        }
        populateObraData()
    }, [])

    return (
        <Layout>
            <div>
                {contents}
            </div>
        </Layout>
    )

    function renderObra(obra){
        return (
            <div>

            </div>
        )
    }
}