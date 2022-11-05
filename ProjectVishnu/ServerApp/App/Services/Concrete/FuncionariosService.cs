using ProjectVishnu.DataAccess;
using ProjectVishnu.DataAccess.Concrete;
using ProjectVishnu.Models;
using ProjectVishnu.ServerApp.App.Dtos;
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

        public IEnumerable<Funcionario> GetByName(string nome)
        {
            return _unitOfWork.Funcionarios.SearchByName(nome);
        }

        public Funcionario Get(int id)
        {
            return _unitOfWork.Funcionarios.Get(id);
        }

        public void Create(FuncionarioInputModel funcionarioDto)
        {
            _unitOfWork.Funcionarios.Add(funcionarioDto.ToFuncionario());
            _unitOfWork.Complete();
        }

        public void Delete(int id)
        {
            Funcionario funcionario = _unitOfWork.Funcionarios.Get(id);
            funcionario.Deleted = DateOnly.Parse(DateTime.Now.ToString("yyyy/MM/dd"));
            //_unitOfWork.Funcionarios.Delete(funcionario);
            _unitOfWork.Complete();
        }

        public void Update(FuncionarioInputModel funcionarioDto)
        {
            _unitOfWork.Funcionarios.Update(funcionarioDto.ToFuncionario());
        }
    }
}
