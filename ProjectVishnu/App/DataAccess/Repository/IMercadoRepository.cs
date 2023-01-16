using ProjectVishnu.DataAccess.Repository;
using ProjectVishnu.Models;

namespace ProjectVishnu.ServerApp.App.DataAccess.Repository
{
    public interface IMercadoRepository : IRepository<Mercado>
    {
        public Mercado GetMercado(string mercado);
        public IEnumerable<Mercado> ListAlphabetically();
    }
}
