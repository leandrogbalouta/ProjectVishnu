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

        void Delete(int id);

        void Update(FuncionarioInputModel funcionarioDto);

        void Create(FuncionarioInputModel funcionarioDto);
    }
}
