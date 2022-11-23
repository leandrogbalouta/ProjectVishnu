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
            return VishnuContext.FolhaDePontos.Where(folhaDePonto => folhaDePonto.Mercado.Contains(mercado)).ToList();
        }

        public List<FolhaDePonto> GetAllFromObra(string obraID)
        {
            return VishnuContext.FolhaDePontos.Where(folhaDePonto => folhaDePonto.Obra.Contains(obraID)).ToList();
            
        }

        public vishnuContext VishnuContext
        {
            get { return Context as vishnuContext; }
        }
    }

}
