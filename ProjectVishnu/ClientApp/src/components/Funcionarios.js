import React, { Component } from 'react';

export class Funcionarios extends Component {
    static displayName = Funcionarios.name;

  constructor(props) {
    super(props);
    this.state = { funcionarios: [], loading: true };
  }

  componentDidMount() {
    this.populateWeatherData();
  }

  static renderFuncionariosTable(funcionarios) {
    return (
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
            <tr key={funcionario.nome}>
              <td>{funcionario.nome}</td>
              <td>{funcionario.nif}</td>
              <td>{funcionario.niss}</td>
              <td>{funcionario.mercado}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
        ? <p><em>Loading...</em></p>
        : Funcionarios.renderFuncionariosTable(this.state.funcionarios);

    return (
      <div>
        <h1 id="tabelLabel" >Funcionarios</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async populateWeatherData() {
    const response = await fetch('api/funcionarios');
    const data = await response.json();
    this.setState({ funcionarios: data, loading: false });
  }
}
