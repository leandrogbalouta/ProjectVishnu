using ProjectVishnu.DataAccess.Repository;
using ProjectVishnu.Models;

namespace ProjectVishnu.ServerApp.App.DataAccess.Repository
{
    public interface IMercadoRepository : IRepository<IntervaloMercado>
    {
        public IntervaloMercado GetIntervaloMercado(string mercado);
    }
}
