using ProjectVishnu.DataAccess;
using ProjectVishnu.Models;

namespace ProjectVishnu.Services.Concrete;
public class TiposDeUserService : ITiposDeUserService
{
    private readonly IUnitOfWork _unitOfWork;

    public TiposDeUserService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }
    public string Create(TipoDeUser conta)
    {
        throw new NotImplementedException();
    }

    public string Delete(string tipoDeUser)
    {
        throw new NotImplementedException();
    }
    // TODO double check DB prevents duplicate values..
    public TipoDeUser Get(string tipoDeUser) => _unitOfWork.TiposDeUser.Find((tipo) => tipo.Tipo == tipoDeUser).FirstOrDefault()!;

    public IEnumerable<TipoDeUser> List() => _unitOfWork.TiposDeUser.GetAll();

    public string Update(string tipoDeUser, TipoDeUser tipoDeUserEntity)
    {
        _unitOfWork.TiposDeUser.Update(tipoDeUser, tipoDeUserEntity);
        _unitOfWork.Complete();
        return "Tipo de user atualizado com sucesso.";  
    }
}