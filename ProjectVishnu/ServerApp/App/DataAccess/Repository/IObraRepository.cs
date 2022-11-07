using ProjectVishnu.Models;

namespace ProjectVishnu.DataAccess.Repository
{
    public interface IObraRepository : IRepository<Obra>
    {
        IEnumerable<Obra> ListByMarket(string mercado);
        IEnumerable<Obra> ListAlphabetically();
        Obra Get(string codigoInterno);

        public void Add(Obra entity);

        public int CodeNumber(string code);
    }
}
