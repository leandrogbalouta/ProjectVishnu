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
            try
            {
                CategoriasProfissionai catProf = new CategoriasProfissionai{Codigo = Codigo, Nomenclatura = Nomenclatura};
                _unitOfWork.CategoriasProfissionais.Add(catProf);
                return catProf;
            }
            catch(Exception e)
            {
                return null;
            }
        }

        public CategoriasProfissionai Delete(string Codigo)
        {
            try
            {
                CategoriasProfissionai catProf =_unitOfWork.CategoriasProfissionais.GetCatProf(Codigo);
                _unitOfWork.CategoriasProfissionais.Remove(catProf);
                return catProf;
            }
            catch(Exception e)
            {
                return null;
            }
        }

        public CategoriasProfissionai Get(string Codigo)
        {
            try
            {
                return _unitOfWork.CategoriasProfissionais.GetCatProf(Codigo);
            }
            catch(Exception e)
            {
                return null;
            }
        }

        public IEnumerable<CatProfDto> ListAlphabetically()
        {
           try
            {
                return _unitOfWork.CategoriasProfissionais.ListAlphabetically()
                    .Select(catprof => 
                        new CatProfDto
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
