using ProjectVishnu.DataAccess.Repository;
using ProjectVishnu.Models;

namespace ProjectVishnu.ServerApp.App.DataAccess.Repository
{
    public interface IFuncionariosObraRepository : IRepository<FuncionariosObra>
    {
        IEnumerable<Funcionario> GetAllFuncsFromObra(string obraID);
        IEnumerable<Funcionario> GetCurrentFuncsFromObra(string obraID);
        IEnumerable<Funcionario> GetFuncsDuringInterval(string obraID, DateOnly start, DateOnly end);
    }
}
