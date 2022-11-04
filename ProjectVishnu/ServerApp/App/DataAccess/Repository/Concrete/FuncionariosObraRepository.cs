using Microsoft.EntityFrameworkCore;
using ProjectVishnu.DataAccess.Repository.Concrete;
using ProjectVishnu.Models;

namespace ProjectVishnu.ServerApp.App.DataAccess.Repository.Concrete
{
    public class FuncionariosObraRepository : Repository<FuncionariosObra>, IFuncionariosObraRepository
    {
        public FuncionariosObraRepository(DbContext context) : base(context)
        {
        }

        public vishnuContext VishnuContext
        {
            get { return Context as vishnuContext; }
        }
    }
}
