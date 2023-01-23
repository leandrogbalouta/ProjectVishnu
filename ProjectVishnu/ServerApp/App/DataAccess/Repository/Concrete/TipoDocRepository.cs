using ProjectVishnu.DataAccess.Repository.Concrete;
using ProjectVishnu.DataAccess.Repository;
using ProjectVishnu.Models;
using Microsoft.EntityFrameworkCore;

namespace ProjectVishnu.ServerApp.App.DataAccess.Repository.Concrete
{

    public class TipoDocRepository : Repository<TipoDoc>, ITipoDocRepository

    {
        public TipoDocRepository(DbContext context) : base(context)
        {
        }

        public vishnuContext VishnuContext
        {
            get { return Context as vishnuContext; }
        }

        public TipoDoc GetTipoDocInt(string sigla)
        {
            throw new NotImplementedException();
        }

        IEnumerable<TipoDoc> ITipoDocRepository.ListAlphabetically()
        {
            return VishnuContext.TiposDoc.OrderBy(tipodocint => tipodocint.Designacao).ToList();
        }
    }
}
