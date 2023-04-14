using ProjectVishnu.Models;

namespace ProjectVishnu.DataAccess.Repository;
public interface IContaRepository : IRepository<Conta>
{
    Conta Get(string username);
    public void Add(Conta entity);
    public void Update(string username, Conta entity);
    public void Delete(string username);
}