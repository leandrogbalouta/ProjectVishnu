using ProjectVishnu.Models;

namespace ProjectVishnu.Services
{
    public interface IFuncionariosService
    {
        IEnumerable<Funcionario> ListByMarket(string mercado);
        IEnumerable<Funcionario> ListAlphabetically();
        Funcionario Get(int id);

        IEnumerable<Funcionario> GetByName(string nome);

        void Delete(int id);

        void Update(Funcionario funcionario);

        void Create(Funcionario funcionario);
    }
}
