using ProjectVishnu.Models;
using ProjectVishnu.ServerApp.App.Dtos;

namespace ProjectVishnu.Services
{
    public interface IObrasService
    {
        IEnumerable<Obra> ListByMarket(string mercado);
        IEnumerable<Obra> ListByMarketAndValue(string mercado, string valor);
        IEnumerable<Obra> ListAlphabetically();
        Obra Get(string codigoInterno);
        IEnumerable<Obra> Search(string procura);
        IEnumerable<Obra>? ListByFuncionario(int funcionarioId);
         string Create(ObraInputModel obra);
        string Delete(string codigoInterno);

        string Update(string codigoInterno, ObraInputModel obraInput);
        void AddFuncToObra(string codigoInterno, FuncionarioObraInputModel funcID);
        void RemoveFuncFromObra(string codigoInterno, FuncionarioObraInputModel funcInput);
    }
}
