using ProjectVishnu.Models;
using ProjectVishnu.ServerApp.App.Dtos;

namespace ProjectVishnu.Services
{
    public interface IObrasService
    {
        IEnumerable<Obra> ListByMarket(string mercado);
        IEnumerable<Obra> ListAlphabetically();
        Obra Get(string codigoInterno);

        void Create(ObraInputModel obra);

        void Delete(string codigoInterno);

        void Update(string codigoInterno, ObraInputModel obraInput);
    }
}
