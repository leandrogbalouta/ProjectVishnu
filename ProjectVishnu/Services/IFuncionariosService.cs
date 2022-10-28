using ProjectVishnu.Models;

namespace ProjectVishnu.Services
{
    public interface IFuncionariosService
    {
        IEnumerable<Funcionario> ListByMarket(string mercado);
        IEnumerable<Funcionario> ListAlphabetically();
        Funcionario Get(int id);

        void Create(Funcionario funcionario);
    }
}
