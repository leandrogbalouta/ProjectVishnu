
using System.Linq.Expressions;
using ProjectVishnu.DataAccess.Repository.Concrete;
using ProjectVishnu.Models;

namespace ProjectVishnu.DataAccess.Repository;

public class TiposDeUserRepository : Repository<TipoDeUser>, ITiposDeUserRepository
{
    public TiposDeUserRepository(vishnuContext context)
            : base(context)
    {
    }
    public void Add(Conta entity)
    {
        throw new NotImplementedException();
    }

    public void Delete(string tipoDeUser)
    {
        throw new NotImplementedException();
    }

    public TipoDeUser Get(string tipoDeUser)
    {
        throw new NotImplementedException();
    }

    public void Update(string tipoDeUser, TipoDeUser entity)
    {
        throw new NotImplementedException();
    }
}