import React, { Component } from 'react';
import { Layout } from './Layout';

export class Obras extends Component {
    static displayName = Obras.name;

    constructor(props) {
        super(props);
        this.state = { obras: [], loading: true };
    }

    componentDidMount() {
        this.populateObrasData();
    }

    static renderObrasTable(Obras) {
        return (
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
                        <tr key={obra.codigoInterno}>
                            <td>{obra.codigoInterno}</td>
                            <td>{obra.designacao}</td>
                            <td>{obra.cliente}</td>
                            <td>{obra.mercado}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Obras.renderObrasTable(this.state.obras);

        return (
            <Layout>
                <div>
                    <h1 id="tabelLabel" >Obras</h1>
                    <p>This component demonstrates fetching data from the server.</p>
                    {contents}
                </div>
            </Layout>
        );
    }

    async populateObrasData() {
        const response = await fetch('api/obras');
        const data = await response.json();
        this.setState({ obras: data, loading: false });
    }
}
