using ProjectVishnu.Models;

namespace ProjectVishnu.DataAccess.Repository
{
    public interface IObraRepository : IRepository<Obra>
    {
        IEnumerable<Obra> ListAlphabetically();
        IEnumerable<Obra> ListByFuncionario(int funcionarioId);
        IEnumerable<Obra> ListByFilters(string? estado, string? mercado, string? valor);
        Obra Get(string codigoInterno);
        Mercado GetMercado(string codigoInterno);

        public void Add(Obra entity);

        public void Update(string codigoInterno, Obra entity);

        public void Delete(string codigo);

        public int SearchByCodeNumber(string code);
    }
}
