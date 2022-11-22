using ProjectVishnu.DataAccess.Repository;
using ProjectVishnu.Models;

namespace ProjectVishnu.ServerApp.App.DataAccess.Repository
{
    public interface IFolhaDePontoRepository : IRepository<FolhaDePonto>
    {
        List<FolhaDePonto> GetAllFromMercado(string mercado);
        List<FolhaDePonto> GetAllFromObra(string obraID);
    }
}
