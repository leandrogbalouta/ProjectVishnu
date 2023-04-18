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

    public TipoDeUser Get(string tipoDeUser)
    {
        throw new NotImplementedException();
    }

    public IEnumerable<TipoDeUser> List()
    {
        throw new NotImplementedException();
    }

    public string Update(string tipoDeUser, TipoDeUser tipoDeUserEntity)
    {
        throw new NotImplementedException();
    }
}