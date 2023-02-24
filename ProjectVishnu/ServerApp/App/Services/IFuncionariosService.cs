using ProjectVishnu.Models;
using ProjectVishnu.ServerApp.App.Dtos;

namespace ProjectVishnu.Services
{
    public interface IFuncionariosService
    {
        IEnumerable<Funcionario> ListByMarket(string mercado);
        public IEnumerable<Funcionario> ListByMarketAndName(string mercado, string nome);
        IEnumerable<Funcionario> ListAlphabetically();
        Funcionario Get(int id);

        int Create(FuncionarioInputModel funcionarioDto);
        IEnumerable<Funcionario> GetByName(string nome);

        string Delete(int id);

        string Update(FuncionarioInputModel funcionarioDto);

        int AddFuncToObra(int id, string codigoObra, string date);
        
        int RemoveFuncFromObra(int id, string date);

        int GetValidityWarningCount();

        IEnumerable<Funcionario> GetValidityWarningList();
    }
}
