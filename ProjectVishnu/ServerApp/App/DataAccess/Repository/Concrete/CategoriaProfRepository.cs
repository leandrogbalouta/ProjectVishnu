using ProjectVishnu.DataAccess.Repository.Concrete;
using ProjectVishnu.DataAccess.Repository;
using ProjectVishnu.Models;
using Microsoft.EntityFrameworkCore;

namespace ProjectVishnu.ServerApp.App.DataAccess.Repository.Concrete
{

    public class CategoriaProfRepository : Repository<CategoriasProfissionai>, ICategoriaProfRepository

    {
        public CategoriaProfRepository(DbContext context) : base(context)
        {
        }

        public vishnuContext VishnuContext
        {
            get { return Context as vishnuContext; }
        }

        public CategoriasProfissionai GetCatProf(string codigo)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<CategoriasProfissionai> ListAlphabetically()
        {
            return VishnuContext.CategoriasProfissionais.OrderBy(catprof => catprof.Nomenclatura).ToList();
        }
    }
}
