using ProjectVishnu.ServerApp.App.Dtos;

namespace ProjectVishnu.ServerApp.App.Services
{
    public interface ITiposDocService
    {
        IEnumerable<TiposDocInputModel> ListAlphabetically();
    }
}