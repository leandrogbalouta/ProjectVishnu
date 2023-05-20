using ProjectVishnu.DataAccess;
using ProjectVishnu.DataAccess.Concrete;
using ProjectVishnu.Models;
using ProjectVishnu.ServerApp.App.Dtos;
using ProjectVishnu.ServerApp.App.Services;
using ProjectVishnu.ServerApp.App.Services.ServicesErrors;
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
            try
            {
                Funcionario funcionario = funcionarioDto.ToFuncionario();
                _unitOfWork.Funcionarios.Add(funcionario);
                _unitOfWork.Complete();
                return _unitOfWork.Funcionarios.GetFuncId(funcionario.Nif);
            }
            catch (Exception e)
            {

                _unitOfWork.UntrackChanges();
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

            }
            catch (Exception e)
            {

                _unitOfWork.UntrackChanges();
                throw e;
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
            catch (Exception e)
            {

                _unitOfWork.UntrackChanges();
                throw e;
            }
        }

        public ObraFuncionarioOutputModel? GetCurrentObra(int id)
        {
            FuncionariosObra? fo = _unitOfWork.Funcionarios.GetCurrentObra(id);
            return (fo is not null) ? fo.toFuncionarioOutputModel() : null;
        }

        public IEnumerable<ObraFuncionarioOutputModel> GetPastObras(int id)
        {
            IEnumerable<FuncionariosObra> fo = _unitOfWork.Funcionarios.GetPastObras(id);
            return fo.Select(fo => fo.toFuncionarioOutputModel());
        }

        public int AddFuncToObra(int id, string codigoObra, string date)
        {
            try
            {
                Funcionario func = _unitOfWork.Funcionarios.Get(id);
                if (func.FuncionariosObras.Any(fo => fo.Datafim == null))
                {
                    throw new AlreadyInObraError();
                }
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
            catch (Exception e)
            {

                _unitOfWork.UntrackChanges();
                throw e;
            }

        }

        public int RemoveFuncFromObra(int id, string date)
        {
            try
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
            catch (Exception e)
            {

                _unitOfWork.UntrackChanges();
                throw e;
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
