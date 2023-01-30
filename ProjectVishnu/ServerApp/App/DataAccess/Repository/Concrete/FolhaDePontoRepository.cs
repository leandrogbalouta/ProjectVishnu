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

        public List<FolhaDePonto> GetFromMercado(string mercado, string ano, string mes)
        {
            return VishnuContext.FolhaDePontos.
                Where(folhaDePonto => folhaDePonto.Ano == ano && folhaDePonto.Mercado == mercado && folhaDePonto.Mes == mes).ToList();
        }

        public FolhaDePonto GetFromObra(string obraID, string ano, string mes)
        {
            return VishnuContext.FolhaDePontos.
                Where(folhaDePonto => folhaDePonto.Ano == ano && folhaDePonto.Obra == obraID && folhaDePonto.Mes == mes).ToList().First();
        }


        public vishnuContext VishnuContext
        {
            get { return Context as vishnuContext; }
        }
    }

}
