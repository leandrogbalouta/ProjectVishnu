using ProjectVishnu.DataAccess;
using ProjectVishnu.Models;
using ProjectVishnu.ServerApp.App.Dtos;

namespace ProjectVishnu.Services.Concrete
{
    public class ObrasService : IObrasService
    {
        private readonly IUnitOfWork _unitOfWork;
        public ObrasService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public void AddFuncToObra(string codigoInterno, FuncionarioObraInputModel funcID)
        {
            throw new NotImplementedException();
        }

        public string Create(ObraInputModel obraInput)
        {
            try
            {
                obraInput.generateInternalCode(
                _unitOfWork.Obras.SearchByCodeNumber(obraInput.generateInternalCodeFirstPart()) + 1);
                _unitOfWork.Obras.Add(obraInput.ToObra());
                _unitOfWork.Complete();
                return obraInput.CodigoInterno;
            }
            catch (Exception e)
            {
                return null;
            }

        }

        public string Delete(string codigoInterno)
        {
            try
            {
                _unitOfWork.Obras.Delete(codigoInterno);
                _unitOfWork.Complete();
                return "Obra apagada com sucesso.";

            }
            catch (Exception e)
            {
                return null;
            }

        }
        public IEnumerable<Obra> Search(string procura)
        {
            try
            {
                return _unitOfWork.Obras.Search(procura);
            }
            catch (Exception e)
            {
                return null;
            }
        }
        public Obra Get(string codigoInterno)
        {
            try
            {
                return _unitOfWork.Obras.Get(codigoInterno);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public IEnumerable<Obra> ListAlphabetically()
        {
            try
            {
                return _unitOfWork.Obras.ListAlphabetically();
            }
            catch (Exception e)
            {
                return null;
            }
        }
        public IEnumerable<Obra> ListByMarketAndValue(string mercado, string codigoInterno)
        {
            try
            {
                return _unitOfWork.Obras.ListByMarketAndValue(mercado, codigoInterno);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public IEnumerable<Obra> ListByMarket(string mercado)
        {
            try
            {
                return _unitOfWork.Obras.ListByMarket(mercado);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public void RemoveFuncFromObra(string codigoInterno, FuncionarioObraInputModel funcInput)
        {
            throw new NotImplementedException();
        }

        public string Update(string codigoInterno, ObraInputModel obraInput)
        {
            try
            {
                _unitOfWork.Obras.Update(codigoInterno, obraInput.ToObra());
                _unitOfWork.Complete();
                return "Obra atualizada com sucesso.";
            }
            catch (Exception e)
            {
                return null;
            }

        }
    }
}
