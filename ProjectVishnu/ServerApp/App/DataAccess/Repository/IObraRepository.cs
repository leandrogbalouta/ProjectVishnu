using ProjectVishnu.Models;

namespace ProjectVishnu.DataAccess.Repository
{
    public interface IObraRepository : IRepository<Obra>
    {
        IEnumerable<Obra> ListByMarket(string mercado);
        IEnumerable<Obra> ListAlphabetically();
        Obra Get(string codigoInterno);
        string GetMercado(string codigoInterno);

        public void Add(Obra entity);

        public void Update(string codigoInterno, Obra entity);

        public void Delete(string codigo);

        public int SearchByCodeNumber(string code);
    }
}
