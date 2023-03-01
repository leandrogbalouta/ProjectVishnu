using ProjectVishnu.Models;

namespace ProjectVishnu.DataAccess.Repository
{
    public interface IFuncionarioRepository : IRepository<Funcionario>
    {
        IEnumerable<Funcionario> ListAlphabetically();
        IEnumerable<Funcionario> ListWithFilters(string? mercado = null, string? nome = null);
        void Delete(int id);

        void Update(Funcionario funcionario);

        Funcionario Get(int id);

        int GetValidityWarningCount();

        IEnumerable<Funcionario> GetValidityWarningList();

        int GetFuncId(string nif);
        FuncionariosObra GetCurrentObra(int id);

        IEnumerable<FuncionariosObra> GetPastObras(int id);
    }
}
