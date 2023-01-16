using ProjectVishnu.Models;
using ProjectVishnu.ServerApp.App.Dtos;

namespace ProjectVishnu.Services
{
    public interface IFuncionariosService
    {
        IEnumerable<Funcionario> ListByMarket(string mercado);
        IEnumerable<Funcionario> ListAlphabetically();
        Funcionario Get(int id);

        IEnumerable<Funcionario> GetByName(string nome);

        string Delete(int id);

        string Update(FuncionarioInputModel funcionarioDto);

        int Create(FuncionarioInputModel funcionarioDto);
    }
}
