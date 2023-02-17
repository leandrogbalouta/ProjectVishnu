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
        public IEnumerable<Funcionario> ListByMarketAndName(string mercado, string nome)
        {
            try
            {
                return _unitOfWork.Funcionarios.ListByMarketAndName(mercado, nome);
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
                Funcionario funcionario = funcionarioDto.ToFuncionario();
                _unitOfWork.Funcionarios.Add(funcionario);
                _unitOfWork.Complete();
                return _unitOfWork.Funcionarios.GetFuncId(funcionario.Nif);
            }catch(Exception e)
            {
                throw e;
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
        
        public int AddFuncToObra(int id, string codigoObra, string date)
        {
            try{
                // Funcionario func = _unitOfWork.Funcionarios.Get(id);

                // if(func.FuncionariosObras.Any(fo => fo.Datafim != null)) return 0; // retornar erro a dizer que o funcionário já se encontra numa obra
                
                // func.

                return 1;
            }
            catch(Exception e)
            {
                return 0;
            }
        }

        public int GetValidityWarningCount()
        {
            return _unitOfWork.Funcionarios.GetValidityWarningCount();
        }

        public IEnumerable<Funcionario> GetValidityWarningList()
        {
            return _unitOfWork.Funcionarios.GetValidityWarningList();
        }

    }
}
