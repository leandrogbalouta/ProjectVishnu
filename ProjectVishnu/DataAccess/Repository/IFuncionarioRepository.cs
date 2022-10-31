using ProjectVishnu.Models;

namespace ProjectVishnu.DataAccess.Repository
{
    public interface IFuncionarioRepository : IRepository<Funcionario>
    {
        IEnumerable<Funcionario> ListByMarket(string mercado);
        IEnumerable<Funcionario> ListAlphabetically();

        IEnumerable<Funcionario> GetByName(string nome);
        Funcionario Get(int id);
    }
}
