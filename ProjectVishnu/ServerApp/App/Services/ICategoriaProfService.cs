using ProjectVishnu.ServerApp.App.Dtos;

namespace ProjectVishnu.ServerApp.App.Services
{
    public interface ICategoriaProfService
    {
        IEnumerable<CatProfInputModel> ListAlphabetically();
    }
}