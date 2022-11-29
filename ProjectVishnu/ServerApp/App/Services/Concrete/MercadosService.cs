using ProjectVishnu.DataAccess;

namespace ProjectVishnu.ServerApp.App.Services.Concrete
{
    public class MercadosService : IMercadosService
    {

        private readonly IUnitOfWork _unitOfWork;
        public MercadosService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public IEnumerable<string> ListAlphabetically()
        {
            return _unitOfWork.Mercados.ListAlphabetically().Select(mercado => mercado.Mercadoname);
        }
    }
}
