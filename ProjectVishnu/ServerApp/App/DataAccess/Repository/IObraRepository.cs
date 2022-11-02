using ProjectVishnu.Models;

namespace ProjectVishnu.DataAccess.Repository
{
    public interface IObraRepository : IRepository<Obra>
    {
        IEnumerable<Obra> ListByMarket(string mercado);
        IEnumerable<Obra> ListAlphabetically();
        Obra Get(string codigoInterno);
    }
}
