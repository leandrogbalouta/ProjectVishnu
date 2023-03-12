
using ProjectVishnu.DataAccess.Repository;
using ProjectVishnu.Models;

namespace ProjectVishnu.ServerApp.App.DataAccess.Repository
{
    public interface ITipoDocRepository : IRepository<TipoDoc>
    {
        public TipoDoc GetTipoDocInt(string sigla);
        public IEnumerable<TipoDoc> ListAlphabetically();
    }
}
