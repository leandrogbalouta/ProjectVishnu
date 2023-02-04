using ProjectVishnu.Models;

namespace ProjectVishnu.DataAccess.Repository
{
    public interface IObraRepository : IRepository<Obra>
    {
        IEnumerable<Obra> ListByMarket(string mercado);
        IEnumerable<Obra> ListByMarketAndValue(string mercado, string codigoInterno);
        IEnumerable<Obra> ListAlphabetically();
        IEnumerable<Obra> Search(string procura);
        IEnumerable<Obra> ListByFuncionario(int funcionarioId);
        Obra Get(string codigoInterno);
        Mercado GetMercado(string codigoInterno);

        public void Add(Obra entity);

        public void Update(string codigoInterno, Obra entity);

        public void Delete(string codigo);

        public int SearchByCodeNumber(string code);
    }
}
