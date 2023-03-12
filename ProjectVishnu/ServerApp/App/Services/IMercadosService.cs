using ProjectVishnu.Models;
using ProjectVishnu.ServerApp.App.Dtos;

namespace ProjectVishnu.ServerApp.App.Services
{
    public interface IMercadosService
    {
        Mercado CreateMercado(MercadoDto mercado);
        Mercado GetMercado(string name);
        IEnumerable<String> ListAlphabetically();
    }
}
