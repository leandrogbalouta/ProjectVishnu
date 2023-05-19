using ProjectVishnu.DataAccess;
using ProjectVishnu.Models;
using ProjectVishnu.ServerApp.App.Dtos;

namespace ProjectVishnu.ServerApp.App.Services.Concrete
{
    public class MercadosService : IMercadosService
    {

        private readonly IUnitOfWork _unitOfWork;
        public MercadosService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public Mercado CreateMercado(MercadoDto mercado)
        {
            try{

                Mercado m = mercado.ToMercado();
                
                _unitOfWork.Mercados.Add(m);
                _unitOfWork.Complete();
                return m;

            }catch(Exception e){

                _unitOfWork.UntrackChanges();
                throw e;
            } 
            
        }

        public Mercado GetMercado(string name)
        {
            return _unitOfWork.Mercados.GetMercado(name);
        }

        public IEnumerable<string> ListAlphabetically()
        {
            return _unitOfWork.Mercados.ListAlphabetically().Select(mercado => mercado.Mercadoname);
        }
    }
}
