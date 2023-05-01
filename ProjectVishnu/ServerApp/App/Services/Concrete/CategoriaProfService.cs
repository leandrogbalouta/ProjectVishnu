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

        public CategoriasProfissionai Create(string Codigo, string Nomenclatura)
        {
               
            CategoriasProfissionai catProf = new CategoriasProfissionai{Codigo = Codigo, Nomenclatura = Nomenclatura};
  
            _unitOfWork.CategoriasProfissionais.Add(catProf);
            _unitOfWork.Complete();
            return catProf;

        }

        public CategoriasProfissionai Delete(string Codigo)
        {
            CategoriasProfissionai catProf =_unitOfWork.CategoriasProfissionais.GetCatProf(Codigo);
            _unitOfWork.CategoriasProfissionais.Remove(catProf);
            return catProf;
        }

        public CategoriasProfissionai Get(string Codigo)
        {
            return _unitOfWork.CategoriasProfissionais.GetCatProf(Codigo);    
        }

        public IEnumerable<CatProfDto> ListAlphabetically()
        {
            return _unitOfWork.CategoriasProfissionais.ListAlphabetically()
                .Select(catprof => 
                    new CatProfDto
                    {
                        Codigo = catprof.Codigo,
                        Nomenclatura = catprof.Nomenclatura
                    });
        }
    }
}
