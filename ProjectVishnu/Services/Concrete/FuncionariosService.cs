using ProjectVishnu.DataAccess;
using ProjectVishnu.DataAccess.Concrete;
using ProjectVishnu.Models;
using System.Globalization;

namespace ProjectVishnu.Services
{
    public class FuncionariosService : IFuncionariosService
    {
        private readonly IUnitOfWork _unitOfWork;
        public FuncionariosService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public IEnumerable<Funcionario> ListByMarket(string mercado)
        {
            return _unitOfWork.Funcionarios.ListByMarket(mercado);
        }

        public IEnumerable<Funcionario> ListAlphabetically()
        {
            return _unitOfWork.Funcionarios.ListAlphabetically();
        }

        public string Get(int id)
        {
            return _unitOfWork.Funcionarios.Get(id).Nome;
        }

        public void Create(Funcionario funcionario)
        {
            _unitOfWork.Funcionarios.Add(funcionario);
        }
    }
}
