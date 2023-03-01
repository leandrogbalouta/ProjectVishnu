using ProjectVishnu.Models;
using ProjectVishnu.ServerApp.App.Dtos;

namespace ProjectVishnu.Services
{
    public interface IFuncionariosService
    {
        IEnumerable<Funcionario> ListAlphabetically();
        IEnumerable<Funcionario> ListWithFilters(string? mercado, string? nome);
        Funcionario Get(int id);

        int Create(FuncionarioInputModel funcionarioDto);

        string Delete(int id);

        string Update(FuncionarioInputModel funcionarioDto);

        int AddFuncToObra(int id, string codigoObra, string date);
        
        int RemoveFuncFromObra(int id, string date);

        int GetValidityWarningCount();

        IEnumerable<Funcionario> GetValidityWarningList();
        ObraFuncionarioOutputModel GetCurrentObra(int id);
        IEnumerable<ObraFuncionarioOutputModel> GetPastObras(int id);
    }
}
