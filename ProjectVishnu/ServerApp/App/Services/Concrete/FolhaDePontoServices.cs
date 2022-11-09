using ProjectVishnu.DataAccess;
using ProjectVishnu.ServerApp.App.Dtos;
using ProjectVishnu.ServerApp.App.Utils;
using System;

namespace ProjectVishnu.ServerApp.App.Services.Concrete
{
    public class FolhaDePontoServices : IFolhaDePontoServices
    {

        private readonly IUnitOfWork _unitOfWork;
        public FolhaDePontoServices(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public FolhaDePontoEmptyOutputModel GenerateWithInfo(string obraID, FolhaDePontoInfoModel info)
        {
            throw new NotImplementedException();
        }

        public List<FolhaDePontoInfoModel> GetAllFromMercado(string mercado)
        {
            throw new NotImplementedException();
        }

        public List<FolhaDePontoInfoModel> GetAllFromObra(string obraID)
        {
            throw new NotImplementedException();
        }

        public FolhaDePontoValuesOutputModel GetFromMercado(string mercado, string ano, string mes)
        {
            throw new NotImplementedException();
        }

        public FolhaDePontoValuesOutputModel GetFromObra(string obraID, string ano, string mes)
        {
            throw new NotImplementedException();
        }

        public void setValues(string obraID, string date, FolhaDePontoValuesInputModel values)
        {
            throw new NotImplementedException();
        }
    }
}
