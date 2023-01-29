using ProjectVishnu.Models;

namespace ProjectVishnu.DataAccess.Repository
{
    public interface IFuncionarioRepository : IRepository<Funcionario>
    {
        IEnumerable<Funcionario> ListByMarket(string mercado);
        IEnumerable<Funcionario> ListAlphabetically();
        public IEnumerable<Funcionario> ListByMarketAndName(string mercado, string nome);

        IEnumerable<Funcionario> SearchByName(string nome);

        void Delete(int id);

        void Update(Funcionario funcionario);

        Funcionario Get(int id);

        int GetFuncId(string nif);
    }
}
