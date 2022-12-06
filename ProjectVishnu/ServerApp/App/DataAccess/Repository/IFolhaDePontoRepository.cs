using ProjectVishnu.DataAccess.Repository;
using ProjectVishnu.Models;

namespace ProjectVishnu.ServerApp.App.DataAccess.Repository
{
    public interface IFolhaDePontoRepository : IRepository<FolhaDePonto>
    {
        List<FolhaDePonto> GetAllFromMercado(string mercado);
        List<FolhaDePonto> GetAllFromObra(string obraID);

        List<FolhaDePonto> GetFromMercado(string mercado, string ano, string mes);

        List<FolhaDePonto> GetFromObra(string obraID, string ano, string mes);

    }
}
