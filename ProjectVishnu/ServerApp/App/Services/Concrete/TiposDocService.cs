using ProjectVishnu.DataAccess;
using ProjectVishnu.Models;
using ProjectVishnu.ServerApp.App.Dtos;

namespace ProjectVishnu.ServerApp.App.Services.Concrete
{
    public class TiposDocService : ITiposDocService
    {

        private readonly IUnitOfWork _unitOfWork;
        public TiposDocService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public IEnumerable<TiposDocInputModel> ListAlphabetically()
        {
            return _unitOfWork.TiposDocInt.ListAlphabetically()
                .Select(tipodocint => 
                    new TiposDocInputModel
                    {
                        Sigla = tipodocint.Sigla,
                        Designacao = tipodocint.Designacao
                    });
        }
    }
}
