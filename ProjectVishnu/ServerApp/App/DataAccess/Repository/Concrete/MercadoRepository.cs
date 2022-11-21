using ProjectVishnu.DataAccess.Repository.Concrete;
using ProjectVishnu.DataAccess.Repository;
using ProjectVishnu.Models;
using Microsoft.EntityFrameworkCore;

namespace ProjectVishnu.ServerApp.App.DataAccess.Repository.Concrete
{
    public class MercadoRepository : Repository<IntervaloMercado>, IMercadoRepository
    {
        public MercadoRepository(DbContext context) : base(context)
        {
        }

        public vishnuContext VishnuContext
        {
            get { return Context as vishnuContext; }
        }

        public IntervaloMercado GetMercado(string mercado)
        {
            throw new NotImplementedException();
        }
    }
}
