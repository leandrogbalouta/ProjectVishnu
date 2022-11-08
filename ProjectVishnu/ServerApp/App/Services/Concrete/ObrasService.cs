using ProjectVishnu.DataAccess;
using ProjectVishnu.Models;
using ProjectVishnu.ServerApp.App.Dtos;

namespace ProjectVishnu.Services.Concrete
{
    public class ObrasService : IObrasService
    {
        private readonly IUnitOfWork _unitOfWork;
        public ObrasService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public void Create(ObraInputModel obraInput)
        {
            obraInput.generateInternalCode( 
                _unitOfWork.Obras.SearchByCodeNumber(obraInput.generateInternalCodeFirstPart())+1);
            _unitOfWork.Obras.Add(obraInput.ToObra());
            _unitOfWork.Complete();
        }

        public void Delete(string codigoInterno)
        {
            _unitOfWork.Obras.Delete(codigoInterno);
            _unitOfWork.Complete();
        }

        public Obra Get(string codigoInterno)
        {
            return _unitOfWork.Obras.Get(codigoInterno);
        }

        public IEnumerable<Obra> ListAlphabetically()
        {
            return _unitOfWork.Obras.ListAlphabetically();
        }

        public IEnumerable<Obra> ListByMarket(string mercado)
        {
            return _unitOfWork.Obras.ListByMarket(mercado);
        }

        public void Update(string codigoInterno, ObraInputModel obraInput)
        {
            _unitOfWork.Obras.Update(codigoInterno,obraInput.ToObra());
            _unitOfWork.Complete();
        }
    }
}
