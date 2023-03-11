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

        public IEnumerable<Funcionario> ListAlphabetically()
        {
            return _unitOfWork.Funcionarios.ListAlphabetically();
        }

        public IEnumerable<Funcionario> ListWithFilters(string? mercado, string? nome)
        {
           return _unitOfWork.Funcionarios.ListWithFilters(mercado, nome);
        }

        public Funcionario Get(int id)
        {
            return _unitOfWork.Funcionarios.Get(id); 
        }

        public int Create(FuncionarioInputModel funcionarioDto)
        {
            Funcionario funcionario = funcionarioDto.ToFuncionario();
            _unitOfWork.Funcionarios.Add(funcionario);
            _unitOfWork.Complete();
            return _unitOfWork.Funcionarios.GetFuncId(funcionario.Nif);          
         }

        public string Delete(int id)
        {
            _unitOfWork.Funcionarios.Delete(id);
            _unitOfWork.Complete();
            return "Funcionário apagado com sucesso.";        
        }

        public string Update(FuncionarioInputModel funcionarioDto)
        {
            _unitOfWork.Funcionarios.Update(funcionarioDto.ToFuncionario());
            _unitOfWork.Complete();
            return "Funcionário atualizado com sucesso.";  
        }

         public ObraFuncionarioOutputModel GetCurrentObra(int id)
        {
            FuncionariosObra fo = _unitOfWork.Funcionarios.GetCurrentObra(id);
            return fo.toFuncionarioOutputModel();
        }

        public IEnumerable<ObraFuncionarioOutputModel> GetPastObras(int id)
        {
            IEnumerable<FuncionariosObra> fo = _unitOfWork.Funcionarios.GetPastObras(id);
            return fo.Select(fo => fo.toFuncionarioOutputModel());
        }

        public int AddFuncToObra(int id, string codigoObra, string date)
        {
            Funcionario func = _unitOfWork.Funcionarios.Get(id);
            if(func.FuncionariosObras.Any(fo => fo.Datafim != null)) return 0; // retornar erro a dizer que o funcionário já se encontra numa obra
            string ano = date.Split("-")[0];
            string mes = date.Split("-")[1];
            string dia = date.Split("-")[2];
            DateOnly startDate = DateOnly.Parse(String.Format("{0}-{1}-{2}", ano, mes, dia));
            
            FuncionariosObra fo = new FuncionariosObra
            {
                Funcionario = func.Nif,
                Obra = codigoObra,
                Datacomeco = startDate
            };
            func.FuncionariosObras.Add(fo);
            _unitOfWork.Complete();
            return 1;
        }
        
        public int RemoveFuncFromObra(int id, string date)
        {
            string ano = date.Split("-")[0];
            string mes = date.Split("-")[1];
            string dia = date.Split("-")[2];

            DateOnly endDate = DateOnly.Parse(String.Format("{0}-{1}-{2}", ano, mes, dia));

            FuncionariosObra fo = _unitOfWork.Funcionarios.GetCurrentObra(id);
            fo.Datafim = endDate;

            _unitOfWork.Complete();

            return 1;
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
