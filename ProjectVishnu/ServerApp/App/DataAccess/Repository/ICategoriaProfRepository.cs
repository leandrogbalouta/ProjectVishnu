using ProjectVishnu.DataAccess.Repository;
using ProjectVishnu.Models;

namespace ProjectVishnu.ServerApp.App.DataAccess.Repository
{
    public interface ICategoriaProfRepository : IRepository<CategoriasProfissionai>
    {
        public CategoriasProfissionai GetCatProf(string codigo);
        public IEnumerable<CategoriasProfissionai> ListAlphabetically();
    }
}
