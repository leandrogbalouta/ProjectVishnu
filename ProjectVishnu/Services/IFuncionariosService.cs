using ProjectVishnu.Models;

namespace ProjectVishnu.Services
{
    public interface IFuncionariosService
    {
        String ListByMarket(string mercado);
        Funcionario ListAlphabetically();
        string Get(int id);
    }
}
