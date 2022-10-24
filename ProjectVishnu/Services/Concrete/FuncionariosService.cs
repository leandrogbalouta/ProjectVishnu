using ProjectVishnu.DataAccess;
using ProjectVishnu.DataAccess.Concrete;
using ProjectVishnu.Models;

namespace ProjectVishnu.Services
{
    public class FuncionariosService : IFuncionariosService
    {
        private readonly IUnitOfWork _unitOfWork;
        public FuncionariosService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public String ListByMarket(string mercado)
        {
            if (string.Equals(mercado, "franca") || string.Equals(mercado, "espanha") || string.Equals(mercado, "portugal"))
            {
                return _unitOfWork.Funcionarios.ListByMarket(mercado);
            }
            return "Mercado inválido";
        }

        public Funcionario ListAlphabetically() 
        {
            return _unitOfWork.Funcionarios.ListAlphabetically();
        }

        public string Get(int id)
        {   
            return _unitOfWork.Funcionarios.Get(id);
        }

    }
}
