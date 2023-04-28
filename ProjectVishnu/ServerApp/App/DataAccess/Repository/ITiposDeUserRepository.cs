using ProjectVishnu.Models;

namespace ProjectVishnu.DataAccess.Repository;
public interface ITiposDeUserRepository : IRepository<TipoDeUser>
{
    TipoDeUser Get(string tipoDeUser);
    public void Add(Conta entity);
    public void Update(string tipoDeUser, TipoDeUser entity);
    public void Delete(string tipoDeUser);
    int GetByType(string tipoDeUser);
}