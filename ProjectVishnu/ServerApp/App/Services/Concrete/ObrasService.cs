using ProjectVishnu.DataAccess;
using ProjectVishnu.Models;

namespace ProjectVishnu.Services.Concrete
{
    public class ObrasService : IObrasService
    {
        private readonly IUnitOfWork _unitOfWork;
        public ObrasService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public void Create(Obra obra)
        {
            throw new NotImplementedException();
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
    }
}
