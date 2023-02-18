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
            try {
                Mercado m = mercado.ToMercado();
                _unitOfWork.Mercados.Add(m);
                return m;
            }
            catch(Exception e)
            {
                return null;
            }
        }

        public Mercado GetMercado(string name)
        {
            try
            {
                return _unitOfWork.Mercados.GetMercado(name);
            }
            catch(Exception e)
            {
                return null;
            }
        }

        public IEnumerable<string> ListAlphabetically()
        {
            try
            {
                return _unitOfWork.Mercados.ListAlphabetically().Select(mercado => mercado.Mercadoname);

            }catch(Exception e)
            {
                return null;
            }
        }
    }
}
