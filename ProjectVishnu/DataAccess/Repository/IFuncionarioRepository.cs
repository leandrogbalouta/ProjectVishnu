using ProjectVishnu.Models;

namespace ProjectVishnu.DataAccess.Repository
{
    public interface IFuncionarioRepository
    {
        string ListByMarket(string mercado);
        Funcionario ListAlphabetically();
        string Get(int id);
    }
}
