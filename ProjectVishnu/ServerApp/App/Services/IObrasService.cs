using ProjectVishnu.Models;

namespace ProjectVishnu.Services
{
    public interface IObrasService
    {
        IEnumerable<Obra> ListByMarket(string mercado);
        IEnumerable<Obra> ListAlphabetically();
        Obra Get(string codigoInterno);

        void Create(Obra obra);
    }
}
