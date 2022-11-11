using ProjectVishnu.DataAccess.Repository;
using ProjectVishnu.ServerApp.App.DataAccess.Repository;

namespace ProjectVishnu.DataAccess
{
    public interface IUnitOfWork : IDisposable
    {
        IFuncionarioRepository Funcionarios { get; }
        IObraRepository Obras { get; }
        IDiaTrabalhoRepository DiasTrabalho { get; }
        ICategoriaProfRepository CategoriasProfissionais { get; }
        IFuncionariosObraRepository FuncionariosObra { get; }
        IMercadoRepository Mercados { get; }
        ISalarioFinalRepository SalarioFinal { get; }
        int Complete();
    }
}
