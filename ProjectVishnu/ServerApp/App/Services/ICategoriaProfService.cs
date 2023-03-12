using ProjectVishnu.Models;
using ProjectVishnu.ServerApp.App.Dtos;

namespace ProjectVishnu.ServerApp.App.Services
{
    public interface ICategoriaProfService
    {
        IEnumerable<CatProfDto> ListAlphabetically();
        CategoriasProfissionai Create(string Codigo, string Nomenclatura);
        CategoriasProfissionai Delete(string Codigo);
        CategoriasProfissionai Get(string Codigo);
    }
}