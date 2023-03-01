using ProjectVishnu.Models;
using ProjectVishnu.ServerApp.App.Dtos;
using static ProjectVishnu.ServerApp.App.Dtos.ObraInputModel;

namespace ProjectVishnu.Services
{
    public interface IObrasService
    {
        IEnumerable<Obra> ListAlphabetically();
        IEnumerable<Obra> ListWithFilters(string? estado = null, string? mercado = null, string? valor = null);
        Obra Get(string codigoInterno);
        IEnumerable<Obra>? ListByFuncionario(int funcionarioId);
         string Create(ObraInputModel obra);
        string Delete(string codigoInterno);

        string Update(string codigoInterno, ObraInputModel obraInput);
        void AddFuncToObra(string codigoInterno, FuncionarioObraInputModel funcID);
        void RemoveFuncFromObra(string codigoInterno, FuncionarioObraInputModel funcInput);
        IEnumerable<FuncionarioObraOutputModel> GetCurrentFuncs(string codigoInterno);
        IEnumerable<FuncionarioObraOutputModel> GetPastFuncs(string codigoInterno);
    }
}
