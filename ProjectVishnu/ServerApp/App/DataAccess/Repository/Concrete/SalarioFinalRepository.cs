using ProjectVishnu.DataAccess.Repository.Concrete;
using ProjectVishnu.DataAccess.Repository;
using ProjectVishnu.Models;
using Microsoft.EntityFrameworkCore;

namespace ProjectVishnu.ServerApp.App.DataAccess.Repository.Concrete
{
    public class SalarioFinalRepository : Repository<SalarioFinal>, ISalarioFinalRepository
    {
        public SalarioFinalRepository(DbContext context) : base(context)
        {
        }

        public vishnuContext VishnuContext
        {
            get { return Context as vishnuContext; }
        }
    }
}
