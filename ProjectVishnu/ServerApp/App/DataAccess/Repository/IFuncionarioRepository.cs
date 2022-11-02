using ProjectVishnu.Models;

namespace ProjectVishnu.DataAccess.Repository
{
    public interface IFuncionarioRepository : IRepository<Funcionario>
    {
        IEnumerable<Funcionario> ListByMarket(string mercado);
        IEnumerable<Funcionario> ListAlphabetically();

        IEnumerable<Funcionario> GetByName(string nome);

        void Delete(int id);

        void Update(Funcionario id);
        Funcionario Get(int id);
    }
}
