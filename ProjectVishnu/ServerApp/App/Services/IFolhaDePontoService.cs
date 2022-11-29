using ProjectVishnu.ServerApp.App.Dtos;

namespace ProjectVishnu.ServerApp.App.Services
{
    public interface IFolhaDePontoService
    {
        FolhaDePontoEmptyOutputModel GenerateWithInfo(string obraID, FolhaDePontoInfoModel info);
        List<FolhaDePontoInfoModel> GetAllFromMercado(string mercado);
        List<FolhaDePontoInfoModel> GetAllFromObra(string obraID);
        FolhaDePontoValuesOutputModel GetFromMercado(string mercado, string ano, string mes);
        FolhaDePontoValuesOutputModel GetFromObra(string obraID, string ano, string mes);
        void setValues(string obraID, string date, FolhaDePontoValuesInputModel values);
    }
}
