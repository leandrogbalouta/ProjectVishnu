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

        string Delete(string codigoInterno);

        string Update(string codigoInterno, ObraInputModel obraInput);
        void AddFuncToObra(string codigoInterno, FuncionarioObraInputModel funcID);
        void RemoveFuncFromObra(string codigoInterno, FuncionarioObraInputModel funcInput);
    }
}
