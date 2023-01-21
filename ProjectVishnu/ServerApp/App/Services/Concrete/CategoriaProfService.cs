using ProjectVishnu.DataAccess;
using ProjectVishnu.Models;
using ProjectVishnu.ServerApp.App.Dtos;

namespace ProjectVishnu.ServerApp.App.Services.Concrete
{
    public class CategoriaProfService : ICategoriaProfService
    {

        private readonly IUnitOfWork _unitOfWork;
        public CategoriaProfService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public IEnumerable<CatProfInputModel> ListAlphabetically()
        {
           try
            {
                return _unitOfWork.CategoriasProfissionais.ListAlphabetically()
                    .Select(catprof => 
                        new CatProfInputModel
                        {
                            Codigo = catprof.Codigo,
                            Nomenclatura = catprof.Nomenclatura
                        });

            }catch(Exception e)
            {
                return null;
            }
        }
    }
}
