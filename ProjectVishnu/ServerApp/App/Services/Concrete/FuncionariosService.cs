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
            try
            {
                return _unitOfWork.Funcionarios.ListByMarket(mercado);
            }catch(Exception e)
            {
                return null;
            }
        }

        public IEnumerable<Funcionario> ListAlphabetically()
        {
            try
            {
                return _unitOfWork.Funcionarios.ListAlphabetically();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public IEnumerable<Funcionario> GetByName(string nome)
        {
            try
            {
                return _unitOfWork.Funcionarios.SearchByName(nome);

            }catch(Exception e)
            {
                return null;
            }
        }

        public Funcionario Get(int id)
        {
            try
            {
                /*Funcionario f = _unitOfWork.Funcionarios.Get(id); Acho que esta a mais //TODO
                Mercado m = f.MercadoNavigation;*/
                return _unitOfWork.Funcionarios.Get(id);
            }catch(Exception e)
            {
                return null;
            }
            
        }

        public int Create(FuncionarioInputModel funcionarioDto)
        {
            try
            {
                int id = _unitOfWork.Funcionarios.Add(funcionarioDto.ToFuncionario());
                _unitOfWork.Complete();
                return id;
            }catch(Exception e)
            {
                return 0;
            }
            
        }

        public string Delete(int id)
        {
            try
            {
                _unitOfWork.Funcionarios.Delete(id);
                _unitOfWork.Complete();
                return "Funcionário apagado com sucesso.";
            }catch(Exception e)
            {
                return null;
            }
            
        }

        public string Update(FuncionarioInputModel funcionarioDto)
        {
            try
            {
                _unitOfWork.Funcionarios.Update(funcionarioDto.ToFuncionario());
                _unitOfWork.Complete();
                return "Funcionário atualizado com sucesso.";
            }
            catch(Exception e)
            {
                return null;
            }
            
        }
    }
}
