using ProjectVishnu.DataAccess.Repository;

namespace ProjectVishnu.DataAccess
{
    public interface IUnitOfWork : IDisposable
    {
        IFuncionarioRepository Funcionarios { get; }
        IObraRepository Obras { get; }
        int Complete();
    }
}
