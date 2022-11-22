using ProjectVishnu.DataAccess.Repository.Concrete;
using ProjectVishnu.Models;

namespace ProjectVishnu.ServerApp.App.DataAccess.Repository.Concrete
{
    public class FolhaDePontoRepository : Repository<FolhaDePonto> , IFolhaDePontoRepository
    {
        public FolhaDePontoRepository(vishnuContext context)
            : base(context)
        {
        }

        public List<FolhaDePonto> GetAllFromMercado(string mercado)
        {
            return (List<FolhaDePonto>)VishnuContext.FolhaDePontos.Where(folhaDePonto => folhaDePonto.Mercado == mercado);
        }

        public List<FolhaDePonto> GetAllFromObra(string obraID)
        {
            return (List<FolhaDePonto>)VishnuContext.FolhaDePontos.Where(folhaDePonto => folhaDePonto.Obra == obraID);
        }

        public vishnuContext VishnuContext
        {
            get { return Context as vishnuContext; }
        }
    }

}
